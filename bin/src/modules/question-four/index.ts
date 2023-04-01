import inquirer from "inquirer";
import { getFuncToHandle, isDateValid, isTokenValid } from "../../utils/func";
import { promptList } from "../../utils/constant";
import { mappingPortfolioAndPrice } from "../../data-processing";
import { getMultiPriceData } from "../../api";

const handleQuestionFour = async (firstAnswerKey: string) => {
  const dataProm = await inquirer.prompt(promptList);
  if (
    dataProm.date &&
    isDateValid(dataProm.date) &&
    dataProm.token &&
    isTokenValid(dataProm.token)

  ) {
    const newDate: Date = new Date(dataProm.date);
    if (newDate instanceof Date && newDate) {
      const newDateTime = newDate.setHours(0, 0, 0, 0) / 1000 + 86400;
      const { portfolio = {} }: any = await getFuncToHandle(firstAnswerKey)(dataProm.token, newDateTime) || {};
      const { data } = await getMultiPriceData({fsyms: Object.keys(portfolio).join(',')}) || {};
      
      if (data?.Response !== 'Error') {
        mappingPortfolioAndPrice(portfolio, data);
        console.info('The portfolio value of that token in USD on that date is: ', portfolio);
        return;
      }
    }
    console.error('Please check your fill date and token. It should be right format for date or not null for token!');
  }
};

export {
  handleQuestionFour
}