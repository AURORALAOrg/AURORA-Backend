// import * as fs from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const allowedQuestionTypes = ['multiple-choice', 'sentence-builder', 'fill-in-blanks', 'idiom-challenge'];
const allowedEnglishLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface ImportResults {
  total: number;
  successful: number;
  failed: number;
  errors: string[];
}

type QuestionType = 'multiple-choice' | 'sentence-builder' | 'fill-in-blanks' | 'idiom-challenge';

const questionTypeStructures: Record<QuestionType, { content: Record<string, string> }> = {
  'multiple-choice': {
    content: {
      question: 'string (required)',
      correctAnswer: 'string (required)',
      wrongAnswers: 'string[] (required, min 2 items)',
      explanation: 'string (required)'
    }
  },
  'sentence-builder': {
    content: {
      sentence: 'string (required)',
      words: 'string[] (required, min 3 items)',
      explanation: 'string (required)'
    }
  },
  'fill-in-blanks': {
    content: {
      sentence: 'string (required)',
      correctAnswer: 'string (required)',
      hint: 'string (optional)',
      explanation: 'string (required)'
    }
  },
  'idiom-challenge': {
    content: {
      idiom: 'string (required)',
      sentence: 'string (required)',
      options: 'string[] (required, min 2 items)',
      correct: 'number (required)',
      explanation: 'string (required)',
      tips: 'string[] (required)'
    }
  }
};

const commonMetadataStructure = {
  englishLevel: 'string (required, one of: A1, A2, B1, B2, C1, C2)',
  difficulty: 'string (required)',
  category: 'string (required)',
  subCategory: 'string (required)',
  tags: 'string[] (required)',
  type: 'string (required, one of: multiple-choice, sentence-builder, fill-in-blanks, idiom-challenge)'
};

const gameMetadataStructure = {
  pointsValue: 'number (required)',
  timeLimit: 'number (required)',
  difficultyMultiplier: 'number (required)'
};

function getStructureError(type: QuestionType, field: string): string {
  const structure = questionTypeStructures[type];
  if (!structure) return 'Unknown question type';

  return `\nRequired structure for ${type}:\n${JSON.stringify(structure, null, 2)}\n\nCommon metadata structure:\n${JSON.stringify(commonMetadataStructure, null, 2)}\n\nGame metadata structure:\n${JSON.stringify(gameMetadataStructure, null, 2)}`;
}

function validateQuestion(questionData: any): void {
  const { content, metadata, gameMetadata } = questionData;

  if (!content || !metadata || !gameMetadata) {
    throw new Error(`Missing required fields. Required structure:\n${JSON.stringify({
      content: 'object (required)',
      metadata: 'object (required)',
      gameMetadata: 'object (required)'
    }, null, 2)}`);
  }

  if (!allowedQuestionTypes.includes(metadata.type)) {
    throw new Error(`Invalid question type: ${metadata.type}. Allowed types: ${allowedQuestionTypes.join(', ')}`);
  }

  if (!allowedEnglishLevels.includes(metadata.englishLevel)) {
    throw new Error(`Invalid English level: ${metadata.englishLevel}. Allowed levels: ${allowedEnglishLevels.join(', ')}`);
  }

  // Validate content based on question type
  switch (metadata.type) {
    case 'multiple-choice':
      if (!content.question || !content.correctAnswer || !Array.isArray(content.wrongAnswers) || content.wrongAnswers.length < 2) {
        throw new Error(`Invalid multiple choice question structure.${getStructureError('multiple-choice', 'content')}`);
      }
      break;
    case 'sentence-builder':
      if (!content.sentence || !Array.isArray(content.words) || content.words.length < 3) {
        throw new Error(`Invalid sentence builder question structure.${getStructureError('sentence-builder', 'content')}`);
      }
      break;
    case 'fill-in-blanks':
      if (!content.sentence || !content.correctAnswer) {
        throw new Error(`Invalid fill in blanks question structure.${getStructureError('fill-in-blanks', 'content')}`);
      }
      break;
    case 'idiom-challenge':
      if (!content.idiom || !content.sentence || !Array.isArray(content.options) ||
        content.options.length < 2 || typeof content.correct !== 'number' ||
        !Array.isArray(content.tips)) {
        throw new Error(`Invalid idiom challenge question structure.${getStructureError('idiom-challenge', 'content')}`);
      }
      break;
  }

  // Validate game metadata
  if (typeof gameMetadata.pointsValue !== 'number' ||
    typeof gameMetadata.timeLimit !== 'number' ||
    typeof gameMetadata.difficultyMultiplier !== 'number') {
    throw new Error(`Invalid game metadata structure.${getStructureError(metadata.type, 'gameMetadata')}`);
  }
}

