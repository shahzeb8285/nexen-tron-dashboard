import React, { useState } from 'react';
import {
  Media,
  Container,
  Row,
  Col
} from 'reactstrap';

import defaultAvatar from "../../images/avatar.png"

import Widget from '../Widget/Widget';




const WinnerTile = (props) => {








  return (

    <div
    key={props.data.user}
    style={{
        position: "relative",
        marginLeft:5,
        marginTop:0
      }}>


        <div style={{
          background: "radial-gradient(farthest-side ellipse at 10% 0, " + props.startColor
            + " 20%, " + props.endColor + ")",
          // width: "100%",
          borderRadius: "8px",
          padding: "15px",
          textAlign: "center",
          marginTop:0

        }}>
          <div className="image-crop" style={{
            display: "block",
            position: "relative",
            backgroundColor: "#E6EBEE",
            width: "80px",
            height: "80px",
            margin: "0 auto",
            overflow: "hidden",
            borderRadius: "50%",
            boxs: "1px 1px 5px #4069E2",
          }}>
            {/* <img id="avatar" src={props.user.avatar} ></img> */}
            <img src={props.data.user.profile_pic?props.data.user.profile_pic:defaultAvatar} style={{
              height: 80,
              width: 80,
              objectFit: "cover",
              borderRadius: "50%"
            }} alt="" />
          </div>


          <div style={{display:"inline-block"}}>
            <h5 className={"fw-semi-bold"}>{props.data.user.name?props.data.user.name:"-"}</h5>

            <div id="stats" className="row" style={{display:"block",overflow:"initial" }}>
              <Row style={{borderRadius:5,opacity:.6,backgroundColor:"#000",}}>
                <Col>
                <span className={"fw-bold"}>ID</span>
                </Col>


                <Col>
                <span>{props.data.userId}</span>
                </Col>

              </Row>

              <Row style={{borderRadius:5,opacity:.6,backgroundColor:"#000",marginTop:5}}>
                <Col>
                <span className={"fw-bold"}>Directs</span>
                </Col>


                <Col>
                <span>{props.data.totalReferreral}</span>
                </Col>

              </Row>

            </div>

          </div>
        </div>


    
      </div>



  );
}


export default WinnerTile;
