const contractAddress = 'TJWJURJc1i9XcENzCLREBU31qC3yfafWnc'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress);
    },

};

export default utils;

