import React,{Component} from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './UserTree.scss';
import Widget from '../../components/Widget';
import avatar from '../../images/people/a5.jpg';
import {Col,Row,Button} from 'reactstrap';
// import {Button} from '/reactstap'

export default class UserTree extends Component{
      render(){
          return(
            <Widget className="tree--main">
              <Row>
              <Col lg={2} xs={2}>
              <div className="prev--button">
                  <Button color="primary">
                    Prev
                  </Button>
              </div>
              </Col>
              <Col lg={8} xs={8}>
                <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<div className="user">
              <a href="#">
              <img src={avatar}></img>
              </a>
             <div className="user__id">
             <h6>Id 1</h6>
             </div>
             
              </div>}



          >
            <TreeNode label={
            <div className="user">
              <a href="#">
              <img src={avatar}></img>
              </a>
         
           <div className="user__id1">
           <h6>Id 1</h6>
           </div>
           
            </div>
              }>
              
            </TreeNode>
            <TreeNode label={ 
           <div className="user">
              
              <a href="#">
              <img src={avatar}></img>
              </a>
          <div className="user__id2">
          <h6>Id 1</h6>
          </div>
          
           </div>
            }>
              
               
               
             
            </TreeNode>
            <TreeNode label={ 
            <div className="user">
              
              <a href="#">
              <img src={avatar}></img>
              </a>
           <div className="user__id3">
           <h6>Id 1</h6>
           </div>
           
            </div>
            }>
            
            </TreeNode>

            <TreeNode label={
              <div className="user">
              
              <a href="#">
              <img src={avatar}></img>
              </a>
             <div className="user__id4">
             <h6>Id 1</h6>
             </div>
             
              </div>
            }></TreeNode>

          </Tree>
              
              </Col>

              <Col lg={2} xs={2}>
              <div className="prev--button">
                  <Button color="primary">
                    Next
                  </Button>
              </div>
              </Col>
                       
             </Row>
            </Widget>
         
          )
      }
}