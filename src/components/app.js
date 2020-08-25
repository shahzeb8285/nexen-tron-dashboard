import React from "react";
import TronLinkGuide from "components/TronLinkGuide";
import TronWeb from "tronweb";
import Utils from "utils";

import "./App.scss";

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levelsPrice:[],
      referrals:[],
      totalUsers: 0,
      rewardWallet: 0 ,
      levelRewardWallet: 0,
      totalAmountDistributed: 0,
      loading: false,
      account: "0x",
      tronWeb: {
        installed: false,
        loggedIn: false,
      },
    };
    this.Register = this.Register.bind(this);
    this.buyLevel = this.buyLevel.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUsersIncomes = this.getUsersIncomes.bind(this);
    this.getUsersFunds = this.getUsersFunds.bind(this);
    this.getReferrals = this.getReferrals.bind(this);
    this.distributeReward = this.distributeReward.bind(this);
    this.autoBuyLevel = this.autoBuyLevel.bind(this);
    this.distributeLevelReward = this.distributeLevelReward.bind(this);
    this.getLevelWinners = this.getLevelWinners.bind(this);
    this.setLevelWinners = this.setLevelWinners.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await new Promise((resolve) => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready,
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState,
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {
          const TRONGRID_API = "https://api.trongrid.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false,
            },
          });

          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) return tries++;

        this.setState({
          tronWeb: tronWebState,
        });

        resolve();
      }, 100);
    });

    if (!this.state.tronWeb.loggedIn) {
      // Set default address (foundation address) used for contract calls
      // Directly overwrites the address object as TronLink disabled the
      // function call
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS,
      };

      window.tronWeb.on("addressChanged", () => {
        if (this.state.tronWeb.loggedIn) {
          return;
        }
        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true,
          },
        });
      });
    }
    await Utils.setTronWeb(window.tronWeb);
    this.fetchData();
    this.startRegisterEventListener();
    this.startBuyLevelEventListner();
    this.setState({ loading: false });
    this.setState({ account: window.tronWeb.defaultAddress.base58 });
  }

  startRegisterEventListener() {
    Utils.contract.Register().watch((err) => {
      if (err) {
        return console.log("Failed Register", err);
      }

      window.location.reload();
    });
  }

    startBuyLevelEventListner(){
        Utils.contract.buyLevelEvent().watch((err)=>{
            if(err){
                return console.log("Failed to BuyLevel",err)
            }

            window.location.reload();
        })
    }

    // startDistributeRewardEventListner(){
    //     Utils.contract.buyLevelEvent().watch((err)=>{
    //         if(err){
    //             return console.log("Failed to BuyLevel",err)
    //         }

    //         window.location.reload();
    //     })
    // }

  async fetchData() {
    
    const totalUsers = (await Utils.contract.totalUsers().call()).toNumber();
    const entryFees = (await Utils.contract.levels(0).call()).toNumber();
    this.setState({
        entryFees: entryFees
    })
    for(var i=1;i<=10;i++){
        let tempLevelsPrice = (await Utils.contract.levels(i).call()).toNumber();
        // console.log(tempLevelsPrice);
        const levels = [...this.state.levelsPrice];
        levels.push(tempLevelsPrice);
        this.setState({
            levelsPrice:levels
        });
    }
   const totalAmountDistributed = (await Utils.contract.totalAmountDistributed().call()).toNumber();
   const rewardWallet = (await Utils.contract.rewardWallet().call()).toNumber();
   const levelRewardWallet = (await Utils.contract.levelRewardWallet().call()).toNumber();
    console.log("totalUsers",totalUsers);
    console.log("totalAmountDistributed",totalAmountDistributed/1000000);
    console.log("rewardWallet",rewardWallet/1000000);
    console.log("levelRewardWallet",levelRewardWallet/1000000);
  }

  async Register(id) {
    this.setState({ loading: true });
    Utils.contract
      .register(id)
      .send({
        from: window.tronWeb.defaultAddress.base58,
        callValue: this.state.entryFees,
        shouldPollResponse: true,
      })
      .then((receipt) => {
          console.log("success");
        console.log(receipt);
      }).catch((err)=>{
          console.log("error while registering user",err);
      })
  }

  async buyLevel(level) {
      if(level<=0 || level>10){
          console.log("incorrect level");
      }
    Utils.contract
      .buyLevel(level)
      .send({
        from: window.tronWeb.defaultAddress.base58,
        callValue: this.state.levelsPrice[level-1],
        shouldPollResponse: true,
      })
      .then((receipt) => {
        console.log(receipt);
      })
      .catch((err) => {
        console.log("error in buying ", err);
      });
  }

  async recycleId(level) {
    Utils.contract
      .recycleId(window.tronWeb.defaultAddress.base58)
      .send({
        callValue: 0,
      })
      .then((receipt) => {
        console.log(receipt);
      })
      .catch((err) => {
        console.log("error in recycling", err);
      });
  }

  async getUserInfo(id) {
    Utils.contract
      .getUserInfo(id)
      .call()
      .then((res) => {
        // console.log(res);
        const inviter = TronWeb.address.fromHex(res.inviter);
        const totalReferals = res.totalReferals.toNumber();
        const totalRecycles = res.totalRecycles.toNumber();
        const totalWins = res.totalWins.toNumber();
        const levelsPurchased = res.levelsPurchased.toNumber();
        const loss = res.loss.toNumber()/1000000;

        this.setState({
          inviter:inviter,
          totalReferals:totalReferals,
          totalRecycles:totalRecycles,
          totalWins:totalWins,
          levelsPurchased:levelsPurchased,
          loss:loss
        })
        console.log(
          "inviter",
          inviter,
          "totalReferals",
          totalReferals,
          "totalRecycles",
          totalRecycles,
          "totalWins",
          totalWins,
          "levelsPurchased",
          levelsPurchased,
          "loss",
          loss
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  async getUsersIncomes(id) {
    Utils.contract
      .getUsersIncomes(id)
      .call()
      .then((res) => {
        let directIncome = res.directIncome.toNumber()/1000000;
        let rewardIncome = res.rewardIncome.toNumber()/1000000;
        let levelIncome = res.levelIncome.toNumber()/1000000;
        let recycleIncome = res.recycleIncome.toNumber()/1000000;
        let upgradeIncome = res.upgradeIncome.toNumber()/1000000;
        let levelRewardIncome = res.levelRewardIncome.toNumber()/1000000;

        this.setState({
          directIncome:directIncome,
          rewardIncome:rewardIncome,
          levelIncome:levelIncome,
          recycleIncome:recycleIncome,
          upgradeIncome:upgradeIncome,
          levelRewardIncome:levelRewardIncome
        })
        console.log("directIncome",directIncome);
        console.log("rewardIncome",rewardIncome);
        console.log("levelIncome",levelIncome);
        console.log("recycleIncome",recycleIncome);
        console.log("upgradeIncome",upgradeIncome);
        console.log("levelRewardIncome",levelRewardIncome);
      });
  }

  async getUsersFunds(id) {
    Utils.contract
      .getUsersFundsAndUserAddress(id)
      .call()
      .then((res) => {
        let levelFund = res.levelFund.toNumber()/1000000;
        let recycleFund = res.recycleFund.toNumber()/1000000;
        let add = TronWeb.address.fromHex(res.add);

        this.setState({
          levelFund:levelFund,
          recycleFund:recycleFund,
          add:add
        })
        console.log(levelFund);
        console.log(recycleFund);
        console.log(add);
      });
  }

  async getReferrals(id){
      
      Utils.contract.viewUserReferral(id).call().then((res)=>{
        for(let i=0;i<res.length;i++){
          console.log(res[i].toNumber());
        }
          
          // console.log(res[1].toNumber());
          // console.log(res[2].toNumber());
          
      }).catch((err)=>{
          console.log("error while fetching referrals",err);
      })
  }

  async distributeReward(id1,id2,id3){
      Utils.contract.distributeReward(id1,id2,id3).send({from:window.tronWeb.defaultAddress.base58,callValue:0}).then((res)=>{
          if(res==true)
          console.log("success")
      }).catch((err)=>{
          console.log("error while reward distribution",err);
      })
  }

  async autoBuyLevel(){
    Utils.contract.autoBuyLevel(window.tronWeb.defaultAddress.base58).send({from:window.tronWeb.defaultAddress.base58,callValue:0}).then((res)=>{
        console.log("success");
    }).catch((err)=>{
        console.log("error while buying level automatically",err);
    })
  }

  async distributeLevelReward(){
      Utils.contract.distributeLevelReward().send({
        shouldPollResponse:true,callValue:0
      }).then((res)=>{
          console.log(res);
      }).catch((err)=>{
          console.log("error while distributing levelReward",err);
      })
  }
  async getLevelWinners(){
      Utils.contract.getLevelWinners().call().then((res)=>{
        console.log(res);
          console.log(TronWeb.address.fromHex(res[0]));
      }).catch((err)=>{
          console.log("error while fetching winners",err);
      })
  }

  async setLevelWinners(){
    Utils.contract.setLevelWinners().send({callValue:0}).then((res)=>{
      console.log(res);
  }).catch((err)=>{
      console.log("error while fetching winners",err);
  })
  }
  render() {
    if (!this.state.tronWeb.installed) return <TronLinkGuide />;

    if (!this.state.tronWeb.loggedIn) return <TronLinkGuide installed />;

    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h1>Nexen</h1>
          <br />
          <input type="text" id="input0" />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.Register(document.getElementById("input0").value);
            }}
          >
            Register
          </button>
        </div>
        <div className="col-lg-12 text-center">
          <input type="text" id="input1" />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.getUserInfo(document.getElementById("input1").value);
            }}
          >
            Show UserInfo
          </button>
        </div>

        <div className="col-lg-12 text-center">
          <input type="text" id="input2" />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.getUsersIncomes(document.getElementById("input2").value);
            }}
          >
            Show UserIncomes
          </button>
        </div>

        <div className="col-lg-12 text-center">
          <input type="text" id="input3" />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.getUsersFunds(document.getElementById("input3").value);
            }}
          >
            Show UserFunds
          </button>
        </div>
        <div className="col-lg-12 text-center">
          <input type="text" id="input4" />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.buyLevel(document.getElementById("input4").value);
            }}
          >
            BuyLevel
          </button>
        </div>

        <div className="col-lg-12 text-center">
        <input type="text" id="input5" />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.getReferrals(document.getElementById("input5").value);
            }}
          >
           View Referrals
          </button>
        </div>

        <div className="col-lg-12 text-center">
        <input type="text" id="input6" placeholder="winner1"/>
        <input type="text" id="input7" placeholder="winner2"/>
        <input type="text" id="input8" placeholder="winner3"/>
          <button
            onClick={(e) => {
              e.preventDefault();
              const id1 = document.getElementById("input6").value;
              const id2 = document.getElementById("input7").value;
              const id3 = document.getElementById("input8").value
              this.distributeReward(id1,id2,id3);
            }}
          >
           Distribute Reward
          </button>
        </div>

        <div className="col-lg-12 text-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              this.autoBuyLevel();
            }}
          >
            AutoBuyLevel
          </button>
        </div>

        <div className="col-lg-12 text-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              this.recycleId();
            }}
          >
            Recycle Id
          </button>
        </div>

        <div className="col-lg-12 text-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              this.distributeLevelReward();
            }}
          >
            Distribute Level Reward
          </button>
        </div>

        <div className="col-lg-12 text-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              this.setLevelWinners();
            }}
          >
            Set Level Winners
          </button>
        </div>

        <div className="col-lg-12 text-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              this.getLevelWinners();
            }}
          >
            Get Level Winners
          </button>
        </div>
      </div>
    );
  }
}

export default App;
