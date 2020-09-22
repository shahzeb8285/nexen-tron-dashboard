const contractAddress = "TAf6ABTEc9eoPnqgHHAryTtUM9Xs2FwoNX";
const utils = {
  tronWeb: false,
  contract: false,
  async setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
    this.contract = await tronWeb.contract().at(contractAddress);
  },
};

export default utils;
