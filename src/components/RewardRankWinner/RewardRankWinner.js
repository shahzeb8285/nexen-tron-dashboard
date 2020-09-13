import React from 'react';

import {
  Row, Col
} from 'reactstrap';


import WinnerTile from "../WinnerSlider/WinnerTile"
import LinearWinnerTable from "../LinearWinnerTable/LinearWinnerTable"
import { init } from 'echarts';
import { max } from 'moment';

class RewardRankWinner extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      rankWinnersUiItem:[],
      winnersUiItem:[]
    }
  }
 


  getRankWinner(data){

    if(data.rank ==1){
        return   <Col size={4}>
        <WinnerTile
          rank="1st"
          user={{
            avatar:data.avatar,
            name: data.name?data.name:data.id,
          }}
          startColor={"#fdcb6e"}
          endColor={"#bf8415"}
        />
      </Col>

    }else  if(data.rank ==2){
      return  <Col size={4}>
      <WinnerTile
        rank="2nd"
        className="col"
        user={{
          avatar:data.avatar,
          name: data.name?data.name:data.id,
        }}
        startColor={"#BEC0C2"}
        endColor={"#70706F"}
      />

    </Col>

    }else  if(data.rank ==3){
      return   <Col size={4}>
        <WinnerTile
          rank="3rd"
          className="col"
          user={{
            avatar:data.avatar,
            name: data.name?data.name:data.id,
          }}
          startColor={"#c31432"}
          endColor={"#240b36"}
        />

      </Col>


    }
  }


 
  componentWillUnmount() {
  }


  componentWillReceiveProps(props){
    if(props.winners){
      this.initWinners(props.winners);
    }
  }


  initWinners(data){
    var rankWinners=[];
    var winners = [];
    var maxReferals = data[0].totalReferreral
    for(var winner of data){
        if(winner.rank ==1 || winner.rank ==2 || winner.rank ==3){
            rankWinners.push(this.getRankWinner(winner))
        }else{
            winners.push(    <LinearWinnerTable data={winner} maxReferals={maxReferals}/> )
        }
    }

    this.setState({rankWinners,winners})
  }
  render() {
    return (
      <>
      <Row noGutters>
       {this.state.rankWinnersUiItem}
      </Row>


      {this.state.winners}

      </>

    );
  }

}

export default RewardRankWinner;
