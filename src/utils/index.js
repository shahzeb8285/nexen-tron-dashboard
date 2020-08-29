const contractAddress = 'TAynoxVMVxPfWZZp4uMxUCKWWq8zQV7td2'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress);
    },

};

export default utils;

