import React, { Component } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import "./UserTree.scss";
import Widget from "../../components/Widget";
import avatar from "../../images/people/a5.jpg";
import { Col, Row, Button } from "reactstrap";
// import {Button} from '/reactstap'
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router";


class UserTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevelData: null,
      levelsData: [],
      levelDataArchive: [],
      rootUser: null,
      levelNumber: 0,
      isLoading: false
    }
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.user && nextProps.user.referralTree) {
      var levelsData = [nextProps.user.referralTree]
      var levelDataArchive = [nextProps.user.referralTree]
      var currentLevelData = nextProps.user.referralTree
      this.setState({ levelsData, levelDataArchive, currentLevelData })
    }


  }

  async onPersonClick(userId) {

    console.log("onPersonClick",userId)
    if(!userId){
      return
    }
    var currentLevelData = null;
    var levelsData = this.state.levelsData;
    var levelDataArchive = this.state.levelDataArchive
    for (var data of levelDataArchive) {

      if (userId === data.id) {
        currentLevelData = data;
        break
      }

    }

    if (currentLevelData) {
      levelsData.push(currentLevelData)
    } else {
      try {
        this.setState({isLoading:true})
        currentLevelData = await this.props.tronRef.getUserReferrals(userId);
        levelsData.push(currentLevelData);
        levelDataArchive.push(currentLevelData)
      } catch (error) {
        console.log("TreeError", error)
      }
    }


    if (currentLevelData == null) {
      this.setState({isLoading:false})

    } else {
      this.setState({ levelsData, levelDataArchive, currentLevelData ,isLoading:false})

    }

    // this.setState({rootUser:userId})
  }



  onBackClicked() {
    console.log("clickedbac")
    var levelsData = this.state.levelsData;
    var currentLevelData = this.state.currentLevelData
    if (levelsData.length >1) {
      levelsData.pop();
      currentLevelData = levelsData[levelsData.length-1]
    }
    this.setState({ levelsData, currentLevelData })

  }
  render() {
    return (
      <>
        {this.state.isLoading ? <p>Loading</p> : this.state.currentLevelData ?
          <div style={{ alignItems: "flex-start", padding: 20 }}>
            <Row style={{}}>

              <div className="prev--button" style={{ marginRight: 80 }}>
                <a

                  onClick={() => {
                    this.onBackClicked()
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
                  fontSize: 26,
                  color: "white",
                  padding: "8px",
                  fontWeight: "bold",
                }}>{this.state.levelsData.length}</h5>

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
                      <div className="user__id">
                      <h4 style={{ color: "#000" }}><strong>{this.state.currentLevelData.id}</strong></h4>
                    </div>
                    </a>
                   
                  </div>



                </Row>

              }
            >

              <>

                {this.state.currentLevelData.referrals[0] ?
                  <TreeNode
                    label={
                      <Row noGutters>
                        <div
                          className="user1"
                          onClick={() => {
                            this.onPersonClick(
                              this.state.currentLevelData.referrals[0])
                          }}
                        >
                          <a>
                            <img src={avatar}></img>
                            <div className="user__id1">
                            <h4 style={{ color: "#000" }}><strong>{this.state.currentLevelData.referrals[0]}</strong></h4>

                          </div>
                          </a>

                          
                        </div>


                      </Row>
                    }
                  />
                  : null}





                {this.state.currentLevelData.referrals[1] ?
                  <TreeNode
                    label={
                      <div
                        className="user2"
                        onClick={() => {
                          this.onPersonClick(
                            this.state.currentLevelData.referrals[1])
                        }}
                      >
                        <a>
                          <img src={avatar}></img>
                          <h4 style={{ color: "#000" }} className="user__id2"> <strong>{this.state.currentLevelData.referrals[1]}</strong></h4>

                        </a>
                       
                      </div>
                    }
                  ></TreeNode>
                  : null}


                {this.state.currentLevelData.referrals[2] ?

                  <TreeNode
                    label={
                      <div
                        className="user3"
                        onClick={() => {
                          this.onPersonClick(
                            this.state.currentLevelData.referrals[2])
                        }}
                      >
                        <a>
                          <img src={avatar}></img>
                          <div className="user__id3">
                          <h4 style={{ color: "#000" }}><strong>{this.state.currentLevelData.referrals[2]}</strong></h4>
                        </div>
                        </a>
                       
                      </div>
                    }
                  /> : null}

                {this.state.currentLevelData.referrals[3] ?
                  <TreeNode
                    label={
                      <div
                        className="user4"
                        onClick={() => {
                          this.onPersonClick(
                            this.state.currentLevelData.referrals[3])
                        }}
                      >
                        <a> <img src={avatar}></img>
                        
                        <div className="user__id4">
                          <h4 style={{ color: "#000" }}><strong>{this.state.currentLevelData.referrals[3]}</strong></h4>
                        </div>
                        
                        </a>

                       
                      </div>
                    }
                  /> : null}


              </>

            </Tree>
          </div>

          : null
        }
      </>
    );
  }
}



function mapStateToProps(store) {
  return {
    user: store.Web3Reducer.user,
  };
}

export default withRouter(connect(mapStateToProps)(UserTree));
