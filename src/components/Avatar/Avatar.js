import React, { useState,useEffect } from 'react';
import {
  Media,
  Container,
  Row,
  Col
} from 'reactstrap';
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import defaultAvatar from "../../images/avatar.png"
const Avatar = (props) => {


  const [avatar,setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    // Update the document title using the browser API
    setAvatar(props.src)
  });
  return (

   
    <img src={avatar}
                  style={
                    { borderRadius: "50%",marginBottom:5 ,
                    ...props.extraStyle}}
                />
  
  );
}


export default Avatar;
