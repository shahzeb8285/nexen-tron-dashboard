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
  function fileChangedHandler(event){
    console.log(event.target.files)
    const file = event.target.files[0];
    console.log(file);
    let name=file.name;
    
  }
  return (
    <>
     
    <img src={avatar}
                  style={
                    { borderRadius: "50%",marginBottom:5 ,
                    ...props.extraStyle}}
                />
                <input type="file" onChange={fileChangedHandler} placeholder="change pic"/>
    </>

   
   
   
  
  );
}


export default Avatar;
