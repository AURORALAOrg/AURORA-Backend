# Question Management Scripts

This directory contains scripts for managing questions in the database.

## Available Question Types

- `multiple-choice`: Questions with one correct answer and multiple wrong answers
- `sentence-builder`: Questions where users build sentences from given words
- `fill-in-blanks`: Questions where users fill in missing words in sentences
- `idiom-challenge`: Questions about English idioms and their meanings

## Importing Questions

To import questions from a JSON or TXT file:

```bash
npm run import:questions import <file_path> <createdBy>
```

Example:

```bash
npm run import:questions import multiple_choice.json a0eb7160-0fd1-4017-b5de-dec2dfe68a15
```

### File Formats

1. JSON Format:

```json
[
  {
    "content": {
      // Question content based on type
    },
    "metadata": {
      "englishLevel": "A1",
      "difficulty": "easy",
      "category": "grammar",
      "subCategory": "present simple",
      "tags": ["grammar", "present simple"],
      "type": "multiple-choice"
    },
    "gameMetadata": {
      "pointsValue": 10,
      "timeLimit": 30,
      "difficultyMultiplier": 1.0
    }
  }
]
```

2. TXT Format:
   Each question should be a valid JSON object separated by empty lines.

## Deleting Questions

To delete questions by type and/or level:

```bash
npm run import:questions delete [type] [level]
```

Examples:

```bash
# Delete all multiple-choice questions
npm run import:questions delete multiple-choice

# Delete all A1 level questions
npm run import:questions delete A1

# Delete all multiple-choice questions of A1 level
npm run import:questions delete multiple-choice A1
```

## Sample Question Files

The directory includes sample question files for each type:

- `multiple_choice.json`
- `sentence_builder.json`
- `fill_in_blanks.json`
- `idiom_challenge.json`

Use these as templates for creating your own question files.

## Question Structure Requirements

Each question type has specific requirements. The script will validate:

1. Required fields for each question type
2. Valid English levels (A1, A2, B1, B2, C1, C2)
3. Valid question types
4. Game metadata structure

If validation fails, the script will show the required structure for the question type.
