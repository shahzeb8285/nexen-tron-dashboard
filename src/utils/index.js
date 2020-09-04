// const contractAddress = 'TEnwGymDpSkCxDzZM4mTFrCejGvntQhKsA' //mainnet
// const contractAddress = 'TLuRpBpeLnRSawmWSAm8zJfwnMGwwCLaM9' //testing
const contractAddress = 'TXmmCZUkh9pk7o3bqEpAwC3ctLu6votZd9'
const utils = {
    tronWeb: false,
    contract: false,
    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress);
    },
};

export default utils;

