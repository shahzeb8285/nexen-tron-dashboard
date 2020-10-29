import React, { Component } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

import { logoutUser } from "../../actions/user";

import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router";

class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }


  }


  componentDidMount() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('userId')
    window.location.replace("https://nexen.live");
  }

  






  render() {
    return (
      <Container className="mt--7" fluid>




        </Container>
    )
  }
}


function mapStateToProps(store) {
  return {
    user: store.Web3Reducer.user,
    profile: store.ProfileReducer.profile,

  };
}

export default withRouter(connect(mapStateToProps)(Logout));
