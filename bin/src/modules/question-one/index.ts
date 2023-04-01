import { getFuncToHandle } from "../../utils/func";
import { getMultiPriceData } from "../../api";
import { mappingPortfolioAndPrice } from "../../data-processing";

const handleQuestionOne = async (firstAnswerKey: string) => {
  const { portfolio = {} }: any = await getFuncToHandle(firstAnswerKey)(null, null) || {};
  const { data } = await getMultiPriceData({fsyms: Object.keys(portfolio).join(',')}) || {};
  if (data?.Response !== 'Error') {
    mappingPortfolioAndPrice(portfolio, data);
    console.info('The latest portfolio value per token in USD is: ', portfolio);
  } else {
    console.log(' Opps! Something went wrong ');
  }
};

export {
  handleQuestionOne
};