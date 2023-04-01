import inquirer from "inquirer";

import { getMultiPriceData } from "../../api";
import { getFuncToHandle, isDateValid } from "../../utils/func";
import { promptList } from "../../utils/constant";
import { mappingPortfolioAndPrice } from "../../data-processing";

const handleQuestionTree = async (firstAnswerKey: string) => {
  const dataProm = await inquirer.prompt([promptList[0]]);

  if (isDateValid(dataProm.date)) {
    const newDate = new Date(dataProm.date);
    if (newDate instanceof Date && newDate) {
      const newDateTime = newDate.setHours(0, 0, 0, 0) / 1000 + 86400;
      const { portfolio = {} }: any = await getFuncToHandle(firstAnswerKey)(null, newDateTime) || {};
      const { data } = await getMultiPriceData({fsyms: Object.keys(portfolio).join(',')}) || {};
      
      if (data?.Response !== 'Error') {
        mappingPortfolioAndPrice(portfolio, data);
        console.info('The portfolio value per token in USD on that date is: ', portfolio);
        return;
      } 
    }
  }
  console.error('Please check your fill date. It should be right format or fill another date!');
};

export {
  handleQuestionTree,
};