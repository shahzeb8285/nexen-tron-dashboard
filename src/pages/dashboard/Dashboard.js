import React from "react";
import ApexChart from "react-apexcharts";
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
  Container,
} from "reactstrap";
import InfoTile from "../../components/InfoTile/InfoTile";
import Widget from "../../components/Widget";
import WinnerSlider from "./components/WinnerSlider/WinnerSlider";
import Calendar from "./components/calendar/Calendar";
import s from "./Dashboard.module.scss";

import TronProvider from "../../components/Blockchain/TronProvider";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router";
import Level from "./components/Level/Level";
import SecondRewardWallet from "../../pages/SecondRewardWallet/SecondRewardWallet";
import { toast } from "react-toastify";
import UserTree from "../../components/Tree/UserTree";
import { apiService } from "../../Services/api.service";
import CurrencyConverter from "../../utils/CurrencyConverter";
import RewardRankWinner from "../../components/RewardRankWinner/RewardRankWinner";
import ReferalTable from "../../components/ReferalTable/ReferalTable";
import MyRewards from "../../components/MyRewards/MyRewards";
import Counter from "../../components/Counter/Counter";
import { updateProfile } from "../../actions/profileActions";
import TronHelper from "../../utils/TronHelper";

let isProfileLoaded = false;
class Dashboard extends React.Component {
  async componentDidMount() { 


    try{
      var resp = await apiService.getTodayJoin();
      if(resp.data && resp.data.counts){
          this.setState({dailyUsersCount: resp.data.counts})
      }
    }catch(err){

    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isPageLoaded: false,
      treeLevel: 1,
      currentTreeId: null,
      currentReferralTree: null,
      referralTreeHistory: [],
      levelsMembers: null,
      showBuyLevel: false,
      dailyUsersCount:0,
    };
    // this.Web3Ref = React.createRef();
    this.userTreeRef = React.createRef();
  }

  renderUsdEarning = async () => {
    if (this.props.user.name) {
      var rate = await CurrencyConverter.getInstance().fetchCurrency();
      return <h4>{this.props.user.totalAmountDistributed * rate}</h4>;
    }
    return <></>;
  };

  async componentWillReceiveProps(props) {
    console.log("updatedUser", props.user);
    if (props.user.referralTree) {
      let showBuyLevel = false;
      if (props.user.levelsLoss) {
        showBuyLevel = true
      }
      this.setState({
        currentReferralTree: props.user.referralTree,
        currentTreeId: props.user.id.toString(),
        referralTreeHistory: [props.user.id.toString()],
        levelsMembers: props.user.levelMembers,
        showBuyLevel
      });

      if (!isProfileLoaded) {
        await this.loadProfile(props.user.id);
      }
    }
  }

  async loadProfile(id) {
    try {
      var resp = await apiService.getUser(id);
      if (resp.status == 200) {
        // toast.success("Profile Loaded Succssfully!");
        var user = resp.data.result;

        this.props.dispatch(updateProfile(user));

        console.log("profile======", user);
      } else {
        toast.error("Can't Load Profile!");
      }
    } catch (err) {
      console.error("profileError", err);
      toast.error("Can't Load Profile!");
    }

    this.setState({ isPageLoaded: true, isProfileLoaded: true });
  }

  renderRefferalsInfo() {
    if (this.state.levelsMembers && this.state.levelsMembers.length > 0) {
      return (
        <>
          <Col size={12} style={{ height: "100%" }}>

            <ReferalTable data={this.state.levelsMembers} myId={this.props.user.id} />
          </Col>

          <Col size={12} style={{ height: "100%" }}>
            {/* <ReferalGraph /> */}
          </Col>

          <Col size={12}>
            <MyRewards />
          </Col>

          <Row>
            {/* <Col size={6} style={{ paddingTop: 5 }}>
              {this.renderTree()}
            </Col>
            <Col size={6} style={{ paddingTop: 5 }}></Col> */}
          </Row>
        </>
      );
    }

    return null;
  }

  onLevelClicked = (level) => {
   
    if (this.props.user.sameAddress) {
      if (level.isBought) {
        toast.success("You have already bought this level!");
      } else if (level.isThisNextLevel) {
        this.buyLevel(level);
      } else {
        toast.error("Please Buy previous level first!");
      }
    } else {
      toast.error("You are not authorize to buy!");

    }

  };

