import React, { Component } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import "./UserTree.scss";
import Widget from "../Widget/Widget";
import avatar from "../../images/people/a5.jpg";
import { Col, Row, Button } from "reactstrap";
// import {Button} from '/reactstap'

export default class UserTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  renderTree() {
    return <div style={{ alignItems: "flex-start", padding: 20 }}>
      <Row style={{ }}>

        <div className="prev--button" style={{marginRight:80}}>
          <a

            onClick={() => {
              if(!this.props.disablePrevButton){
                this.props.onPreviousButtonClick();
              }
            }}
          >

            <h5 style={{


              textAlign: "center",
              borderRadius: "50%",
              justifyContent: "center",
              color: "white",
              fontWeight: "600",
              fontSize: "18px}"
            }}>Back</h5>

            <img src={(require("../../images/backbtn.png"))} style={{ height: 50 }}></img>

          </a>


        </div>

        <div>
          <h5 style={{


            textAlign: "center",
            borderRadius: "50%",
            justifyContent: "center",
            color: "white",
            fontWeight: "600",
            fontSize: "18px}"
          }}>Level</h5>
          <h5 style={{

            background: "radial-gradient(farthest-side ellipse at 10% 0, " + "#ed0bd7"
              + " 20%, " + "#ed0bd7" + ")",
            textAlign: "center",
            borderRadius: "50%",
            height: 50,
            justifyContent: "center",
            width: 50,
            fontSize:26,
            color: "white",
            padding: "8px",
            fontWeight: "bold",
          }}>{this.props.levelNumber}</h5>

        </div>
      </Row>
      <Tree
        lineWidth={"2px"}
        lineColor={"#fccb6e"}
        lineBorderRadius={"10px"}
        label={
          <Row noGutters>



            <div className="user">
              <a >
                <img src={avatar}></img>
              </a>
              <div className="user__id">
                <h4 style={{color:"#000"}}><strong>{this.props.data.id}</strong></h4>
              </div>
            </div>



          </Row>
        }
      >
        {this.props.data.referrals[0] ? (
          <TreeNode
            label={
              <Row noGutters>


                <div
                  className="user1"
                  onClick={() => {
                    this.props.onPersonClick(
                      this.props.data.referrals[0]
                    )
                  }}
                >
                  <a>
                    <img src={avatar}></img>
                  </a>

                  <div className="user__id1">
                    <h4 style={{color:"#000"}}><strong>{this.props.data.referrals[0]}</strong></h4>

                  </div>
                </div>


              </Row>
            }
          ></TreeNode>
        ) : null}
        {this.props.data.referrals[1] ? (
          <TreeNode
            label={
              <div
                className="user2"
                onClick={() => {
                  this.props.onPersonClick(
                    this.props.data.referrals[1]
                  )
                }}
              >
                <a>
                  <img src={avatar}></img>
                </a>
                <div className="user__id2">
                  <h4 style={{color:"#000"}}> <strong>{this.props.data.referrals[1]}</strong></h4>
                </div>
              </div>
            }
          ></TreeNode>
        ) : null}
        {this.props.data.referrals[2] ? (
          <TreeNode
            label={
              <div
                className="user3"
                onClick={() => {
                  this.props.onPersonClick(
                    this.props.data.referrals[2]
                  )
                }}
              >
                <a>
                  <img src={avatar}></img>
                </a>
                <div className="user__id3">
                  <h4 style={{color:"#000"}}><strong>{this.props.data.referrals[2]}</strong></h4>
                </div>
              </div>
            }
          ></TreeNode>
        ) : null}

        {this.props.data.referrals[3] ? (
          <TreeNode
            label={
              <div
                className="user4"
                onClick={() => {
                  this.props.onPersonClick(
                    this.props.data.referrals[3]
                  )
                }}
              >
                <img src={avatar}></img>

                <div className="user__id4">
                  <h4 style={{color:"#000"}}><strong>{this.props.data.referrals[3]}</strong></h4>
                </div>
              </div>
            }
          ></TreeNode>
        ) : null}
      </Tree>



    </div>

  }


  componentWillReceiveProps(nextProps) {

  }
  render() {
    return (
      <>
        {this.renderTree()}
      </>
    );
  }
}
