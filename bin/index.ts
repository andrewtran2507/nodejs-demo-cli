#!/usr/bin/env node
import inquirer from "inquirer";
import { handleQuestionOne } from "./src/modules/question-one";
import { handleQuestionTwo } from "./src/modules/question-two";
import { handleQuestionTree } from "./src/modules/question-three";
import { handleQuestionFour } from "./src/modules/question-four";
import { startMigrations } from "./src/data-processing/migrations";
import { defMiPromptData, defPromptData, roundOneQuestionList } from "./src/utils/constant";
import { isDBExists, isDataSourceExists } from "./src/data-processing/db";

const main = async () => {
  const firstAnswer = await inquirer.prompt([defMiPromptData]);
  const firstAnswerKey = firstAnswer.key.includes("DB") ? "y" : "";
  if (!isDataSourceExists()) {
    return console.log(`Please copy a transactions.csv file into ${process.cwd()}/bin/data/`);
  }
  if (firstAnswerKey === "y" && !isDBExists() && isDataSourceExists()) {
    await startMigrations(); 
  }
  
  const answers = await inquirer.prompt([defPromptData]);
  const keyItem: { key: string; value: string; } | undefined = roundOneQuestionList.find((item: {value: string}) => item.value === answers.value);
  switch (keyItem?.key) {
    case "q1":
      await handleQuestionOne(firstAnswerKey);
      break;
    case "q2":
      await handleQuestionTwo(firstAnswerKey);
      break;
    case "q3":
      await handleQuestionTree(firstAnswerKey);
      break;
    default:
      handleQuestionFour(firstAnswerKey);
  }
}

(async () => {
  await main();
})();