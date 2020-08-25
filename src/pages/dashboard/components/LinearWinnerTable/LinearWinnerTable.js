import React, { useState } from 'react';
import {
  Media,
  Container,
  Row,
  Col
} from 'reactstrap';
import defaultAvatar from "../../../../../src/images/avatar.png"
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

const LinearWinnerTable = (props) => {




  return (

   
    <div className="row"  style={{backgroundColor:props.isDark?"#181b38":"#343a75",padding:10,
    width:"max-content",
    borderRadius:10,}}>

    <img src={defaultAvatar} style={{ height: 50, width: 50, borderRadius: "50%", border: "3px  solid white" }} />
    <div style={{ marginLeft: 10 ,width:"300px"}}>
      <h6 className='fw-semi-bold'>Shahzeb Ahmed Khan</h6>
      <h6 className='fw-semi-bold'>ID : 235</h6>

      <ProgressBar
        percent={75}
        style={{width:"100%"}}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      />

      <h6 className='fw-semi-bold' style={{marginTop:5}}>Total Direct : 235</h6>


    </div>


  </div>


  );
}


export default LinearWinnerTable;
