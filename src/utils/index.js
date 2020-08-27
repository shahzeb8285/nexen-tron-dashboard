const contractAddress = 'TPFGdCeM2oZLqbdavJPutSrVNZPc6MBpfk'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress);
    },

};

export default utils;