  buyLevel = (level) => {
    if(TronHelper.userContract){
    this.props.Web3Ref.current.getWrappedInstance().showBuyLevelDialog(level);
    }else{
      toast.error("Please Install and Login TronLink");

    }
  };

  loadReferrals = async (id) => {
    var user = await this.props.Web3Ref.current
      .getWrappedInstance()
      .getUserReferrals(id);

    this.setState({
      currentReferralTree: user.referralTree,
      treeLevel: this.state.treeLevel + 1,
      currentTreeId: id.toString(),
      referralTreeHistory: [...this.state.referralTreeHistory, id.toString()],
    });
  };

  renderTree() {
    if (!this.state.currentReferralTree) {
      return null;
    }
    return (
      <UserTree
        ref={this.userTreeRef}
        tronRef={this.props.Web3Ref.current.getWrappedInstance()}
        data={
          this.state.currentReferralTree[
          this.state.referralTreeHistory[
          this.state.referralTreeHistory.length - 1
          ]
          ]
        }
        levelNumber={this.state.treeLevel}
        onPreviousButtonClick={() => {
          var referralTreeHistory = this.state.referralTreeHistory;
          referralTreeHistory.pop();
          this.setState({
            treeLevel: this.state.treeLevel - 1,
            referralTreeHistory,
          });
        }}
        disablePrevButton={this.state.treeLevel > 1}
        onPersonClick={async (person) => {
          if (this.state.currentReferralTree[person]) {
            var referralTreeHistory = this.state.referralTreeHistory.push(
              person.toString()
            );
            this.setState({ currentTreeId: person, referralTreeHistory });
          } else {
            await this.loadReferrals(person);
          }
        }}
      />



    );
  }

  renderPageLoadingDialoge() {
    return (
      <>
        <Modal isOpen={!this.state.isPageLoaded}>
          <ModalBody>
            <Row>
              <Spinner color="secondary" />
              <h4 style={{ marginLeft: 10 }}>Loading Page...</h4>
            </Row>
          </ModalBody>
        </Modal>
      </>
    );
  }

