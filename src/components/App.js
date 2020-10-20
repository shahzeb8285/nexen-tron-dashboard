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

  //check for space
  if (/\s/g.test(url)) {
    return false
  }
  //check if string contains only numbers
  let isnum = /^\d+$/.test(url.replace("/", ""));
  if (!isnum) {
    return false
  }


  return true
}
const PrivateRoute = ({ propData, dispatch, component, ...rest }) => {


  //check route




  if(validateRoute(rest.location.pathname) && 
  localStorage.getItem('userId') != rest.location.pathname.replace(/\D/g, "")){
    propData.dispatch(loginUser({ userId: rest.location.pathname.replace(/\D/g, "") }));
      // return (<Route {...rest} render={props => (React.createElement(component, props))} />)
      return (<Redirect to="/dashboard" />)
  }

  if (localStorage.getItem('userId')) {
    propData.dispatch(loginUser({ userId: localStorage.getItem('userId') }));

    return ( // eslint-disable-line

      <Route {...rest} render={props => (React.createElement(component, props))} />
    );
  } else {


    if (validateRoute(rest.location.pathname)) {
      propData.dispatch(loginUser({ userId: rest.location.pathname.replace(/\D/g, "") }));
      // return (<Route {...rest} render={props => (React.createElement(component, props))} />)
      return (<Redirect to="/dashboard" />)

    } else {
      return (<Redirect to="/login" />)


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
              <Route path="/login" exact component={Login} />
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
