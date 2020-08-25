import React,{Component} from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './UserTree.scss';
import Widget from '../../components/Widget';
import avatar from '../../images/people/a5.jpg';

export default class UserTree extends Component{
      render(){
          return(
            <Widget>
                        <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<div>
              
              <img src={avatar}></img>
              </div>}
          >
            <TreeNode label={
            <div>
              
              <img src={avatar}></img>
              </div>
              }>
              
            </TreeNode>
            <TreeNode label={ <div>
              
              <img src={avatar}></img>
              </div>}>
              
               
               
             
            </TreeNode>
            <TreeNode label={ <div>
              
              <img src={avatar}></img>
              </div>}>
            
            </TreeNode>
            <TreeNode label={ <div>
              
              <img src={avatar}></img>
              </div>}></TreeNode>

          </Tree>
            </Widget>
         
          )
      }
}