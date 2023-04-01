import inquirer from "inquirer";

import { getMultiPriceData } from "../../api";
import { getFuncToHandle, isTokenValid } from "../../utils/func";
import { promptList } from "../../utils/constant";
import { defCurrency } from "../../utils/constant";

const handleQuestionTwo = async (firstAnswerKey: string) => {
  const dataProm = await inquirer.prompt([promptList[1]]);

  if (isTokenValid(dataProm?.token?.trim())) {
    const tokenName: string = dataProm?.token?.trim();
    const { portfolio = {} }: any = await getFuncToHandle(firstAnswerKey)(tokenName, null) || {};
    const { data } = await getMultiPriceData({ fsym: tokenName }, false) || {};

    console.log({data, portfolio});
    if (data?.Response !== 'Error') { 
      const answer = data[defCurrency] * portfolio[tokenName];
      console.log('The latest portfolio value for that token in USD is ', answer);
    } else {
      console.log(' Opps! Something went wrong ');
    }
  } else {
    console.error('Please type a right token!');
  }
};

export {
  handleQuestionTwo
};