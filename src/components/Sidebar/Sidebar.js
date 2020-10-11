import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import { changeActiveSidebarItem } from "../../actions/navigation";
import { logoutUser } from "../../actions/user";
import logo from "../../images/logo.png";
import LinksGroup from "./LinksGroup";
import s from "./Sidebar.module.scss";
import { Button, Col, Container, Row } from "reactstrap";
import Widget from "../../components/Widget";
import defaultAvatar from "../../images/avatar.png";
import { toast } from "react-toastify";
import eth from "../../images/1 copy.png";
import "./Sidebar.scss";
import Header from "../Header/Header";
import { closeSidebar, openSidebar } from "../../actions/navigation";
import MyRewards from "../../components/MyRewards/MyRewards";
import Clipboard from 'react-clipboard.js';

let levelBadge = [
  require("../../images/level_badges/1.png"),
  require("../../images/level_badges/2.png"),
  require("../../images/level_badges/3.png"),
  require("../../images/level_badges/4.png"),
  require("../../images/level_badges/5.png"),
  require("../../images/level_badges/6.png"),
  require("../../images/level_badges/7.png"),
  require("../../images/level_badges/8.png"),
  require("../../images/level_badges/9.png"),
  require("../../images/level_badges/10.png"),]
class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    activeItem: "",
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.state = {
      totalTeams: 0
    }
  }

  componentDidMount() {
    // this.onSuccess = this.onSuccess.bind(this);

    this.element.addEventListener(
      "transitionend",
      () => {
        if (this.props.sidebarOpened) {
          this.element.classList.add(s.sidebarOpen);
        }
      },
      false
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log("fdfdfdfddddf0", nextProps)

    if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
      if (nextProps.sidebarOpened) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = "";
        }, 0);
      }
    }
    if (nextProps.user.levelMembers) {

      var totalTeams = 0;
      for (var level of nextProps.user.levelMembers) {
        totalTeams = totalTeams + level
      }

      this.setState({ totalTeams })
    }
  }

  copyToClipboard = (name, data) => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        toast.success(name + " copied successfully", {
          position: "bottom-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      })
      .catch((err) => {
        toast.success(err, {
          position: "bottom-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      });
  };

  // componentWillReceiveProps(props) {
  //   console.log("sidebar", props);
  // }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  onSuccessCopy() {
    toast.success(" copied successfully", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  }

  render() {
    return (

      <>
        {/* <TronProvider ref={this.Web3Ref} /> */}

        <nav
          className={cx(s.root)}
          ref={(nav) => {
            this.element = nav;
          }}
        >
          <ul className={s.nav}>
            <img
              src={logo}
              className={"LinksGroup_headerLink__vI_3u "}
              style={{ width: "90%", height: "auto", marginTop: 30 }}
              alt="Logo"
            />

            {/* <Header></Header> */}

            <hr className="solid" />

            {this.props.profile.name ? (
              <>
                <Col style={{textAlign:"center"}}>
                {this.props.profile ? (
                      <div style={{
                        display: "inline-block"
                      }}>
                        {this.props.profile.levelNumber ?
                          <img src={levelBadge[this.props.profile.levelNumber - 1]}
                            alt="..." style={
                              {
                                marginBottom: 5,
                                height: 40, width: 40,
                                objectFit: "cover",
                                position: "absolute",
                                top: "5",
                                right: 0
                              }} /> : null}

                        <img src={this.props.profile.profile_pic ?
                          this.props.profile.profile_pic : defaultAvatar} alt="..." style={
                            {
                              borderRadius: "50%", marginBottom: 5,
                              height: 80, width: 80,
                              objectFit: "cover",

                            }} />




                      </div>
                    ) : null}

                  <span className="avatar__name" style={{ fontSize: 22 }}>
                    {this.props.profile
                      ? this.props.profile.name
                      : this.props.auth.userId}
                  </span>
                 
                </Col>
              </>
            ) : null}





            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Dashboard"
              isHeader
              iconName="flaticon-home"
              link="/dashboard"
              index="main"
            />
            {this.props.user && this.props.user.sameAddress ? <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Profile"
              isHeader
              iconName="flaticon-user"
              link="/profile"
              index="core"
            /> : null}

            {/* <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Promotions"
              isHeader
              iconName="flaticon-share"
              link="/market"
              index="main"
            /> */}

            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Ledger A/c"
              isHeader
              iconName="flaticon-notebook"
              link="/ledger"
              index="main"
            />


            <LinksGroup
              onActiveSidebarItemChange={(activeItem) => {
                this.props.dispatch(changeActiveSidebarItem(activeItem))

                // this.doLogout()

              }}
              activeItem={this.props.activeItem}
              header="Logout"
              isHeader
              link="#"

              iconName="flaticon-exit"
              index="main"
            />






            {/* <LinksGroup
            // onActiveSidebarItemChange={(t) =>
            //   // this.props.dispatch(changeActiveSidebarItem(t))
            // }
            activeItem={false}
            header="Logout"
            // isHeader
            iconName="flaticon-exit"
            onClick={()=>{
              console.log("logioyci")
              // this.doLogout()
            }}
            // index="tables"
          /> */}

            {/* <div style={{ padding: "13px 20px", fontSize: 18 }}>

              <span  className={`fi flaticon-exit`} style={{    color:"#ed0bd7"
}}>
              </span>

              <a onClick={() => {
                console.log("logout")

                this.doLogout()

              }}> Log out</a>
            </div> */}


            <hr className="solid" />


            <div className="id">

              <div className="eth">



                <Row>

                  <Col>
                    <h4 style={{ fontWeight: "bold", fontSize: 26 }}>

                      <span
                        className="fa fa-id-card-o"
                        style={{ marginRight: 5, color: "#2198c1" }}
                      /></h4>


                    <h4 style={{ fontWeight: "bold", fontSize: 26, marginTop: 10 }}>

                      <span
                        className="fa fa-group"
                        style={{ marginRight: 5, color: "#2198c1" }}
                      /></h4>


                    <h4 style={{ fontWeight: "bold", fontSize: 26 }}>

                      <span
                        className="fa fa-dollar"
                        style={{ marginRight: 5, color: "#2198c1" }}
                      /></h4>


                  </Col>

                  <Col>

                    <h4 style={{ fontWeight: "bold", fontSize: 26 }}>

                      {this.props.auth ? this.props.auth.userId : "0"}
                    </h4>
                    <h4 style={{ fontWeight: "bold", fontSize: 26, marginTop: 10 }}>


                      {this.state.totalTeams}
                    </h4>
                    <h4 style={{ fontWeight: "bold", fontSize: 26 }}>



                      {this.props.user.income
                        ? Math.round(
                          (this.props.user.income.directIncome +
                            this.props.user.income.levelIncome +
                            this.props.user.income.recycleIncome) *
                          0.0236 *
                          100
                        ) / 100
                        : 0}
                    </h4>

                  </Col>

                </Row>
                {/* 
                <div className="value">
                  <Row style={{ justifyContent: "space-between", }}>

                    <h4>

                      <span
                        className="fa fa-id-card-o"
                        style={{ marginRight: 5, color: "#2198c1" }}
                      /></h4>

                    <h4>

                      {this.props.auth ? this.props.auth.userId : "0"}
                    </h4>
                  </Row>



                  <Row style={{ justifyContent: "space-between", }}>

                    <h4>

                      <span
                        className="fa fa-group"
                        style={{ marginRight: 5, color: "#2198c1" }}
                      /></h4>


                    <h4>


                      {this.state.totalTeams}
                    </h4>
                  </Row>

                  <Row style={{ justifyContent: "space-between" }}>

                    <h4>

                      <span
                        className="fa fa-dollar"
                        style={{ marginRight: 5, color: "#2198c1" }}
                      /></h4>


                    <h4>



                      {this.props.user.income
                        ? Math.round(
                          (this.props.user.income.directIncome +
                            this.props.user.income.levelIncome +
                            this.props.user.income.recycleIncome) *
                          0.0236 *
                          100
                        ) / 100
                        : 0}
                    </h4>
                  </Row>



                </div>
           
            */}
              </div>
              <div className="id__btn">
                {/* <img src={eth} style={{ height: 30, margin: 5 }}></img> */}

                <h4 className={"fw-bold"} style={{fontSize:28,textAlign:"center",paddingRight:8,paddingLeft:8}}>
                Trx{" "}
                  {this.props.user.income
                    ? this.props.user.income.directIncome +
                    this.props.user.income.levelIncome +
                    this.props.user.income.recycleIncome +
                    this.props.user.income.rewardIncome +
                    this.props.user.income.levelRewardIncome +
                    this.props.user.income.upgradeIncome
                    : 0}
                
              </h4>
              </div>
            </div>

            <Widget title={"Withdraw"}>
              <Button color="primary" style={{ marginBottom: 10, background: "#ed0bd7", borderWidth: 0,  fontWeight: "bold" }}>Level Fund Withdrawal</Button>{' '}
              <Button color="primary" style={{ background: "#2198c1",  borderWidth: 0, fontWeight: "bold", marginBottom: 10 }}>Recycle Fund Withdrawal</Button>{' '}
              <Button color="primary" style={{
                background: "#ca9024", fontWeight: "bold", borderWidth: 0, color: "#000"
                , width: "100%"
              }}>Extra Benefits</Button>{' '}

            </Widget>



            <Widget title={"Affiliate Link"}>
              <p
                className="fw-semi-bold tile-hover"
                onClick={(f) => {
                  console.log("clickedddddd", f);
                  // this.copyToClipboard(
                  //   "Affiliate Link",
                  //   "http://dash.nexen.live/" + this.props.auth.userId
                  // );
                }}
              >
                <Clipboard
                  style={{
                    background: "transparent",
                    backgroundColor: "transparent",
                    color: "#fff",
                    fontWeight: "bold",
                    borderColor: "transparent"
                  }}
                  onSuccess={this.onSuccessCopy}
                  data-clipboard-text={"http://dash.nexen.live/" + this.props.auth.userId}>
                  http://dash.nexen.live/{this.props.auth.userId}

                </Clipboard>
              </p>
            </Widget>
{/* 
            <Widget title={"Share Us"}>
              <div className="sharethis-inline-share-buttons"></div>
            </Widget> */}

            <Widget title={"Smart Contract Address"}>
              <p
                className="fw-semi-bold tile-hover"
                onClick={(f) => {
                  // this.copyToClipboard(
                  //   "Smart Contract Address",
                  //   this.props.user.contractAddress
                  // );
                }}
              >

                <Clipboard
                  style={{
                    background: "transparent",
                    backgroundColor: "transparent",
                    color: "#fff",
                    fontWeight: "bold",
                    borderColor: "transparent"
                  }}
                  onSuccess={this.onSuccessCopy}
                  data-clipboard-text={this.props.user ?
                    this.props.user.contractAddress : "0000000000"}
                >
                  {this.props.user ? this.props.user.contractAddress : "0000000000"}

                </Clipboard>
              </p>
            </Widget>

            <Widget title={"TRON WALLET"}>
              <p
                className="fw-semi-bold tile-hover"
                onClick={(f) => {
                  // this.copyToClipboard(
                  //   "Etherium Wallet Address",
                  //   this.props.user.walletAddress
                  // );
                }}
              >
                <Clipboard
                  style={{
                    background: "transparent",
                    backgroundColor: "transparent",
                    color: "#fff",
                    fontWeight: "bold",
                    borderColor: "transparent"
                  }}
                  onSuccess={this.onSuccessCopy}
                  data-clipboard-text={this.props.user ?
                    this.props.user.walletAddress : "0000000000"}

                >
                  {this.props.user ? this.props.user.walletAddress : "0000000000"}

                </Clipboard>
              </p>
            </Widget>





            {/* <MyRewards /> */}


          </ul>



        </nav>

      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    user: store.Web3Reducer.user,
    auth: store.auth,
    profile: store.ProfileReducer.profile,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
