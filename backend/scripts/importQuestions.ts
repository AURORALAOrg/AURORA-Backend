// import * as fs from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const allowedQuestionTypes = ['multiple_choice', 'sentence_builder', 'fill_in_blanks'];
const allowedDifficultyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

async function importQuestions(filePath: string, createdBy: string): Promise<void> {
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
      console.error('Unsupported file type. Please use .json or .txt');
      return;
    }
  } catch (err) {
    console.error(`Failed to read or parse file: ${err}`);
    return;
  }

  for (const questionData of questions) {
    if (!questionData.content || !questionData.metadata) {
      console.error(`Invalid question data: missing content or metadata`, questionData);
      continue;
    }

    if (!allowedQuestionTypes.includes(questionData.metadata.type)) {
      console.error(`Invalid question type: ${questionData.metadata.type}`, questionData);
      continue;
    }

    if (!allowedDifficultyLevels.includes(questionData.metadata.level)) {
      console.error(`Invalid difficulty level: ${questionData.metadata.level}`, questionData);
      continue;
    }

    try {
      const question = await prisma.question.create({
        data: {
          content: questionData.content,
          metadata: questionData.metadata,
          gameMetadata: questionData.gameMetadata || {},
          createdBy,
          status: 'ACTIVE',
        },
      });
      console.log(`Created question with id: ${question.id}`);
    } catch (error) {
      console.error(`Error creating question:`, error);
    }
  }
}

async function main(): Promise<void> {
  const filePath = process.argv[2];
  const createdBy = process.argv[3];

  if (!filePath || !createdBy) {
    console.error('Usage: ts-node importQuestions.ts <questions.json|questions.txt> <createdBy>');
    process.exit(1);
  }

  await importQuestions(filePath, createdBy);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });