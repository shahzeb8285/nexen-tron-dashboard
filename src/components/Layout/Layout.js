import PropTypes from "prop-types";
import Hammer from "rc-hammerjs";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Col, Container, Row } from "reactstrap";
import { closeSidebar, openSidebar } from "../../actions/navigation";
import { incomeFetched, userFetched } from "../../actions/web3Actions";
import WinnerSlider from "../../pages/dashboard/components/WinnerSlider/WinnerSlider";
import ProfilePage from "../../pages/Profile/Profile";
import LastRewards from "../../pages/LastRewards/LastRewards"

import Widget from "../../components/Widget";
import Charts from "../../pages/components/charts/Charts";
import UIIcons from "../../pages/components/icons";
import MapsGoogle from "../../pages/components/maps/google";
import Dashboard from "../../pages/dashboard";
import UINotifications from "../../pages/notifications";
import TablesStatic from "../../pages/tables/static";
import CoreTypography from "../../pages/typography";
import Header from "../Header";
import Sidebar from "../Sidebar";
import s from "./Layout.module.scss";
import { toast } from "react-toastify";
import WinnerTile from "../../pages/dashboard/components/WinnerSlider/WinnerTile";
// import BlockchainManager from '../../utils/BlockchainManager';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contractAddress: "0x",
      ethereumWallet: "0x",
    };
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  async componentDidMount() {
    console.log("fffffffffff", this.props);
    // const instance = await BlockchainManager.getInstance();
    // console.log(instance);
    // const data = instance.data;
    // console.log("=====================",data);
    // const contractaddress = data.contractAddress;
    // console.log(contractaddress);
    // console.log(typeof contractaddress,"contractaddresstype");
    // this.setState({
    //   contractAddress : contractaddress
    // })

    // instance.getUserBlockChainDetails((data)=>{
    //   console.log("JSON",data);
    //   this.setState({contractAddress:data.contractAddress,ethereumWallet:data.ethereumWallet})
    // })
  }
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };

  copyToClipboard = (name, data) => {
    // const el =document.createElement('txtps');
    // el.value = data;
    // document.body.appendChild(el);
    // el.querySelectorAll(0,111111111);
    // document.execCommand("copy");
    // document.body.removeChild(el);

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
  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          "sidebar-" + this.props.sidebarPosition,
          "sidebar-" + this.props.sidebarVisibility,
        ].join(" ")}
      >
        <div className={s.wrap}>
          {/* <Header /> */}
          {/* <Chat chatOpen={this.state.chatOpen} /> */}
          {/* <Helper /> */}

          <Sidebar />

     
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              {/* <BreadcrumbHistory url={this.props.location.pathname} /> */}

              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>


                    <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/app/icons" exact component={UIIcons} />
                    <Route
                      path="/app/notifications"
                      exact
                      component={UINotifications}
                    />

                    <Route path="/dashboard/profile" exact component={ProfilePage} />
                    
                    <Route path="/dashboard/LastRewards" exact component={LastRewards} />

                    <Route path="/app/charts" exact component={Charts} />
                    <Route path="/dashboard/tables" exact component={TablesStatic} />
                    <Route path="/app/maps" exact component={MapsGoogle} />
                    <Route
                      path="/app/typography"
                      exact
                      component={CoreTypography}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}></footer>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
    user: store.Web3Reducer.user,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
