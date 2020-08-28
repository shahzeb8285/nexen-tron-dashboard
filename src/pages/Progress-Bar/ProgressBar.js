import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Row, Col } from "reactstrap";
import "./ProgressBar.scss";

export default class ProgressBar extends Component {
  constructor() {
    super();
    this.state = {
      percentage: 66,
    };
  }
  render() {
    return (
      <Row>
        <Col lg={4}>
          <CircularProgressbar
            value={this.state.percentage}
            text={`${this.state.percentage}%`}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "16px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `rgba(62, 152, 199, ${this.state.percentage / 100})`,
              textColor: "#f88",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </Col>
        <Col lg={4}>
          <div className="circle"></div>
        </Col>
        <Col lg={4}>
          <div className="circle"></div>
        </Col>
      </Row>
    );
  }
}
