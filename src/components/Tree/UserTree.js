import React, { Component } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import "./UserTree.scss";
import Widget from "../../components/Widget";
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


  render() {
    return (
      <>
        {this.props.data ? <Row style={{alignItems:"flex-start"}}>
          <Col >
            {this.props.disablePrevButton ? <div className="prev--button">
              <Button

                color="primary"
                onClick={() => {
                  this.props.onPreviousButtonClick();
                }}
              >
                Prev
            </Button>
            </div> : null}
          </Col>
          <Col style={{width:"100%"}} >
            <Tree
              lineWidth={"2px"}
              lineColor={"green"}
              lineBorderRadius={"10px"}
              label={
                <Row noGutters>
{/* 
                  <Button

                    color="primary"
                    onClick={() => {
                      this.props.onPreviousButtonClick();
                    }}
                  >
                    Prev
</Button> */}



                  <div className="user">
                    <a >
                      <img src={avatar}></img>
                    </a>
                    <div className="user__id">
                      <h6>{this.props.data.id}</h6>
                    </div>
                  </div>

                  {/* <h5 style={{

                    background: "radial-gradient(farthest-side ellipse at 10% 0, " + "#c31432"
                      + " 20%, " + "#240b36" + ")",
                    textAlign: "center",
                    borderRadius: "5px",
                    color: "white",
                    padding: "8px 6px 6px 6px",
                    fontWeight: "600",
                    fontSize: "18px}"
                  }}>Level Number {this.props.levelNumber}</h5> */}


                </Row>
              }
            >
              {this.props.data.referrals[0] ? (
                <TreeNode
                  label={
                    <Row noGutters>


                      <div
                        className="user"
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
                          <h6>{this.props.data.referrals[0]}</h6>
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
                      className="user"
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
                        <h6>{this.props.data.referrals[1]}</h6>
                      </div>
                    </div>
                  }
                ></TreeNode>
              ) : null}
              {this.props.data.referrals[2] ? (
                <TreeNode
                  label={
                    <div
                      className="user"
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
                        <h6>{this.props.data.referrals[2]}</h6>
                      </div>
                    </div>
                  }
                ></TreeNode>
              ) : null}

              {this.props.data.referrals[3] ? (
                <TreeNode
                  label={
                    <div
                      className="user"
                      onClick={() => {
                        this.props.onPersonClick(
                          this.props.data.referrals[3]
                        )
                      }}
                    >
                      <a>
                        <img src={avatar}></img>
                      </a>
                      <div className="user__id4">
                        <h6>{this.props.data.referrals[3]}</h6>
                      </div>
                    </div>
                  }
                ></TreeNode>
              ) : null}
            </Tree>
          </Col>

          <Col >
            <h5 style={{

              background: "radial-gradient(farthest-side ellipse at 10% 0, " + "#c31432"
                + " 20%, " + "#240b36" + ")",
              textAlign: "center",
              borderRadius: "5px",
              color: "white",
              padding: "8px 6px 6px 6px",
              fontWeight: "600",
              fontSize: "18px}"
            }}>Level Number {this.props.levelNumber}</h5>

          </Col>
        </Row>
          : <h3>No Data</h3>
        }
      </>
    );
  }
}
