import { getDataFromDB, getDataProcessing } from "../data-processing/index";

const isTokenValid = (token: string) => {
  return /[A-Z]{3}/.test(token);
}

const isDateValid = (date: string) => {
  return /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/.test(date)
}

const getFuncToHandle = (key: string) => {
  return key === "y" ? getDataFromDB : getDataProcessing;
}

export {
  isTokenValid,
  isDateValid,
  getFuncToHandle,
};