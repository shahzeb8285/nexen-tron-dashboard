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




  return (

   
    <Row  
    noGutters
    style={{backgroundColor: props.rank % 2 == 0?"#181b38":"#343a75",
      justifyContent:"start",
      marginTop:10,
      paddingLeft:15,paddingTop:10,
      paddingBottom:10,
      borderRadius:10,}}>


    <img src={defaultAvatar} style={{ height: 50, width: 50, borderRadius: "50%", border: "3px  solid white" }} />
    <div style={{ marginLeft: 10 ,width:"300px"}}>
      <h6 className='fw-semi-bold'>{props.name?props.name:""}</h6>
  <h6 className='fw-semi-bold'>ID : {props.id}</h6>

      <ProgressBar
        percent={(props.totalReferreral/props.maxReferals)*100}
        style={{width:"100%"}}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      />

  <h6 className='fw-semi-bold' style={{marginTop:5}}>Total Direct : {props.totalReferreral}</h6>


    </div>


  </Row>


  );
}


export default LinearWinnerTable;
