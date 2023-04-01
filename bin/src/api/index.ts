import axios from "axios";

const getMultiPriceData = async (
  params: {},
  isMultiSymbol = true
) => {
  const URL = `https://min-api.cryptocompare.com/data/${isMultiSymbol ? "pricemulti" : "price"}`;
  return await axios.get(
    URL,
    { 
      headers: { Accept: "application/json" },
      params: {
        ...params, 
        tsyms: "USD",
        api_key: "6ba558f31fb1188717fc3ac0ab392c9af6d961eb3da3cd70443a4f7f6500744c",
      }
    }
  )
}

export {
  getMultiPriceData
};