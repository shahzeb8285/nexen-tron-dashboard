import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Particles from 'react-particles-js';
// import BlockchainManager from '../utils/BlockchainManager';
/* eslint-disable */
import ErrorPage from '../pages/error/ErrorPage';
import MetaMaskError from '../pages/ErrorMetaMask/ErrorMetaMask';

/* eslint-enable */

import '../styles/theme.scss';
import LayoutComponent from '../components/Layout';
import Login from '../pages/login';


import NotFound from '../pages/NotFound/NotFound';

import Register from '../pages/register';
import { logoutUser, loginUser } from '../actions/user';


function validateRoute(url) {

  console.log("FDfdfwewwww", typeof url)
  //check for space
  if (/\s/g.test(url)) {
    return false
  }
  //check if string contains only numbers
  let isnum = /^\d+$/.test(url.replace("/", ""));
  if (!isnum) {
    return false
  }

  console.log("Gfgfgfgfvg", true)

  return true
}
const PrivateRoute = ({ propData, dispatch, component, ...rest }) => {


  console.log("dfsdsdsds", rest);
  //check route




  if(validateRoute(rest.location.pathname) && 
  localStorage.getItem('userId') != rest.location.pathname.replace(/\D/g, "")){
    propData.dispatch(loginUser({ userId: rest.location.pathname.replace(/\D/g, "") }));
        console.log("resssst",rest)
      // return (<Route {...rest} render={props => (React.createElement(component, props))} />)
      return (<Redirect to="/dashboard" />)
  }

  if (localStorage.getItem('userId')) {
    propData.dispatch(loginUser({ userId: localStorage.getItem('userId') }));

    return ( // eslint-disable-line

      <Route {...rest} render={props => (React.createElement(component, props))} />
    );
  } else {
    // console.log("fgfggg",rest)


    if (validateRoute(rest.location.pathname)) {
      propData.dispatch(loginUser({ userId: rest.location.pathname.replace(/\D/g, "") }));
        console.log("resssst",rest)
      // return (<Route {...rest} render={props => (React.createElement(component, props))} />)
      return (<Redirect to="/dashboard" />)

    } else {
      return (<Redirect to="/error" />)


    }
  }
};

const CloseButton = ({ closeToast }) => <i onClick={closeToast} className="la la-close notifications-close" />

class App extends React.PureComponent {
  async componentDidMount() {

  }

  render() {

    return (
      <>
        <div>
          <Particles style={{
            position: "absolute",
            "top": 0, "left": 0,
          }}



            particlesRef={{
              background: {
                color: {
                  value: "#0d47a1",
                },
              },
              fpsLimit: 60,
              interactivity: {
                detectsOn: "canvas",
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40,
                  },
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outMode: "bounce",
                  random: false,
                  speed: 6,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  random: true,
                  value: 5,
                },
              },
              detectRetina: true,
            }} />
          <ToastContainer
            autoClose={5000}
            hideProgressBar
            closeButton={<CloseButton />}
          />
          <BrowserRouter>
            <Switch>
              {/* <Route path="/" exact render={() => <Redirect to="/app/main"/>}/> */}
              {/* <Route path="/app" exact render={() => <Redirect to="/app/main"/>}/> */}
              {/* <Route path="/register" exact component={Register}/>
                    <Route path="/login" exact component={ErrorPage}/> */}
              <Route path="/error" exact component={ErrorPage} />
              {/* <Route path="/dashboard" exact component={LayoutComponent}/>  */}
              <Route path="/notfound" exact component={NotFound}/> 
              
              <Route path="/MetaMaskError" exact component={MetaMaskError}/> 

              <PrivateRoute path="*" propData={this.props} dispatch={this.props.dispatch} component={LayoutComponent} />

              {/* <Route component={ErrorPage}/> */}
              {/* <Redirect from="*" to="/"/> */}


              
            </Switch>
          </BrowserRouter>
        </div>

      </>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
