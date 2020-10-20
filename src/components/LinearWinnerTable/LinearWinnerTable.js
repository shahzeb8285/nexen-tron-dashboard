import React, { useState } from 'react';
import {
  Media,
  Container,
  Row,
  Col
} from 'reactstrap';
import defaultAvatar from "../../images/avatar.png"
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

const LinearWinnerTable = (props) => {


  const rankColor = [
    "#0984e3",
    "#b01ec6",
    "#402493",
    "#4c28b5",
    "#b01ec6",
    "#402493",
    "#4c28b5",
    "#b01ec6",
    "#621e94",
    "#0984e3"
  
  ]
  
  
  const rankGradient = [
    "linear-gradient(to right, #fdcb6e, #bf8415)",
    "linear-gradient(to right, #b01ec6,#ed0bd7)",
    "linear-gradient(to right, #402493, #8c24ad)",
    "linear-gradient(to right, #4c28b5, #2198c1)",
    "linear-gradient(to right, #b01ec6,#ed0bd7)",
    "linear-gradient(to right, #402493, #8c24ad)",
    "linear-gradient(to right, #4c28b5, #2198c1)",
    "linear-gradient(to right, #b01ec6,#ed0bd7)",
    "linear-gradient(to right, #621e94, #240b36)",
    "linear-gradient(to right, #0984e3, #06508a)"
  
  
  
  ]

  const getRankPos = (rank) => {
    switch (rank) {
      case 1:
        return "1st"
      case 2:
        return "2nd"
      case 3:
        return "3rd"
      case 4:
        return "4th"
      case 5:
        return "5th"
      case 6:
        return "6th"
      case 7:
        return "7th"
      case 8:
        return "8th"
      case 9:
        return "9th"
      case 10:
        return "10th"


    }
  }

  return (


    <Row
      noGutters
      style={{
        backgroundColor: "#0000007a",
        justifyContent: "start",
        paddingLeft: 15, paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        paddingRight: 15,
        marginTop:8,
      }}>



      <div style={{ position: "relative" }}>
        <span className="notify-badge" style={{
          fontWeight: "bold", borderRadius: 10,
          background: rankGradient[props.data.rank - 1],
          textAlign: "center",
          padding: "0.4vw",
          position: "absolute",
          fontSize:12,
          top: -10,
          left: 0

        }}>
          {getRankPos(props.data.rank)}
        </span>
        <img src={props.data.user.profile_pic ? props.data.user.profile_pic : defaultAvatar}
          style={{
            height: "5vw", width: "5vw",
            borderRadius: "50%",
            borderWidth: 3,
            borderColor:rankColor[props.data.rank - 1],
            borderStyle: "solid",
          }} />
      </div>


      <Col style={{ marginRight: 10, marginLeft: 10 }}>

        <span style={{ fontWeight: 900, fontSize: "0.9vw" }}>
          {props.data.user && props.data.user.name ? props.data.user.name : "Name : "}</span>

        <ProgressBar
          percent={(props.data.totalReferreral / props.maxReferals) * 100}
          // height={18}

          filledBackground={rankGradient[props.data.rank - 1]}
        />

        <span style={{ fontWeight: 900, fontSize: "0.9vw" }}>User ID : {props.data.userId}</span>



      </Col>

      <span style={{
        fontWeight: "bold", borderRadius: 10,
        background: rankGradient[props.data.rank - 1],
        textAlign: "center",
        padding: "0.5vw",
        fontSize: "18px"


      }}>
        {props.data.totalReferreral}
      </span>


    </Row>


  );
}


export default LinearWinnerTable;
