// const contractAddress = 'TEnwGymDpSkCxDzZM4mTFrCejGvntQhKsA' //mainnet
// const contractAddress = 'TW5NwZYE7Qqx8FPb4B4Q63sEmmAomQQy75' //phase 1
// const contractAddress = "TBmNYZQ6sW5CRe3nJdxC6swGsCu4FCrVAx"; //phase 2
// const contractAddress = "TNeCfqhVvdEwCBhYgyHRqEnLNqP2sBGmzQ"; //neha
const contractAddress = "TVmUCyCU2rUtwVcMU9bteff4uk8x8c4ja6"; //phase 3
const utils = {
  tronWeb: false,
  contract: false,
  async setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
    this.contract = await tronWeb.contract().at(contractAddress);
  },
};

export default utils;
