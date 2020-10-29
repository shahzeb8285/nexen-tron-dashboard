import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, Label, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import Widget from '../../components/Widget';

class Login extends React.Component {




    constructor(props) {
        super(props);

        this.state = {

        };


    }


  componentDidMount() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('userId')
    window.location.replace("https://nexen.live");
  }

  


    render() {

        // cant access login page while logged in


        return (
            <div className="auth-page">
             
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Login));

