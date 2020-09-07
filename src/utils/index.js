// const contractAddress = 'TEnwGymDpSkCxDzZM4mTFrCejGvntQhKsA' //mainnet
// const contractAddress = 'TW5NwZYE7Qqx8FPb4B4Q63sEmmAomQQy75' //new test
const contractAddress = 'TBmNYZQ6sW5CRe3nJdxC6swGsCu4FCrVAx' // my test

const utils = {
    tronWeb: false,
    contract: false,
    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress);
    },
};

export default utils;

