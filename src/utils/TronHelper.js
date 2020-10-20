import TronWeb from "tronweb";
import TronGrid from 'trongrid';
const contractAddress = "TGXvJcCDrvxgzouyCioNkTd12GJGChf834";
const TRONGRID_API = "https://api.trongrid.io"
const FOUNDATION_ADDRESS = "TQ4yeCKh3W627TCiRLXeYJbdFfr2eNahJk";

const TronHelper = {
  FOUNDATION_ADDRESS: FOUNDATION_ADDRESS,
  TRONGRID_API: TRONGRID_API,
  CONTRACT_ADDRESS:contractAddress,
  localTron: null,
  userTron: null,
  isTronInstalled: false,
  isTronLoggedIn: false,
  localContract: null,
  userContract: null,
  userTronAddress: null,
  tronGrid:null,



  async setUserTron() {
    let obj = setInterval(async () => {
      if (window.tronWeb) {
        clearInterval(obj)
        this.userTron = window.tronWeb

        if (this.userTron) {

          this.userContract = await this.userTron.contract().at(contractAddress);


          this.isTronInstalled = true;
          if (this.userTron.defaultAddress.base58) {
            this.isTronLoggedIn = true
            this.userTronAddress = this.userTron.defaultAddress.base58
          }
        }


      }
    }, 10)



    //test

  },



  async initTron() {
    console.log("tronhelper", "bftwint")

    this.localTron = new TronWeb(
      TRONGRID_API,
      TRONGRID_API,
      TRONGRID_API
    );


    console.log("tronhelper", "bafterAdd")


    this.localTron.defaultAddress = {
      hex: this.localTron.address.toHex(FOUNDATION_ADDRESS),
      base58: FOUNDATION_ADDRESS,
    };
    console.log("tronhelper", "address")

    this.localTron.setAddress(FOUNDATION_ADDRESS);
    console.log("tronhelper", "beforeCont")
    this.localContract = await this.localTron.contract().at(contractAddress);
    console.log("tronhelper", "afterCont")

    await this.setUserTron();

    this.tronGrid = new TronGrid(this.localTron);


  },
};

export default TronHelper;
