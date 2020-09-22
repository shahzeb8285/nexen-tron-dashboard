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
      style={{
        backgroundColor: props.data.rank % 2 == 0 ? "#181b38" : "#343a75",
        justifyContent: "start",
        marginTop: 10,
        paddingLeft: 15, paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
      }}>



      <Col  xs={2} lg={2} sm={2} md={2} xl={2}>
        <img src={props.data.user.profile_pic ? props.data.user.profile_pic : defaultAvatar} style={{ height: 50, width: 50, borderRadius: "50%", border: "3px  solid white" }} />

      </Col>

      <Col  xs={10} lg={10} sm={10} md={10} xl={10}>
        <div style={{ marginLeft: 10,marginRight:10 }}>

        <h6 className='fw-semi-bold' style={{ marginTop: 5 }}>
              <strong>Rank : {props.data.rank}</strong></h6>
          {props.data.user.name ? <h6 className='fw-semi-bold'>Name : {props.data.user.name}</h6>
            : null}
          <h6 className='fw-semi-bold'>ID : {props.data.userId}</h6>

          <ProgressBar
            percent={(props.data.totalReferreral / props.maxReferals) * 100}
            style={{ }}
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
          />

          <h6 className='fw-semi-bold' style={{ marginTop: 5 }}>Total Direct : {props.data.totalReferreral}</h6>

        

        </div>

      </Col>



    </Row>


  );
}


export default LinearWinnerTable;
