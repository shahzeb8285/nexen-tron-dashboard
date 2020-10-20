import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import InfoTile from "../../components/InfoTile/InfoTile";
import { Row, Col } from "reactstrap";
import "./SecondRewardWallet.scss";
import Widget from "../../components/Widget/Widget";

export default class SecondRewardWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 66,
    };
  }
  render() {
    return (
    <>

   <Col style={{alignContent:"center",alignItems:"center",
   marginLeft:"auto",
   marginRight:"auto",
   textAlign: "center",
   fontWeight:900,
   justifyContent:"center"}}>
   
   {/* <h4 style={{color:"#fff"}}>Level Reward</h4>
   <h4 style={{color:"#fff"}}>Bonus</h4> */}

   {/* <span style={{color:"#fff",fontWeight:"bold",fontSize:22}}>Level Reward Bonus</span> */}

    <CircularProgressbar
      value={this.props.refPercent}
      text={this.props.refPercent+"%"}
      styles={{
        // Customize the root svg element
        root: {
          // height:200
        },
        // Customize the path, i.e. the "completed progress"
        path: {
          // Path color
          stroke: `rgba(237, 11, 215)`,
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
          fill: `#ed0bd7`,
          padding:18,
          fontSize: "16px",
        
        },
        // Customize background - only used when the `background` prop is true
        background: {
          fill: "#2198c1",
        },
      }}
    />
   </Col>

    </>
    );
  }
}
