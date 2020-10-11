import React, { useState } from 'react';
import {
  Media,
  Container,
  Row,
  Col
} from 'reactstrap';


import Widget from '../../../../components/Widget/Widget';
import danger from '../Level/warning.png'



const Level = (props) => {


  let startClr = "#787777"
  let endClr = "#a8a8a8"
  let isBought = false;
  let icon = "";
  let disicon = "";
  let amount = 0;
  let position = 0;
  let isThisNextLevel = false;
  var bottomStartClr = startClr;
  var bottomEndClr = endClr;

  var data = null


  if (props.levelData) {
    data = props.levelData;
    icon = data.icon;
    disicon = data.disicon;
    isBought = data.isBought;
    amount = data.amountTag;
    position = data.position;
    isThisNextLevel = data.isThisNextLevel
  }
  if (props.enable) {
    isBought = true
  }
  if (isBought) {
    startClr = data.bgStartColor
    endClr = data.bgEndColor
    bottomStartClr = data.bgStartColor
    bottomEndClr = data.bgEndColor
  }


  if (isThisNextLevel) {
    bottomStartClr = data.bgStartColor
    bottomEndClr = data.bgEndColor
  }





  return (

    <>

      <Col
        onClick={() => {
          if (props.onLevelClicked) {
            props.onLevelClicked(props.levelData)
          }
        }}

        style={{
          // position: "relative",
          // paddingTop: "20px",
          // display: "inline-block",

        }}
        className="hoverItem">


        <img src={isBought ? icon : disicon} style={{
          height:"auto",
          width: "100%",
          objectFit: "contain",
        }} alt="" />




        <h5 style={{
          position: "absolute",
          // right: "5px",
          bottom: "0",
          marginLeft: "20px",
          // background: "radial-gradient(farthest-side ellipse at 10% 0, " + startClr
          // + " 20%, " + endClr + ")",
          textAlign: "center",
          borderRadius: "5px",
          color: "white",
          // padding: "8px 6px 6px 6px",
          fontWeight: "600",
          fontSize: "18px}"
        }}>

          {props.isLoss && !isBought ? <img src={danger} style={{ height: "20px" }}></img> : null}

        </h5>

      </Col>




    </>
  );
}


export default Level;
