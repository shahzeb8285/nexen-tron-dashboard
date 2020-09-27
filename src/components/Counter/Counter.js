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
import { useCountUp } from 'react-countup';

const Counter = (props) => {

  const SimpleHook = () => {
    const { countUp } = useCountUp({ end: props.counts });
    return <h2><strong>{countUp}</strong></h2>;
  };


  return (

   <Col style={{borderRadius:10,alignItems:"center",justifyContent: "center"}}>

    {SimpleHook()}

    <h4><strong>{props.title}</strong></h4>
   
   </Col>
  
  );
}


export default Counter;
