import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import logo from "../../images/logo.png";
import meta3 from '../../images/metamask.png'
import meta2 from '../../images/meta2.png'
import meta4 from '../../images/meta4.jpeg'
import "./ErrorMetaMask.scss";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export default class ErrorMetaMask extends Component {
  render() {
    return (
      <Container className="mt--7" fluid>
        <Row>
          <Col lg="12">
            <Row>
              <Col lg="12" className="header">
                <img src={logo} alt="logo"></img>
              </Col>
            </Row>

            <Row>
              <BrowserView>
                <h3> This is rendered only in browser </h3>
                <Row>
                    <Col lg="12">
                          <div className="browser">
                             <img src={meta3}></img>
                          </div>
                    </Col>
                </Row>
              </BrowserView>
              <MobileView>
                <h1> This is rendered only on mobile </h1>
              </MobileView>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
