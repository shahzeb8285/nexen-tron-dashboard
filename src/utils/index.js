// const contractAddress = 'TEnwGymDpSkCxDzZM4mTFrCejGvntQhKsA' //mainnet
const contractAddress = 'TLuRpBpeLnRSawmWSAm8zJfwnMGwwCLaM9' //testing
// const contractAddress = 'TLc5dENhfqn4Jg2vgCbNLcpzmPK3UQdRiu'
const utils = {
    tronWeb: false,
    contract: false,
    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress);
    },
};

export default utils;

