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
  let amount = 0;
  let position = 0;
  let isThisNextLevel = false;
  var bottomStartClr = startClr;
  var bottomEndClr = endClr;

  var data = null


  if (props.levelData) {
    data = props.levelData;
    icon = data.icon;
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
          position: "relative",
          paddingTop: "20px",
          display: "inline-block",

        }}
        className="hoverItem">


        <Col style={{
          padding: "5px",
          alignContent: "center"
        }}
          className={isThisNextLevel ? "shiver" : ""}

        >
          <Col style={{
            // background: "radial-gradient(farthest-side ellipse at 10% 0, " + startClr
            //   + " 20%, " + endClr + ")",

            filter: isBought ? null : " blur(2px)",
            WebkitFilter: isBought ? null : "blur(2px)",
            borderRadius: "8px 8px 0px 0px",
            padding: "2px",
            textAlign: "center",
            alignContent: "center",
            alignItems: "center",

            display: "block"


          }}

          >
            <img src={icon} className="img-responsive" style={{
              // height: 100,
              // width: 100,
              // borderRadius: "50%",
              // objectFit: "cover",
            }} alt="" />


          </Col>

          <Col style={{
            background: "radial-gradient(farthest-side ellipse at 10% 0, " + bottomStartClr
              + " 20%, " + bottomEndClr + ")",
            borderRadius: "0px 0px 8px 8px",
            textAlign: "center",
            padding: 5,
            margin: "0 auto"

          }}>

            <h5 className="">{amount} <span className="fw-bold">TRX</span></h5>

          </Col>





        </Col>




        {isBought ? <h5 style={{
          position: "absolute",
          left: "-20px",
          top: "10px",
          marginLeft: "20px",
          background: "radial-gradient(farthest-side ellipse at 10% 0, " + startClr
            + " 20%, " + endClr + ")",
          textAlign: "center",
          borderRadius: "5px",
          color: "white",
          padding: "8px 6px 6px 6px",
          fontWeight: "600",
          fontSize: "18px}"
        }}>{position}</h5>

          : null}
           <h5 style={{
          position: "absolute",
          right: "5px",
          top: "10px",
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

          {props.isLoss && !isBought? <img src={danger} style={{height:"20px"}}></img>:null}
          
         </h5>

      </Col>




    </>
  );
}


export default Level;
