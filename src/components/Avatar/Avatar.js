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
  const fileChangedHandler = async(event)=>{
    console.log(event.target.files)
    const file = event.target.files[0];
    console.log(file);
    let name=file.name;
    const base64 =await convertBase64(file);
    console.log(base64);
    
  }
   
  const convertBase64=(file)=>{
    return new Promise((resolve,reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
          resolve(fileReader.result);
        };
        fileReader.onerror=(error)=>{
          reject(error);
        };
    })
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