  render() {
    return (
      <>
        {/* <TronProvider ref={this.props.Web3Ref} /> */}

        <div className={s.root}>
          <Row style={{ paddingBottom: 20 }}>
            <Col size={3}>
              {this.props.user.totalUsers ? (
                <Counter
                  title={"Total Users"}
                  counts={this.props.user ? this.props.user.totalUsers : 0}
                />
              ) : null}
            </Col>

            <Col size={3}>
              {this.props.user.totalUSDAmountDistributed ? (
                <Counter
                  title={"Daily Users"}
                  counts={
                   this.state.dailyUsersCount
                  }
                />
              ) : null}
            </Col>

            <Col size={3}>
              {this.props.user.totalUSDAmountDistributed ? (
                <Counter
                  title={"Total USD Distributed"}
                  counts={
                    this.props.user
                      ? this.props.user.totalUSDAmountDistributed
                      : 0
                  }
                />
              ) : null}
            </Col>

            <Col size={3}>
              {this.props.user.totalAmountDistributed ? (
                <Counter
                  title={"Total TRX Distributed"}
                  counts={
                    this.props.user
                      ? this.props.user.totalAmountDistributed
                      : 0
                  }
                />
              ) : null}
            </Col>
          </Row>

          <Row style={{
            alignItems: "flex-start"
          }}
            className="row-eq-height">

            <Col xs={8} lg={8} sm={8} md={8} xl={8} >


              <div style={{
                marginTop: 10, marginBottom: 10, display: "grid",
                gridTemplateColumns: "repeat(3, 2fr)",
              }}>
                <InfoTile
                  primaryTitle={"Direct Bonus"}
                  secondaryTitle={"Total Direct"}
                  primaryAmount={
                    this.props.user.income
                      ? this.props.user.income.directIncome
                      : "-"
                  }
                  bgEndColor={"#b01ec6"}
                  bgStartColor={"#ed0bd7"}
                  secondaryAmount={
                    this.props.user ? this.props.user.totalReferals : "-i"
                  }
                />

                <InfoTile
                  primaryTitle={"Reward Bonus"}
                  secondaryTitle={"Total Win"}
                  primaryAmount={
                    this.props.user.income
                      ? this.props.user.income.rewardIncome
                      : "-"
                  }
                  bgStartColor={"#402493"}
                  bgEndColor={"#8c24ad"}
                  secondaryAmount={
                    this.props.user ? this.props.user.totalWins : "-"
                  }
                />
                <InfoTile
                  primaryTitle={"Level Bonus"}
                  secondaryTitle={"Level Loss"}
                  primaryAmount={
                    this.props.user.income
                      ? this.props.user.income.upgradeIncome
                      : "-"
                  }
                  secondaryAmount={
                    this.props.user.loss ? this.props.user.loss / 1000000 : "-"
                  }
                  bgStartColor={"#4c28b5"}
                  bgEndColor={"#2198c1"}
                />


                <InfoTile
                  primaryTitle={"Recycle Bonus"}
                  secondaryTitle={"Total Recycle In"}
                  primaryAmount={
                    this.props.user.income
                      ? this.props.user.income.recycleIncome
                      : "-"
                  }
                  secondaryAmount={
                    this.props.user && this.props.user.income ?
                      this.props.user.income.totalRecyclesIn : "-"
                  }
                  bgEndColor={"#b01ec6"}
                  bgStartColor={"#ed0bd7"}
                />

                <InfoTile
                  primaryTitle={"Level Fund"}
                  secondaryTitle={"Level Bought"}
                  primaryAmount={
                    this.props.user.funds
                      ? this.props.user.funds.levelFund
                      : "-"
                  }
                  secondaryAmount={
                    this.props.user ? this.props.user.levelsPurchased : "-"
                  }
                  bgStartColor={"#402493"}
                  bgEndColor={"#8c24ad"}
                />

                <InfoTile
                  primaryTitle={"Recycle Fund"}
                  secondaryTitle={"Total Recycle Out"}
                  primaryAmount={
                    this.props.user.funds
                      ? this.props.user.funds.recycleFund
                      : "-"
                  }
                  secondaryAmount={
                    this.props.user ? this.props.user.totalRecycles : "-"
                  }
                  bgStartColor={"#4c28b5"}
                  bgEndColor={"#2198c1"}
                />


                <InfoTile
                  primaryTitle={"Direct Team Bonus"}
                  secondaryTitle={""}
                  primaryAmount={
                    this.props.user.income
                      ? this.props.user.income.levelIncome
                      : "-"
                  }
                  secondaryAmount={""}
                  bgEndColor={"#b01ec6"}
                  bgStartColor={"#ed0bd7"}
                />



                <InfoTile
                  primaryTitle={"Level Reward Wallet"}
                  secondaryTitle={""}
                  primaryAmount={
                    this.props.user.levelRewardWallet
                      ? this.props.user.levelRewardWallet
                      : "-"}
                  bgStartColor={"#402493"}
                  bgEndColor={"#8c24ad"}
                  secondaryAmount={
                    ""
                  }
                />
                <InfoTile
                  primaryTitle={"Performance Reward Wallet"}
                  secondaryTitle={""}
                  primaryAmount={
                    this.props.user.rewardWallet
                      ? this.props.user.rewardWallet
                      : "-"}
                  bgStartColor={"#4c28b5"}
                  bgEndColor={"#2198c1"}
                  secondaryAmount={
                    ""
                  }
                />
              </div>



              {this.props.user && this.props.user.income ? <Widget style={{ marginTop: 25 }}>


                <Row  >
                  <Col xs={12} lg={12} sm={12} md={12} xl={12} style={{ paddingTop: 5 }}>
                    {this.renderTree()}
                  </Col>

                  {/* <Col xs={12} lg={7} sm={12} md={12} xl={7} style={{ paddingTop: 5 }}>

                  <SecondRewardWallet
                      levelRewardWallet={
                        this.props.user.levelRewardWallet
                          ? this.props.user.levelRewardWallet
                          : null
                      }
                      rewardWallet={
                        this.props.user.rewardWallet
                          ? this.props.user.rewardWallet
                          : null
                      }
                      rewardAmount={
                        this.props.user.income.levelRewardIncome
                          ? this.props.user.income.levelRewardIncome
                          : 0}
                      refPercent={
                        this.props.user.refPercent ? this.props.user.refPercent : 0
                      }
                    /> 




                  </Col> */}



                </Row>

              </Widget>

                : null}

            </Col>

            <Col xs={4} lg={4} sm={4} md={4} xl={4}>
              <RewardRankWinner />
            </Col>
          </Row>



          {this.state.showBuyLevel ? <Widget
            title={
              <Row style={{ justifyContent: "space-between", marginLeft: 20, marginRight: 20 }}>
                <h3  style={{textAlign:"center"}} >
                  BUY <span className="fw-semi-bold">LEVELS</span>
                </h3>
                {this.props.user.sameAddress ? <Button color="primary" onClick={() => {
                  this.props.Web3Ref.current.getWrappedInstance().buyAllLevel();
                }}>Buy All Levels</Button>
                  : null}
              </Row>
            }
          >
            <Row style={{ padding: 5 }}>
              <Level
                levelData={
                  this.props.user.levels ? this.props.user.levels[0] : null
                }
                onLevelClicked={this.onLevelClicked}
                isLoss={this.props.user.levelsLoss[0]}

              />

              <Level
                onLevelClicked={this.onLevelClicked}
                levelData={
                  this.props.user.levels ? this.props.user.levels[1] : null
                }
                isLoss={this.props.user.levelsLoss[1]}

              />

              <Level
                onLevelClicked={this.onLevelClicked}
                levelData={
                  this.props.user.levels ? this.props.user.levels[2] : null
                }
                isLoss={this.props.user.levelsLoss[2]}

              />

              <Level
                levelData={
                  this.props.user.levels ? this.props.user.levels[3] : null
                }
                isLoss={this.props.user.levelsLoss[3]}

                onLevelClicked={this.onLevelClicked}
              />

              <Level
                levelData={
                  this.props.user.levels ? this.props.user.levels[4] : null
                }
                onLevelClicked={this.onLevelClicked}
                isLoss={this.props.user.levelsLoss[4]}

              />



              <Level
                onLevelClicked={this.onLevelClicked}
                levelData={
                  this.props.user.levels ? this.props.user.levels[5] : null
                }
                isLoss={this.props.user.levelsLoss[5]}
              />

              <Level
                levelData={
                  this.props.user.levels ? this.props.user.levels[6] : null
                }
                isLoss={this.props.user.levelsLoss[6]}

                onLevelClicked={this.onLevelClicked}
              />

              <Level
                levelData={
                  this.props.user.levels ? this.props.user.levels[7] : null
                }
                isLoss={this.props.user.levelsLoss[7]}

                onLevelClicked={this.onLevelClicked}
              />

              <Level
                levelData={
                  this.props.user.levels ? this.props.user.levels[8] : null
                }
                isLoss={this.props.user.levelsLoss[8]}

                onLevelClicked={this.onLevelClicked}
              />

              <Level
                levelData={
                  this.props.user.levels ? this.props.user.levels[9] : null
                }
                isLoss={this.props.user.levelsLoss[9]}

                onLevelClicked={this.onLevelClicked}
              />
            </Row>

            <Row>
              {/* <Level
                    onLevelClicked={this.onLevelClicked}
                    levelData={
                      this.props.user.levels ? this.props.user.levels[5] : null
                    }
                    isLoss={this.props.user.levelsLoss[5]}
                  />

                  <Level
                    levelData={
                      this.props.user.levels ? this.props.user.levels[6] : null
                    }
                    isLoss={this.props.user.levelsLoss[6]}

                    onLevelClicked={this.onLevelClicked}
                  />

                  <Level
                    levelData={
                      this.props.user.levels ? this.props.user.levels[7] : null
                    }
                    isLoss={this.props.user.levelsLoss[7]}

                    onLevelClicked={this.onLevelClicked}
                  />

                  <Level
                    levelData={
                      this.props.user.levels ? this.props.user.levels[8] : null
                    }
                    isLoss={this.props.user.levelsLoss[8]}

                    onLevelClicked={this.onLevelClicked}
                  />

                  <Level
                    levelData={
                      this.props.user.levels ? this.props.user.levels[9] : null
                    }
                    isLoss={this.props.user.levelsLoss[9]}

                    onLevelClicked={this.onLevelClicked}
                  /> */}
            </Row>
          </Widget>
            : null}
          {this.renderRefferalsInfo()}
          {/* {this.renderPageLoadingDialoge()} */}

            </div>

      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.Web3Reducer.user,
  };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
