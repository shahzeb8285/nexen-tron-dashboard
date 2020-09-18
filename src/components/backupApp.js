import React from "react";
import TronLinkGuide from "./TronLinkGuide";
import TronWeb from "tronweb";
import Utils from "./../utils";

// import "./App.scss";

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      tronWeb: {
        installed: false,
        loggedIn: false,
      },
    };

    this.register = this.register.bind(this);
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
    this.startRegisterEventListener();
  }

  startRegisterEventListener() {
    Utils.contract.RegisteredUser().watch((err, { result }) => {
      if (err) {
        return console.log("Failed Register", err);
      }
      console.log("result--->", result);
      // window.location.reload();
    });
  }

  async register() {
    try {
      let connection = await Utils.contract.register().send({
        shouldPollResponse: true,
        callValue: 0,
      });
      console.log(connection);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.state.tronWeb.installed) return <TronLinkGuide />;

    if (!this.state.tronWeb.loggedIn) return <TronLinkGuide installed />;

    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h1>Nexen</h1>
          <br />

          <button
            onClick={(e) => {
              e.preventDefault();
              this.register();
            }}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default App;
