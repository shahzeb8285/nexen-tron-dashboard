
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  Badge, Col, Row, Table, Button, Modal, Spinner,
  ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { incomeFetched, userFetched, onLevelUpdated } from "../../actions/web3Actions";
import { toast } from 'react-toastify';
import { compose } from 'redux';
import Level from '../../pages/dashboard/components/Level/Level'

import TronWeb from "tronweb";
import Utils from "../../utils";
import { copySync } from 'fs-extra';

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class TronProvider extends React.Component {


  constructor(props) {
    super(props);




    this.state = {
      user: {},
      income: {},
      mlm: null,
      selectedLevel: {
        position: 1,
        amount: 50000000000000000,
        icon: require("../../images/levels/l1.png"),
        isBought: 1,
        amountTag: "0.05",

        bgStartColor: "#621e94",
        bgEndColor: "#240b36",
      
      levelsPrice: [],
      totalUsers: 0,
      rewardWallet: 0,
      levelRewardWallet: 0,
      totalAmountDistributed: 0,
      loading: false,
      tronWeb: {
        installed: false,
        loggedIn: false,
      },
      }
    };
  }

  async componentDidMount() {
    let userId =this.props.auth.userId
    // this.setState({userId:parseInt(this.props.auth.userId)})
    // await this.loadWeb3();
    // await this.loadBlockchainData();
    await this.initTron();
    await this.fetchPlatformData()
    console.log("tron initiated",this.state)
      await this.initUser(userId)
      await this.getLevelsLoss(userId)
      console.log(this.state);
  }

  async initTron() {
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
    this.fetchPlatformData();
    this.startRegisterEventListener();
    this.startBuyLevelEventListner();
    this.startRewardDistributionEventListener();
    this.startLevelRewardDistributionEventListener();
    this.setState({ InitError: true })
  }

  startRegisterEventListener() {
    Utils.contract.Register().watch((err) => {
      if (err) {
        return console.log("Failed Register", err);
      }
      // window.alert("Registered");
      window.location.reload();
    });
  }

  startBuyLevelEventListner() {
    Utils.contract.buyLevelEvent().watch((err) => {
      if (err) {
        return console.log("Failed to BuyLevel", err);
      }

      window.location.reload();
    });
  }

async initUser(id){
  if(!Utils.contract){
    return;
  }
  console.log("initUser", "Gggg");
  
  Utils.contract
  .getUserInfo(id)
  .call()
  .then((User) => {
    Utils.contract
      .getUsersIncomes(id)
      .call()
      .then((Income) => {
        Utils.contract
      .getUsersFundsAndUserAddress(id)
      .call()
      .then((Fund) => {
        Utils.contract
        .viewUserReferral(id)
        .call()
        .then((res) => {
        var user = {}
        const inviter = TronWeb.address.fromHex(User.inviter);
        const totalReferals = User.totalReferals.toNumber();
        const totalRecycles = User.totalRecycles.toNumber();
        const totalWins = User.totalWins.toNumber();
        const levelsPurchased = User.levelsPurchased.toNumber();
        const loss = User.loss.toNumber();

        user={
          inviter: inviter,
          totalReferals: totalReferals,
          totalRecycles: totalRecycles,
          totalWins: totalWins,
          levelsPurchased: levelsPurchased,
          loss: loss,

          // walletAddress: this.state.walletAddress,
          contractAddress: this.state.contractAddress
        };

      
        let directIncome = Income.directIncome.toNumber();
        let rewardIncome = Income.rewardIncome.toNumber();
        let levelIncome = Income.levelIncome.toNumber();
        let recycleIncome = Income.recycleIncome.toNumber();
        let upgradeIncome = Income.upgradeIncome.toNumber();
        let levelRewardIncome = Income.levelRewardIncome.toNumber();

       var income={
          directIncome: directIncome/1000000,
          rewardIncome: rewardIncome/1000000,
          levelIncome: levelIncome/1000000,
          recycleIncome: recycleIncome/1000000,
          upgradeIncome: upgradeIncome/1000000,
          levelRewardIncome: levelRewardIncome/1000000,
        }

        // const levelsLoss = [];
        let levelFund = Fund.levelFund.toNumber();
        let recycleFund = Fund.recycleFund.toNumber();
        let walletAddress = TronWeb.address.fromHex(Fund.add);

        user.walletAddress=walletAddress;
       var funds={
          levelFund: levelFund,
          recycleFund: recycleFund,
          walletAddress: walletAddress,
        }; 
        const referrals = []
        // console.log(res[0].toNumber());
        if(res){
        for (let i = 0; i < res.length; i++) {
          let tempReferrals = res[i].toNumber();
          // console.log(tempLevelsPrice);
          referrals.push(tempReferrals)
    
        }
    
        this.setState({
          referrals: referrals,
        });
        // console.log(referrals);
      }
        user.income = income;
        user.referralTree = [{
          referrals: referrals,
          id : id
        }]
        user.funds = funds;
        user.levels = this.getLevels(user.levelsPurchased)
        user.totalUsers = this.state.totalUsers;
        user.totalAmountDistributed = this.state.totalAmountDistributed;
        user.rewardWallet = this.state.rewardWallet;
        user.levelRewardWallet = this.state.levelRewardWallet;
        user.refPercent = (res.length/4)*100;
        // user.ownerWallet = this.state.ownerWallet;
        this.setState({ user })
        this.props.dispatch(userFetched(user));
        console.log(this.state);
      });
      });
    });
  });

}
startRewardDistributionEventListener() {
  Utils.contract.distributeRewardEvent().watch((err) => {
    if (err) {
      // alert("Something went Wrong please try again");
      return console.log("Failed reward distribution", err);
    }
    alert("Distribution successful");
    window.location.reload();
  });
}

startLevelRewardDistributionEventListener(){
  Utils.contract.distributeLevelRewardEvent().watch((err) => {
    if (err) {
      // alert("Something went Wrong please try again");
      return console.log("level reward distribution failed", err);
    }
    alert("Distributed level reward Successfully");
    window.location.reload();
  });
}

async register(id) {
  this.setState({ loading: true });
  Utils.contract
    .register(id)
    .send({
      from: window.tronWeb.defaultAddress.base58,
      callValue: this.state.entryFees,
      shouldPollResponse: true,
    })
    .then((receipt) => {
      // alert("your ID: ", this.state.totalUsers);
      console.log(receipt);
    })
    .catch((err) => {
      console.log("error while registering user", err);
    });
}


  async buyLevel(level) {
    Utils.contract
      .buyLevel(level)
      .send({
        from: window.tronWeb.defaultAddress.base58,
        callValue: this.state.levelsPrice[level - 1],
        shouldPollResponse: true,
      })
      .then((receipt) => {
        console.log(receipt);
      })
      .catch((err) => {
        console.log("error in buying ", err);
      });
  }

  async buyAllLevel(){
    Utils.contract
    .buyAllLevels()
    .send({
      from: window.tronWeb.defaultAddress.base58,
      callValue: this.state.allLevelPrice,
      shouldPollResponse: true,
    })
    .then((receipt) => {
      console.log(receipt);
    })
    .catch((err) => {
      console.log("error in buying ", err);
    });
  }

  async fetchPlatformData() {
    const totalUsers = (await Utils.contract.totalUsers().call()).toNumber();
    const entryFees = (await Utils.contract.levels(0).call()).toNumber();
    // const ownerWallet = (await Utils.contract.ownerAmount().call()).toNumber()/1000000;
    this.setState({
      entryFees: entryFees,
      // ownerWallet: ownerWallet
    });


    const levels = []

    for (var i = 1; i <= 10; i++) {
      let tempLevelsPrice = (await Utils.contract.levels(i).call()).toNumber();
      // console.log(tempLevelsPrice);
      levels.push(tempLevelsPrice)

    }

    this.setState({
      levelsPrice: levels,
    });
    const totalAmountDistributed =((await Utils.contract.totalAmountDistributed().call()).toNumber())/1000000;
    const rewardWallet = (
      (await Utils.contract.rewardWallet().call()
    ).toNumber())/1000000;
    const levelRewardWallet = (
      (await Utils.contract.levelRewardWallet().call()
    ).toNumber())/1000000;

    const allLevelPrice = (
      await Utils.contract.allLevelPrice().call()
    ).toNumber();
    this.setState({
      totalUsers: totalUsers,
      totalAmountDistributed: totalAmountDistributed,
      rewardWallet: rewardWallet,
      levelRewardWallet: levelRewardWallet,
      allLevelPrice: allLevelPrice,
    });

   let contractAddress = await TronWeb.address.fromHex(Utils.contract.address);
    console.log(contractAddress);
    this.setState({contractAddress:contractAddress})
    
  }


  async getUserReferrals(id) {
    Utils.contract
      .viewUserReferral(id)
      .call()
      .then((res) => {
       var referrals = [];
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].toNumber());
          referrals.push(res[i].toNumber());
        }
        var data = {
          id:id,
          referrals:referrals
        }
        var userReferralsTree = [...this.state.user.referralTree, data];
        var user = this.state.user;
        user.referralTree = userReferralsTree;
        this.setState({
          user
        }) 
        console.log("update referral 1",this.state.user)
        this.props.dispatch(userFetched(user));
        // console.log("update referral",user);
      })
      .catch((err) => {
        console.log("error while fetching referrals", err);
      });
  }

  async distributeReward(id1, id2, id3) {
    console.log("distribute",id1,id2,id3);
    Utils.contract
      .distributeReward(parseInt(id1), parseInt(id2), parseInt(id3))
      .send({ from: window.tronWeb.defaultAddress.base58, callValue: 0 })
      .then((res) => {
        console.log("enter distribute",res)
        if (res == true) console.log("success");
      })
      .catch((err) => {
        console.log("error while reward distribution", err);
      });
  }

  async distributeLevelReward() {
    Utils.contract
      .distributeLevelReward()
      .send({
        shouldPollResponse: true,
        callValue: 0,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error while distributing levelReward", err);
      });
  }

  
  async getLevelsLoss(id){
    Utils.contract
      .getLevelsLoss(id)
      .call()
      .then((res) => {
        console.log("levels loss")
        const levelsLoss=[];
        for (let i = 0; i < 10; i++) {
          let loss = res[i];
          levelsLoss.push(loss);
        }
        this.setState({levelsLoss});
      })
      .catch((err) => {
        console.log("error while fetching referrals", err);
      });
  }

  showBuyLevelDialog(level) {

    this.setState({ visibleBuyModal: true, selectedLevel: level })

  }


  getLevels(levelNumber) {
    console.log("^^^^^^^^^^^^^^^^", levelNumber)
    var levels = [];


    levels.push({
      position: 1,
      amount: 50000000000000000,
      icon: require("../../images/levels/l1.png"),
      isBought: levelNumber >= 1,
      amountTag: "500",

      bgStartColor: "#621e94",
      bgEndColor: "#240b36"
    })

    levels.push({
      position: 2,
      amount: 100000000000000000,
      icon: require("../../images/levels/l2.png"),
      isBought: levelNumber >= 2,
      amountTag: "1000",

      bgStartColor: "#0984e3",
      bgEndColor: "#06508a"

    })


    levels.push({
      position: 3,
      amount: 150000000000000000,
      amountTag: "1500",

      icon: require("../../images/levels/l3.png"),
      isBought: levelNumber >= 3,
      bgStartColor: "#fdcb6e",
      bgEndColor: "#bf8415",

    })


    levels.push({
      position: 4,
      amount: 2000,
      amountTag: "2000",

      icon: require("../../images/levels/l4.png"),
      isBought: levelNumber >= 4,
      bgStartColor: "#787777",
      bgEndColor: "#a8a8a8"

    })


    levels.push({
      position: 5,
      amount: 2500,
      icon: require("../../images/levels/l5.png"),
      isBought: levelNumber >= 5,
      amountTag: "2500",

      bgStartColor: "#961516",
      bgEndColor: "#d63031"
    })


    levels.push({
      position: 6,
      amount: 3000,
      amountTag: "3000",

      icon: require("../../images/levels/l6.png"),
      isBought: levelNumber >= 6,
      bgStartColor: "#0984e3",
      bgEndColor: "#06508a"
    })


    levels.push({
      position: 7,
      amount: 3500,
      icon: require("../../images/levels/l7.png"),
      isBought: levelNumber >= 7,
      amountTag: "3500",

      bgStartColor: "#621e94",
      bgEndColor: "#240b36"
    })


    levels.push({
      position: 8,
      amount: 4000,
      amountTag: "4000",

      icon: require("../../images/levels/l8.png"),
      isBought: levelNumber >= 8,
      bgStartColor: "#fdcb6e",
      bgEndColor: "#bf8415"
    })


    levels.push({
      position: 9,
      amount: 4500,
      amountTag: "4500",

      icon: require("../../images/levels/l9.png"),
      isBought: levelNumber >= 9,
      bgStartColor: "#787777",
      bgEndColor: "#a8a8a8"

    })


    levels.push({
      position: 10,
      amountTag: "5000",

      amount: 5000,
      icon: require("../../images/levels/l10.png"),
      isBought: levelNumber >= 10,
      bgStartColor: "#961516",
      bgEndColor: "#d63031"
    })
    var level = null;
    if (levelNumber == 10) {
      level = levels[9]
      level.isThisNextLevel = false
    } else {
      level = levels[levelNumber]
      level.isThisNextLevel = true
    }



    // this.setState({selectedLevel:level})
    return levels

  }

  async getLevelWinners() {
    Utils.contract
      .getLevelWinners()
      .call()
      .then((res) => {
        console.log(res);
        console.log(TronWeb.address.fromHex(res[0]));
      })
      .catch((err) => {
        console.log("error while fetching winners", err);
      });
  }

  async setLevelWinners() {
    Utils.contract
      .setLevelWinners()
      .send({ callValue: 0 })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error while fetching winners", err);
      });
  }

  makeErrorToast(error) {
    toast.error(error, {
      position: "bottom-center",
      autoClose: 7000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });

  }



  renderBuyDialog() {
    return <>

      <Modal isOpen={this.state.visibleBuyModal} >
        <ModalHeader><h3 className="fw-semi-bold" >Buy Level
            {this.state.selectedLevel ? " " + this.state.selectedLevel.position : ""}</h3></ModalHeader>
        <ModalBody>

          <Row>

            <Col>



              <Level


                levelData={this.state.selectedLevel}
                enable={true}
                onLevelClicked={() => {

                }}
              /></Col>



            <Col>

              <h2>Buy Level {this.state.selectedLevel.position}+ {" "}</h2>
              <hr className="solid" />
              <Row>


                <Col>
                  <h4>Buy Level {this.state.selectedLevel.position}+ {" "}</h4>
                  <h4>Buy Level {this.state.selectedLevel.position}+ {" "}</h4>

                </Col>

                {/* <Spinner color="secondary" /> */}


                <Col>
                  <h4>Buy Level {this.state.selectedLevel.position}+ {" "}</h4>
                  <h4>Buy Level {this.state.selectedLevel.position}+ {" "}</h4>

                </Col>
              </Row>

            </Col>




          </Row>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {
            this.buyLevel(this.state.selectedLevel.position, this.state.selectedLevel.amount, (receipt => {
              console.log("gffgfgg", receipt)
              toast.success("Successfully bought level " + this.state.selectedLevel.position, {
                position: "bottom-center",
                autoClose: 7000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false
              });

              this.setState({ visibleBuyModal: false })
              window.location.reload();

            }))
          }} >Pay
            {this.state.selectedLevel ? " " + this.state.selectedLevel.amountTag + "  Trx" : ""}</Button>{' '}


          <Button color="danger" onClick={() => {
            this.setState({ visibleBuyModal: false })
          }}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </>
  }


  render() {
    return (

      <>

        {this.state.visibleBuyModal ? this.renderBuyDialog() : null}
      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(TronProvider);

