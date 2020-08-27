const contractAddress = 'TTops3iiNvCQhYAEwy6BxkCpEcrp4BYzNh'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress);
    },

};

export default utils;

