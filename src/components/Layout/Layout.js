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
// import LastRewards from "../../pages/LastRewards/LastRewards"
import TronProvider from "../Blockchain/TronProvider"
import Widget from "../../components/Widget";
import Charts from "../../pages/components/charts/Charts";
import UIIcons from "../../pages/components/icons";
import Dashboard from "../../pages/dashboard";
import UINotifications from "../../pages/notifications";
import Sidebar from "../Sidebar";
import Ledger from "../../pages/Ledger/Ledger";
import ShareAndMarket from "../../pages/ShareAndMarket/ShareAndMarket";
import LogoutPage from "../../pages/Logout/Logout"
import { updateProfile } from "../../actions/profileActions";
import { apiService } from "../../Services/api.service";

import s from "./Layout.module.scss";
import { toast } from "react-toastify";

let profileLoaded=false;

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
    this.Web3Ref = React.createRef();

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

 
  async componentWillReceiveProps(props) {
    if(!profileLoaded && props.user.id){
      await this.loadProfile(props.user.id);
      profileLoaded= true
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


  // renderPageLoadingDialoge() {
  //   return (
  //     <>
  //       <Modal isOpen={!this.state.isPageLoaded}>
  //         <ModalBody>
  //           <Row>
  //             <Spinner color="secondary" />
  //             <h4 style={{ marginLeft: 10 }}>Loading Page...</h4>
  //           </Row>
  //         </ModalBody>
  //       </Modal>
  //     </>
  //   );
  // }

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
          <TronProvider ref={this.Web3Ref} />

          <Sidebar />

     
          <main className={s.content}>
              {/* <BreadcrumbHistory url={this.props.location.pathname} /> */}

              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>

                  {/* <Route path="*" exact render={() => <Redirect to="/dashboard" />} /> */}

                    <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
                    <Route path="/dashboard" exact  render={() => <Dashboard to="/dashboard" Web3Ref={this.Web3Ref} />}/>
                    <Route path="/ledger" exact component={Ledger} />
                    <Route path="/market" exact component={ShareAndMarket} />

                    {/* <Route path="/app/icons" exact component={UIIcons} /> */}
                    {/* <Route
                      path="/app/notifications"
                      exact
                      component={UINotifications}
                    /> */}

                    <Route path="/profile" exact component={ProfilePage} />
                    <Route path="/logout" exact component={LogoutPage} />

                    {/* <Route path="/dashboard/LastRewards" exact component={LastRewards} /> */}

                    {/* <Route path="/app/charts" exact component={Charts} /> */}
                    
                   
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}></footer>
            </main>
      
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
