// const contractAddress = "TFABf9zw9RCBA1aHB3FQ6xZhJ55uk71zbB"; //main
const contractAddress = "TGsvoo7NH1q3e9cFka6ZfLCgNvPhxnCzg6";
const utils = {
  tronWeb: false,
  contract: false,
  async setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
    this.contract = await tronWeb.contract().at(contractAddress);
  },
};

export default utils;
