import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button
} from "reactstrap";
import logo from "../../images/logo.png";
import "./NotFound.scss";

export default class NotFound extends Component {
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
              <Col lg="12">
                <div className="notfound">
                  <h1>404</h1>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <div className="notfound">
                  <h1>User Not Found</h1>
                </div>
              </Col>
            </Row>
            <Row className="input">
              <Col lg="6">
                <InputGroup>
                  <Input placeholder="Input" />
                </InputGroup>
              </Col>
            </Row>
            <Row >
                <Col lg="12" className="buttn" >
                <Button color="primary">Submit</Button>
                </Col>
            
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
