const contractAddress = 'TLT2ngcTzV12WTv1q6kQT4kM8s1ah666k9'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;

