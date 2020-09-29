import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import {
  Badge,
  Col,
  Row,
  Table,
  Button,
  Modal,
  Spinner,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { userFetched } from "../../actions/web3Actions";
import { toast } from "react-toastify";
import { compose } from "redux";
import Level from "../../pages/dashboard/components/Level/Level";

import TronWeb from "tronweb";
import Utils from "../../utils";
import { copySync } from "fs-extra";
import CurrencyConverter from "../../utils/CurrencyConverter";
import TronHelper from "../../utils/TronHelper"



let levelBuyTimeStamp = null
class TronProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      income: {},
      levelsMembers: [],
      mlm: null,
      showTronErrorDialog: false,
      showLevelBoughtDialog: false,

      selectedLevel: {
        position: 1,
        amount: 50000000000000000,
        icon: require("../../images/levels/l1.png"),
        disicon: require("../../images/levels/l1d.png"),

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

      },
    };
  }

  async componentDidMount() {
    let userId = this.props.auth.userId;

    try {
      await this.initTron();
      console.log("tron initiated");

      await this.fetchPlatformData();
      console.log("tron initiated2", this.state);

      await this.getLevelMembersCount(userId);
      await this.getLevelsLoss(userId);

      await this.initUser(userId);
      await this.getDailyUsers();
    } catch (err) {
      console.log("dsdsdsssd", err)
    }

    console.log(this.state);
  }

  // async initTron() {
  //   await new Promise((resolve) => {
  //     const tronWebState = {
  //       installed: !!window.tronWeb,
  //       loggedIn: window.tronWeb && window.tronWeb.ready,
  //     };

  //     if (tronWebState.installed) {
  //       this.setState({
  //         tronWeb: tronWebState,
  //       });

  //       return resolve();
  //     }

  //     let tries = 0;
  //     let tronWeb=null
  //     const timer = setInterval(() => {
  //       if (tries >= 10) {
  //         tronWeb = new TronWeb(
  //           Utils.TRONGRID_API,
  //           Utils.TRONGRID_API,
  //           Utils.TRONGRID_API
  //         );

  //         this.setState({
  //           tronWeb: {
  //             installed: false,
  //             loggedIn: false,
  //           },
  //         });

  //         window.tronWeb = tronWeb

  //         clearInterval(timer);
  //         return resolve();
  //       }

  //       tronWebState.installed = !!tronWeb;
  //       tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

  //       if (!tronWebState.installed) return tries++;

  //       this.setState({
  //         tronWeb: tronWebState,
  //       });

  //       resolve();
  //     }, 100);
  //   });

  //   if (!this.state.tronWeb.loggedIn) {
  //     // Set default address (foundation address) used for contract calls
  //     // Directly overwrites the address object as TronLink disabled the
  //     // function call
  //     window.tronWeb.defaultAddress = {
  //       hex: window.tronWeb.address.toHex(Utils.FOUNDATION_ADDRESS),
  //       base58: Utils.FOUNDATION_ADDRESS,
  //     };

  //     window.tronWeb.setAddress(Utils.FOUNDATION_ADDRESS);

  //     window.tronWeb.on("addressChanged", () => {
  //       if (this.state.tronWeb.loggedIn) {
  //         return;
  //       }
  //       this.setState({
  //         tronWeb: {
  //           installed: true,
  //           loggedIn: true,
  //         },
  //       });
  //     });
  //   }

  //   await Utils.setTronWeb(window.tronWeb);
  //   this.fetchPlatformData();

  //   this.setState({ InitError: true });
  // }





  // startListeningForLevelBuyEvent(){

  // }


  async initTron() {
    await TronHelper.initTron();

  }

  async initUser(id) {
    if (!TronHelper.localContract) {
      return;
    }
    console.log("initUser", "Gggg");

    TronHelper.localContract
      .getUserInfo(id)
      .call()
      .then((User) => {
        TronHelper.localContract
          .getUsersIncomes(id)
          .call()
          .then((Income) => {
            TronHelper.localContract
              .getUsersFundsAndUserAddress(id)
              .call()
              .then((Fund) => {
                TronHelper.localContract
                  .viewUserReferral(id)
                  .call()
                  .then(async (res) => {
                    var user = {};
                    const inviter = TronWeb.address.fromHex(User.inviter);
                    const totalReferals = User.totalReferals.toNumber();
                    const totalRecycles = User.totalRecycles.toNumber();
                    const totalWins = User.totalWins.toNumber();
                    const levelsPurchased = User.levelsPurchased.toNumber();
                    const loss = User.loss.toNumber();

                    user = {
                      inviter: inviter,
                      totalReferals: totalReferals,
                      totalRecycles: totalRecycles,
                      totalWins: totalWins,
                      levelsPurchased: levelsPurchased,
                      loss: loss,

                      // walletAddress: this.state.walletAddress,
                      contractAddress: this.state.contractAddress,
                    };

                    let directIncome = Income.directIncome.toNumber();
                    let rewardIncome = Income.rewardIncome.toNumber();
                    let levelIncome = Income.levelIncome.toNumber();
                    let recycleIncome = Income.recycleIncome.toNumber();
                    let upgradeIncome = Income.upgradeIncome.toNumber();
                    let levelRewardIncome = Income.levelRewardIncome.toNumber();

                    var income = {
                      directIncome: directIncome / 1000000,
                      rewardIncome: rewardIncome / 1000000,
                      levelIncome: levelIncome / 1000000,
                      recycleIncome: recycleIncome / 1000000,
                      upgradeIncome: upgradeIncome / 1000000,
                      levelRewardIncome: levelRewardIncome / 1000000,
                    };

                    // const levelsLoss = [];
                    let levelFund = Fund.levelFund.toNumber() / 1000000;
                    let recycleFund = Fund.recycleFund.toNumber() / 1000000;
                    let walletAddress = TronWeb.address.fromHex(Fund.add);

                    user.walletAddress = walletAddress;
                    var funds = {
                      levelFund: levelFund,
                      recycleFund: recycleFund,
                      walletAddress: walletAddress,
                    };
                    const referrals = [];
                    // console.log(res[0].toNumber());
                    if (res) {
                      for (let i = 0; i < res.length; i++) {
                        let tempReferrals = res[i].toNumber();
                        // console.log(tempLevelsPrice);
                        referrals.push(tempReferrals);
                      }

                      // this.setState({
                      //   referrals: referrals,
                      // });
                      // console.log(referrals);
                    }
                    user.income = income;
                    user.referralTree = {};

                    // user.referralTree = [{
                    //   referrals: referrals,
                    //   id : id
                    // }]

                    user.referralTree[id.toString()] = {
                      referrals: referrals,
                      id: id,
                    };
                    user.id = id;
                    user.funds = funds;
                    user.levels = this.getLevels(user.levelsPurchased);
                    user.totalUsers = this.state.totalUsers;
                    var usdRate = await CurrencyConverter.getInstance().fetchCurrency();

                    user.totalAmountDistributed = this.state.totalAmountDistributed;
                    user.totalUSDAmountDistributed = Math.round(
                      this.state.totalAmountDistributed * usdRate
                    );
                    if (usdRate) {
                      user.usdCurrency = usdRate;
                    }
                    user.rewardWallet = this.state.rewardWallet;
                    user.levelRewardWallet = this.state.levelRewardWallet;
                    user.refPercent = (res.length / 4) * 100;
                    user.ownerWallet = this.state.ownerWallet;
                    user.levelMembers = this.state.levelsMembers;
                    user.publicAddress = this.state.publicAddress;
                    user.dailyUsersCount = this.state.dailyUsersCount;
                    user.levelsLoss = this.state.levelsLoss
                    if (user.walletAddress === user.publicAddress) {
                      user.sameAddress = true;
                    } else {
                      user.sameAddress = false;
                    }
                    this.setState({ user });
                    this.props.dispatch(userFetched(user));
                    console.log(this.state);
                  });
              });
          });
      });
  }




  async buyLevel(level) {
    if (!TronHelper.userContract) {

    }
    TronHelper.userContract
      .buyLevel(level)
      .send({
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

  async buyAllLevel() {
    let level = this.state.user.levelsPurchased;
    let price = 0;
    console.log(level);
    for (let i = level; i < 10; i++) {
      price = price + this.state.levelsPrice[i];
    }
    console.log("price",price,"level",level);
    TronHelper.userContract
      .buyAllLevels()
      .send({
        callValue: price,
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
    const totalUsers = parseInt(await (TronHelper.localContract.totalUsers().call()));
    const entryFees = (await TronHelper.localContract
      .levels(0).call()).toNumber();
    console.log("tfdddf", entryFees)

    const ownerWallet =
      (await TronHelper.localContract
        .ownerAmount().call()).toNumber() / 1000000;
    this.setState({
      entryFees: entryFees,
      ownerWallet: ownerWallet,
    });

    const levels = [];

    for (var i = 1; i <= 10; i++) {
      let tempLevelsPrice = (await TronHelper.localContract.
        levels(i).call()).toNumber();
      // console.log(tempLevelsPrice);
      levels.push(tempLevelsPrice);
    }

    this.setState({
      levelsPrice: levels,
    });
    const totalAmountDistributed =
      (await TronHelper.localContract
        .totalAmountDistributed().call()).toNumber() /
      1000000;
    const rewardWallet =
      (await TronHelper.localContract
        .rewardWallet().call()).toNumber() / 1000000;
    const levelRewardWallet =
      (await TronHelper.localContract
        .levelRewardWallet().call()).toNumber() / 1000000;
    const maxReferrals = (
      await TronHelper.localContract
        .maxReferrals().call()
    ).toNumber();
    const idWithMaxReferrals = (
      await TronHelper.localContract
        .idWithMaxReferrals().call()
    ).toNumber();

    const dailyUsersCount = (
      await TronHelper.localContract
        .dailyUsersCount().call()
    ).toNumber();

    this.setState({
      totalUsers: totalUsers,
      totalAmountDistributed: totalAmountDistributed,
      rewardWallet: rewardWallet,
      levelRewardWallet: levelRewardWallet,
      maxReferrals: maxReferrals,
      idWithMaxReferrals: idWithMaxReferrals,
      dailyUsersCount: dailyUsersCount,
    });

    let contractAddress = await TronWeb.address.fromHex(TronHelper.localContract
      .address);
    const publicAddress = await TronHelper.userTronAddress;
    this.setState({
      publicAddress: publicAddress,
    });
    console.log("contractAddress", publicAddress);
    this.setState({ contractAddress: contractAddress });
  }

  async getUserReferrals(id) {
    return TronHelper.localContract

      .viewUserReferral(id)
      .call()
      .then((res) => {
        var referrals = [];
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].toNumber());
          referrals.push(res[i].toNumber());
        }
        var data = {
          id: id,
          referrals: referrals,
        };
        // var userReferralsTree = [...this.state.user.referralTree, data];
        var user = this.state.user;
        user.referralTree[id.toString()] = data;
        this.setState({
          user,
        });
        console.log("update referral 1", this.state.user);
        this.props.dispatch(userFetched(user));
        // console.log("update referral",user);
        return user;
      })
      .catch((err) => {
        console.log("error while fetching referrals", err);
      });
  }

  async distributeReward() {
    // console.log("distribute");
    // Utils.contract
    //   .distributeReward()
    //   .send({ from: window.tronWeb.defaultAddress.base58, callValue: 0 })
    //   .then((res) => {
    //     console.log("enter distribute", res);
    //     if (res == true) console.log("success");
    //   })
    //   .catch((err) => {
    //     console.log("error while reward distribution", err);
    //   });
  }

  async distributeLevelReward() {
    // Utils.contract
    //   .distributeLevelReward()
    //   .send({
    //     shouldPollResponse: true,
    //     callValue: 0,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log("error while distributing levelReward", err);
    //   });
  }

  async getLevelsLoss(id) {
    TronHelper.localContract

      .getLevelsLoss(id)
      .call()
      .then((res) => {
        console.log("levels loss");
        const levelsLoss = [];
        for (let i = 0; i < 10; i++) {
          let loss = res[i];
          levelsLoss.push(loss);
        }

        // let user = this.state.user;
        // user.levelsLoss = levelsLoss;
        this.setState({ levelsLoss });

      })
      .catch((err) => {
        console.log("error while fetching referrals", err);
      });
  }

  showBuyLevelDialog(level) {

    this.setState({ visibleBuyModal: true, selectedLevel: level });
  }

  getLevels(levelNumber) {
    console.log("^^^^^^^^^^^^^^^^", levelNumber);
    var levels = [];

    levels.push({
      position: 1,
      amount: 50000000000000000,
      icon: require("../../images/levels/l1.png"),
      disicon: require("../../images/levels/l1d.png"),

      isBought: levelNumber >= 1,
      amountTag: "200",

      bgStartColor: "#621e94",
      bgEndColor: "#240b36",
    });

    levels.push({
      position: 2,
      amount: 100000000000000000,
      icon: require("../../images/levels/l2.png"),
      disicon: require("../../images/levels/l2d.png"),

      isBought: levelNumber >= 2,
      amountTag: "300",

      bgStartColor: "#0984e3",
      bgEndColor: "#06508a",
    });

    levels.push({
      position: 3,
      amount: 150000000000000000,
      amountTag: "400",

      icon: require("../../images/levels/l3.png"),
      disicon: require("../../images/levels/l3d.png"),

      isBought: levelNumber >= 3,
      bgStartColor: "#fdcb6e",
      bgEndColor: "#bf8415",
    });

    levels.push({
      position: 4,
      amount: 2000,
      amountTag: "500",

      icon: require("../../images/levels/l4.png"),
      disicon: require("../../images/levels/l4d.png"),

      isBought: levelNumber >= 4,
      bgStartColor: "#787777",
      bgEndColor: "#a8a8a8",
    });

    levels.push({
      position: 5,
      amount: 2500,
      icon: require("../../images/levels/l5.png"),
      disicon: require("../../images/levels/l5d.png"),

      isBought: levelNumber >= 5,
      amountTag: "600",

      bgStartColor: "#961516",
      bgEndColor: "#d63031",
    });

    levels.push({
      position: 6,
      amount: 3000,
      amountTag: "700",

      icon: require("../../images/levels/l6.png"),
      disicon: require("../../images/levels/l6d.png"),

      isBought: levelNumber >= 6,
      bgStartColor: "#0984e3",
      bgEndColor: "#06508a",
    });

    levels.push({
      position: 7,
      amount: 3500,
      icon: require("../../images/levels/l7.png"),
      disicon: require("../../images/levels/l7d.png"),

      isBought: levelNumber >= 7,
      amountTag: "800",

      bgStartColor: "#621e94",
      bgEndColor: "#240b36",
    });

    levels.push({
      position: 8,
      amount: 4000,
      amountTag: "900",

      icon: require("../../images/levels/l8.png"),
      disicon: require("../../images/levels/l8d.png"),

      isBought: levelNumber >= 8,
      bgStartColor: "#fdcb6e",
      bgEndColor: "#bf8415",
    });

    levels.push({
      position: 9,
      amount: 4500,
      amountTag: "1000",

      icon: require("../../images/levels/l9.png"),
      disicon: require("../../images/levels/l9d.png"),

      isBought: levelNumber >= 9,
      bgStartColor: "#787777",
      bgEndColor: "#a8a8a8",
    });

    levels.push({
      position: 10,
      amountTag: "1100",

      amount: 5000,
      icon: require("../../images/levels/l10.png"),
      disicon: require("../../images/levels/l10d.png"),

      isBought: levelNumber >= 10,
      bgStartColor: "#961516",
      bgEndColor: "#d63031",
    });
    var level = null;
    if (levelNumber == 10) {
      level = levels[9];
      level.isThisNextLevel = false;
    } else {
      level = levels[levelNumber];
      level.isThisNextLevel = true;
    }

    // this.setState({selectedLevel:level})
    return levels;
  }

  async getLevelWinners() {
    TronHelper.localContract

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
    TronHelper.localContract

      .setLevelWinners()
      .send({ callValue: 0 })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error while fetching winners", err);
      });
  }

  async withDrawlevelFund() {
    // Utils.contract
    //   .withDrawlevelFund()
    //   .send({ callValue: 0, shouldPollResponse: true })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log("error while fetching winners", err);
    //   });
  }

  async getUplines(id) {
    TronHelper.localContract

      .getUplines(id)
      .call()
      .then((res) => {
        // console.log(res);
        for (let i = 0; i < 10; i++) {
          console.log(TronWeb.address.fromHex(res[i]));
        }
      })
      .catch((err) => {
        console.log("error while fetching winners", err);
      });
  }

  async getLevelMembers(id, level) {
    TronHelper.localContract

      .getLevelMembers(id, level)
      .call()
      .then((res) => {
        // this.state.levelsMembers.push(res.length);
        console.log(level, "level members");
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].toNumber());
        }
      })
      .catch((err) => {
        console.log("error while fetching level members", err);
      });
  }

  async getLevelMembersCount(id) {
    TronHelper.localContract

      .getLevelMembersCount(id)
      .call()
      .then((res) => {
        let levelMembersCount = [];
        for (let i = 0; i < 10; i++) {
          levelMembersCount[i] = res[i].toNumber();
          console.log("member1", res[i].toNumber());
        }
        this.setState({ levelsMembers: levelMembersCount })
        console.log("level members count ---> ", levelMembersCount);
      })
      .catch((err) => {
        console.log("error while fetching level members count", err);
      });
  }

  async getLevelMembers(id, level) {
    TronHelper.localContract

      .getLevelMembers(id, level)
      .call()
      .then((res) => {
        // this.state.levelsMembers.push(res.length);
        console.log(level, "level members");
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].toNumber());
        }
      })
      .catch((err) => {
        console.log("error while fetching level members", err);
      });
  }

  async getDailyUsers() {
    TronHelper.localContract

      .getDailyUsers()
      .call()
      .then((res) => {
        // this.state.levelsMembers.push(res.length);
        console.log("daily users");
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].toNumber());
        }
      })
      .catch((err) => {
        console.log("error while fetching daily Users", err);
      });
  }

  async reInitializeDailyUsersInfo() {
    TronHelper.localContract

      .reInitializeDailyUsersInfo()
      .send({ shouldPollResponse: true, callValue: 0 })
      .then((reciept) => {
        console.log(reciept);
      })
      .catch((err) => {
        console.log("error while reinitializing Users", err);
      });
  }

  makeErrorToast(error) {
    toast.error(error, {
      position: "bottom-center",
      autoClose: 7000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
    });
  }




  listenForLevelBuyUpdate() {
    console.log("point22")
    setInterval(async () => {
      try {
        const options = {
          eventName: "buyLevelEvent",
          orderBy: "block_timestamp,asc",
          minBlockTimestamp: levelBuyTimeStamp
        };
        const resp = await TronHelper.tronGrid.contract.getEvents(TronHelper.CONTRACT_ADDRESS,
          options);
        const data = resp.data
        console.log("data123", data)

        if (data) {
          for (var user of data) {
            if (user.result._user === this.props.auth.userId) {
              this.setState({ showLevelBoughtDialog: true })
              break
            }
            console.log("userrr", user)

          }



        }
      } catch (err) {
        console.log("errrrrr", err)
      }
    }, 1000)

  }

  renderBuyDialog() {
    return (
      <>
        <Modal isOpen={this.state.visibleBuyModal}>
          <ModalHeader>
            <h3 className="fw-semi-bold">
              Buy Level
              {this.state.selectedLevel
                ? " " + this.state.selectedLevel.position
                : ""}
            </h3>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <Level
                  levelData={this.state.selectedLevel}
                  enable={true}
                  onLevelClicked={() => { }}
                />
              </Col>

              <Col>
                <h2>Buy Level {this.state.selectedLevel.position}+ </h2>
                <hr className="solid" />
                <Row>
                  <Col>
                    <h4>Buy Level {this.state.selectedLevel.position}+ </h4>
                    <h4>Buy Level {this.state.selectedLevel.position}+ </h4>
                  </Col>

                  {/* <Spinner color="secondary" /> */}

                  <Col>
                    <h4>Buy Level {this.state.selectedLevel.position}+ </h4>
                    <h4>Buy Level {this.state.selectedLevel.position}+ </h4>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                levelBuyTimeStamp = new Date().getTime()
                this.listenForLevelBuyUpdate()

                this.setState({loadingBuy:true})
                this.buyLevel(
                  this.state.selectedLevel.position,
                  this.state.selectedLevel.amount,
                  (receipt) => {
                    console.log("gffgfgg", receipt);
                    toast.success(
                      "Successfully bought level " +
                      this.state.selectedLevel.position,
                      {
                        position: "bottom-center",
                        autoClose: 7000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                      }
                    );

                    this.setState({ visibleBuyModal: false });
                    window.location.reload();
                  }
                );
              }}
            >
              {this.state.loadingBuy ? <Spinner color="secondary" />
                : null}
              Pay
              {this.state.selectedLevel
                ? " " + this.state.selectedLevel.amountTag + "  Trx"
                : ""}
            </Button>{" "}
            <Button
              color="danger"
              onClick={() => {
                this.setState({ visibleBuyModal: false });
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }


  renderTronError() {
    if (TronHelper.isTronInstalled) {

      if (!TronHelper.isTronLoggedIn) {

        return <>
          <h3>You have not Logged in TronLink</h3>

          <span>Please Login into TronLink </span></>
      } else {
        this.setState({ showTronErrorDialog: false })
        return null
      }
    } else {
      return <>

        <h3>You have not installed TronLink</h3>

        <span>Please Install Tron Link from <a href="https://www.google.com/search?q=tronlink+install"
          target="_blank">Here</a></span>
      </>
    }
  }

  renderTronErrorDialog() {
    return (
      <>
        <Modal isOpen={this.state.showTronErrorDialog}>
          <ModalHeader>
            <h3 className="fw-semi-bold">
              Tron Error
            </h3>
          </ModalHeader>
          <ModalBody>


            {this.renderTronError()}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {
                this.setState({ showTronErrorDialog: false });
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }



  renderLevelBoughtDialog() {
    return (
      <>
        <Modal isOpen={this.state.showLevelBoughtDialog}>
          <ModalHeader>
            <h3 className="fw-semi-bold">
              Success
            </h3>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <Level
                  levelData={this.state.selectedLevel}
                  enable={true}
                  onLevelClicked={() => { }}
                />
              </Col>

              <Col>
                <h3>  You have Successfully Bought Level
              {this.state.selectedLevel
                    ? " " + this.state.selectedLevel.position
                    : ""}</h3>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {
                // this.setState({ visibleBuyModal: false });
                window.location.reload();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }


  render() {
    return <>
      {this.state.visibleBuyModal ? this.renderBuyDialog() : null}

      {this.state.showTronErrorDialog ? this.renderTronErrorDialog() : null}

      {this.state.showLevelBoughtDialog ? this.renderLevelBoughtDialog() : null}

    </>;
  }
}
function mapStateToProps(store) {
  return {
    auth: store.auth,
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(
  TronProvider
);