async function upsertQuestion(questionData: any, createdBy: string) {
  // First try to find an existing question with the same content and metadata
  const existingQuestion = await prisma.question.findFirst({
    where: {
      AND: [
        {
          content: {
            equals: questionData.content
          }
        },
        {
          metadata: {
            equals: questionData.metadata
          }
        }
      ]
    }
  });

  if (existingQuestion) {
    return prisma.question.update({
      where: { id: existingQuestion.id },
      data: {
        content: questionData.content,
        metadata: questionData.metadata,
        gameMetadata: questionData.gameMetadata,
        updatedAt: new Date()
      }
    });
  }

  return prisma.question.create({
    data: {
      content: questionData.content,
      metadata: questionData.metadata,
      gameMetadata: questionData.gameMetadata,
      createdBy,
      status: 'ACTIVE'
    }
  });
}

async function importQuestions(filePath: string, createdBy: string): Promise<ImportResults> {
  const dataPath = path.join(__dirname, filePath);
  const ext = path.extname(dataPath);
  let questions: any[] = [];

  try {
    const fileContent = await fs.readFile(dataPath, 'utf-8');

    if (ext === '.json') {
      questions = JSON.parse(fileContent);
    } else if (ext === '.txt') {
      questions = fileContent
        .split(/\n\s*\n/) // split by empty lines
        .map(block => block.trim())
        .filter(Boolean)
        .map(block => JSON.parse(block));
    } else {
      throw new Error('Unsupported file type. Please use .json or .txt');
    }
  } catch (err) {
    throw new Error(`Failed to read or parse file: ${err}`);
  }

  const results: ImportResults = {
    total: questions.length,
    successful: 0,
    failed: 0,
    errors: []
  };

  console.log(`Starting import of ${questions.length} questions...`);

  for (const [index, questionData] of questions.entries()) {
    try {
      validateQuestion(questionData);
      await upsertQuestion(questionData, createdBy);
      results.successful++;

      // Log progress every 10 questions
      if ((index + 1) % 10 === 0) {
        console.log(`Progress: ${index + 1}/${questions.length} questions processed`);
      }
    } catch (error: any) {
      results.failed++;
      results.errors.push(`Question ${index + 1}: ${error.message || 'Unknown error'}`);
      console.error(`Error processing question ${index + 1}:`, error.message || 'Unknown error');
    }
  }

  return results;
}

async function deleteQuestions(type?: string, level?: string): Promise<{ deleted: number }> {
  const where: any = {};

  if (type) {
    where.metadata = {
      path: ['type'],
      equals: type
    };
  }

  if (level) {
    where.metadata = {
      ...where.metadata,
      path: ['englishLevel'],
      equals: level
    };
  }

  const result = await prisma.question.deleteMany({
    where
  });

  return { deleted: result.count };
}

async function main(): Promise<void> {
  const command = process.argv[2];
  const filePath = process.argv[3];
  const createdBy = process.argv[4];
  const type = process.argv[5];
  const level = process.argv[6];

  if (command === 'delete') {
    try {
      const result = await deleteQuestions(type, level);
      console.log(`Successfully deleted ${result.deleted} questions`);
      if (type) console.log(`Type: ${type}`);
      if (level) console.log(`Level: ${level}`);
    } catch (error: any) {
      console.error('Error deleting questions:', error.message || error);
      process.exit(1);
    }
    return;
  }

  if (!filePath || !createdBy) {
    console.error('Usage:');
    console.error('  Import questions:');
    console.error('    ts-node importQuestions.ts import <questions.json|questions.txt> <createdBy>');
    console.error('  Delete questions:');
    console.error('    ts-node importQuestions.ts delete [type] [level]');
    console.error('    Example: ts-node importQuestions.ts delete multiple-choice A1');
    process.exit(1);
  }

  try {
    const results = await importQuestions(filePath, createdBy);
    console.log('\nImport Summary:');
    console.log('---------------');
    console.log(`Total questions: ${results.total}`);
    console.log(`Successfully imported: ${results.successful}`);
    console.log(`Failed: ${results.failed}`);

    if (results.errors.length > 0) {
      console.log('\nErrors:');
      results.errors.forEach(error => console.log(`- ${error}`));
    }
  } catch (error: any) {
    console.error('Fatal error:', error.message || error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });