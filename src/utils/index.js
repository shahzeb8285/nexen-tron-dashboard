import TronWeb from "tronweb";


// TLxdvdv6SCG63Lg5Qu3eUERZPHRi1brXNa
// TPZZKKMT6X8mKMsDxwZpcXfm5BykdXtFSL
const contractAddress = "TLxdvdv6SCG63Lg5Qu3eUERZPHRi1brXNa";
const TRONGRID_API = "https://api.shasta.trongrid.io"
const FOUNDATION_ADDRESS = "TQ4yeCKh3W627TCiRLXeYJbdFfr2eNahJk";

const utils = {
  FOUNDATION_ADDRESS :FOUNDATION_ADDRESS,
  TRONGRID_API:TRONGRID_API,
  tronWeb: false,
  contract: false,
  localTron: null,
  localTronContract :null,
  islocalTronLoggedIn: false,

  async setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
    console.log("DFsddssdds",tronWeb)
    this.contract = await tronWeb.contract().at(contractAddress);

  },

  async initLocalTron() {
    console.log("local",window.tronWeb)
    if (window.tronWeb) {
      this.localTron = new TronWeb(window.tronWeb);
      console.log("doneeeeeeeeeee")
      this.localTronContract=await this.localTron.contract().at(contractAddress);
      window.tronWeb.on("addressChanged", async() => {
        if (window.tronWeb.loggedIn &&window.tronWeb.ready) {
          this.islocalTronLoggedIn = true
          this.localTron = new TronWeb(window.tronWeb);
          this.localTronContract=await this.localTron.contract().at(contractAddress);

        }
        
      });

    }

  },

  async initTron() {
    let tronWeb = new TronWeb(TRONGRID_API, TRONGRID_API, TRONGRID_API);


    tronWeb.defaultAddress = {
      hex: tronWeb.address.toHex(FOUNDATION_ADDRESS),
      base58: FOUNDATION_ADDRESS,
    };

    tronWeb.setAddress(FOUNDATION_ADDRESS);

    await this.setTronWeb(tronWeb);
    await this.initLocalTron()
  },
};

export default utils;
