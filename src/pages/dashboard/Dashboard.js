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
import ReferalGraph from "../../components/ReferalGraph/ReferalGraph";
import RewardRankWinner from "../../components/RewardRankWinner/RewardRankWinner";
import ReferalTable from "../../components/ReferalTable/ReferalTable";
import MyRewards from "../../components/MyRewards/MyRewards";

import Counter from "../../components/Counter/Counter";
import { updateProfile } from "../../actions/profileActions";

let isProfileLoaded = false;
class Dashboard extends React.Component {
  async componentDidMount() { }

  constructor(props) {
    super(props);
    this.state = {
      isPageLoaded: false,
      treeLevel: 1,
      currentTreeId: null,
      currentReferralTree: null,
      referralTreeHistory: [],
      levelsMembers: null,
      showBuyLevel: false
    };
    this.Web3Ref = React.createRef();
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
    this.Web3Ref.current.getWrappedInstance().showBuyLevelDialog(level);
  };

  loadReferrals = async (id) => {
    var user = await this.Web3Ref.current
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
        <TronProvider ref={this.Web3Ref} />

        <div className={s.root}>
          <Row style={{ paddingBottom: 20 }}>
            <Col size={3}>
              {this.props.user.totalUsers ? (
                <Counter
                  title={"ALL PARTICIPANTS"}
                  counts={this.props.user ? this.props.user.totalUsers : 0}
                />
              ) : null}
            </Col>

            <Col size={3}>
              {this.props.user.totalUSDAmountDistributed ? (
                <Counter
                  title={"JOINED IN 24 HOURS"}
                  counts={
                    this.props.user
                      ? this.props.user.dailyUsersCount
                      : 0
                  }
                />
              ) : null}
            </Col>

            <Col size={3}>
              {this.props.user.totalUSDAmountDistributed ? (
                <Counter
                  title={"DISTRIBUTED AMOUNT(USD)"}
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
                  title={"DISTRIBUTED AMOUNT(TRX)"}
                  counts={
                    this.props.user
                      ? this.props.user.totalAmountDistributed
                      : 0
                  }
                />
              ) : null}
            </Col>
          </Row>

          <Row style={{ alignItems: "baseline" }}>

            <Col xs={8} lg={8} sm={8} md={8} xl={8} >
              <Row>
                <Col size={4}>
                  <InfoTile
                    primaryTitle={"Direct Bonus"}
                    secondaryTitle={"Total Direct"}
                    primaryAmount={
                      this.props.user.income
                        ? this.props.user.income.directIncome
                        : "-"
                    }
                    bgStartColor={"#00b894"}
                    bgEndColor={"#018067"}
                    secondaryAmount={
                      this.props.user ? this.props.user.totalReferals : 0
                    }
                  />
                </Col>
                

                <Col size={4}>
                  <InfoTile
                    primaryTitle={"DIRECT TEAM BONUS"}
                    secondaryTitle={""}
                    primaryAmount={
                      this.props.user.income
                        ? this.props.user.income.upgradeIncome
                        : "-"
                    }
                    secondaryAmount={""}
                    bgEndColor={"#db4b32"}
                    bgStartColor={"#ff7f50"}
                  />
                </Col>


                <Col size={4}>
                  <InfoTile
                    primaryTitle={"Level Bonus"}
                    secondaryTitle={"Level Loss"}
                    primaryAmount={
                      this.props.user.income
                        ? this.props.user.income.levelIncome
                        : "-"
                    }
                    secondaryAmount={
                      this.props.user.loss ? this.props.user.loss / 1000000 : 0
                    }
                    bgStartColor={"#fdcb6e"}
                    bgEndColor={"#bf8415"}
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: 10, marginBottom: 10 }}>
                <Col size={4}>
                  <InfoTile
                    primaryTitle={"Recycle Bonus"}
                    secondaryTitle={"Total Recycle"}
                    primaryAmount={
                      this.props.user.income
                        ? this.props.user.income.recycleIncome
                        : "-"
                    }
                    secondaryAmount={
                      this.props.user ? this.props.user.totalRecycles : "-"
                    }
                    bgStartColor={"#621e94"}
                    bgEndColor={"#240b36"}
                  />
                </Col>

                <Col size={4}>
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
                    bgStartColor={"#961516"}
                    bgEndColor={"#d63031"}
                  />
                </Col>

                <Col size={4}>
                  <InfoTile
                    primaryTitle={"Recycle Fund"}
                    secondaryTitle={"Total Recycle"}
                    primaryAmount={
                      this.props.user.funds
                        ? this.props.user.funds.recycleFund
                        : "-"
                    }
                    secondaryAmount={
                      this.props.user ? this.props.user.totalRecycles : "-"
                    }
                    bgStartColor={"#d35400"}
                    bgEndColor={"#a1511b"}
                  />
                </Col>
              </Row>

              <Row>
              
              <Col size={4}>
                  <InfoTile
                    primaryTitle={"Reward Bonus"}
                    secondaryTitle={"Total Win"}
                    primaryAmount={
                      this.props.user.income
                        ? this.props.user.income.rewardIncome
                        : "-"
                    }
                    bgStartColor={"#0984e3"}
                    bgEndColor={"#06508a"}
                    secondaryAmount={
                      this.props.user ? this.props.user.totalWins : "-"
                    }
                  />
                </Col>
                <Col size={4} style={{ paddingTop: 5 }}>
                  <InfoTile
                    primaryTitle={"Level Reward Wallet"}
                    secondaryTitle={""}
                    primaryAmount={
                      this.props.user.rewardWallet
                        ? this.props.user.rewardWallet
                        : null}
                    bgStartColor={"#00b894"}
                    bgEndColor={"#018067"}
                    secondaryAmount={
                      ""
                    }
                  />
                </Col>
                <Col size={4} style={{ paddingTop: 5 }}>
                  <InfoTile
                    primaryTitle={"Performance Reward Wallet"}
                    secondaryTitle={""}
                    primaryAmount={
                      this.props.user.levelRewardWallet
                        ? this.props.user.levelRewardWallet
                        : null}
                    bgStartColor={"#00b894"}
                    bgEndColor={"#018067"}
                    secondaryAmount={
                      ""
                    }
                  />
                </Col>

              </Row>

              <Widget style={{ marginTop: 25}}>


                <Row  >
                  <Col  xs={5} lg={5} sm={5} md={5} xl={5} style={{ paddingTop: 5 }}>

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
                      refPercent={
                        this.props.user.refPercent ? this.props.user.refPercent : 0
                      }
                    />



                  </Col>


                  <Col  xs={7} lg={7} sm={7} md={7} xl={7} style={{ paddingTop: 5 }}>
                    {this.renderTree()}
                  </Col>

                </Row>

              </Widget>



            </Col>

            <Col xs={4} lg={4} sm={4} md={4} xl={4}>
              <RewardRankWinner />
            </Col>
          </Row>



          {this.state.showBuyLevel ? <Widget
            title={
              <Row style={{ justifyContent: "space-between", paddingRight: 20, paddingLeft: 20 }}>
                <h3>
                  Buy <span className="fw-semi-bold">Levels</span>
                </h3>
                {this.props.user.sameAddress ? <Button color="primary" onClick={() => {
                  this.Web3Ref.current.getWrappedInstance().buyAllLevel();
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




          {/* <input type="text" id="refId"></input>
          <button
            onClick={() => {
              {
                this.Web3Ref.current
                  .getWrappedInstance()
                  .register(document.getElementById("refId").value);
              }
            }}
          >
            Register
          </button>
          <br></br>
          <br></br>
          <input type="text" id="level"></input>
          <button
            onClick={() => {
              {
                this.Web3Ref.current
                  .getWrappedInstance()
                  .buyLevel(document.getElementById("level").value);
              }
            }}
          >
            Buy Level
          </button>
          <br></br>
          <br></br>
          <button
            onClick={() => {
              {
              }
            }}
          >
            Buy All Levels
          </button>
          <br></br>
          <br></br>
       
          <button
            onClick={() => {
              {
              
                this.Web3Ref.current.getWrappedInstance().distributeReward();
              }
            }}
          >
            Distribute Reward
          </button>
          <br></br>
          <br></br>
          <button
            onClick={() => {
              {
                this.Web3Ref.current
                  .getWrappedInstance()
                  .distributeLevelReward();
              }
            }}
          >
            Distribute Level Reward
          </button>
          <br></br>
          <br></br>
          <button
            onClick={() => {
              {
                this.Web3Ref.current.getWrappedInstance().withDrawlevelFund();
              }
            }}
          >
            Withdraw Level Fund
          </button>
          <br></br>
          <input type="text" id="UserId"></input>
          <input type="text" id="UserLevel"></input>
          <button
            onClick={() => {
              {
                const res = this.Web3Ref.current
                  .getWrappedInstance()
                  .getLevelMembers(
                    document.getElementById("UserId").value,
                    document.getElementById("UserLevel").value
                  );

              }
            }}
          >
            Get Level Members
          </button> */}
          {/* <br></br>
          <br></br>
          <br></br> */}
          {/* <button
            onClick={() => {
              {
                this.Web3Ref.current.getWrappedInstance().getDailyUsers();
              }
            }}
          >
            Get Daily Users
          </button> */}
          {/* <br></br>
          <br></br> */}
          {/* <button
            onClick={() => {
              {
                this.Web3Ref.current
                  .getWrappedInstance()
                  .reInitializeDailyUsersInfo();
              }
            }}
          >
            ReInitialize daily users
          </button> */}
          {/* <br></br>
          <br></br>{" "} */}
                  {this.renderPageLoadingDialoge()}

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
