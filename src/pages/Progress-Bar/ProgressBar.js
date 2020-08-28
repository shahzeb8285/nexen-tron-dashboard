import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import { Row, Col } from "reactstrap";
import "./ProgressBar.scss";
import Widget from "../../components/Widget";

export default class ProgressBar extends Component {
  constructor() {
    super();
    this.state = {
      percentage: 66,
    };
  }
  render() {
    return (
      <Widget>
        <Row>
          <Col lg={4} xs={6}>
            <CircularProgressbar
              value={this.state.percentage}
              text={`${this.state.percentage}%`}
              styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                  // Path color
                  stroke: `rgba(62, 152, 199, ${this.state.percentage / 100})`,
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "butt",
                  // Customize transition animation
                  transition: "stroke-dashoffset 0.5s ease 0s",
                  // Rotate the path
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                  // Trail color
                  stroke: "#d6d6d6",
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "butt",
                  // Rotate the trail
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                // Customize the text
                text: {
                  // Text color
                  fontWeight: "bold",
                  fill: `rgb(110 172 204)`,
                  fontSize: "16px",
                
                },
                // Customize background - only used when the `background` prop is true
                background: {
                  fill: "#3e98c7",
                },
              }}
            />
          </Col>
          <Col lg={4}>
            <div className="circle"></div>
          </Col>
          <Col lg={4}>
            <div className="circle"></div>
          </Col>
        </Row>
      </Widget>
    );
  }
}
