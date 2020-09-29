import React from 'react';

import {
  Row, Col
} from 'reactstrap';

import defaultAvatar from "../../images/avatar.png"
import { ProgressBar } from "react-step-progress-bar";
import WinnerTile from "../WinnerSlider/WinnerTile"
import LinearWinnerTable from "../LinearWinnerTable/LinearWinnerTable"
import { init } from 'echarts';
import { max } from 'moment';
import { apiService } from '../../Services/api.service';

class RewardRankWinner extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      rankWinnersUiItem: [],
      winnersUiItem: []
    }
  }



  getRankWinner(data) {
    var tile = null
    if (data.rank == 1) {

      tile = <WinnerTile
        rank="1st"
        data={data}

        startColor={"#fdcb6e"}
        endColor={"#bf8415"}
      />


    } else if (data.rank == 2) {
      tile = <WinnerTile
        rank="2nd"
        className="col"
        data={data}

        startColor={"#BEC0C2"}
        endColor={"#70706F"}
      />

    } else if (data.rank == 3) {
      tile = <WinnerTile
        rank="3rd"
        className="col"
        // user={{
        //   avatar:data.profile_pic,
        //   name: data.name?data.name:data.id,
        // }}
        data={data}
        startColor={"#c31432"}
        endColor={"#240b36"}
      />



    }

    return <Col size={4} key={data.userId}>
      {tile}
    </Col>


  }



  componentWillUnmount() {
  }


  componentWillReceiveProps(props) {
    // if(props.winners){
    //   this.initWinners(props.winners);
    // }
  }


  async componentDidMount() {
    var winnerRes = await apiService.getWinners()
    if (winnerRes.status == 200) {
      var data = winnerRes.data;
      this.initWinners(data);
      console.log("winnerppoood", data)
    }
    console.log("winnerRes", winnerRes)
  }

  initWinners(data) {
    data.sort((a, b) => {
      return a.rank - b.rank;
    });
    console.log("wiinnersData", data)
    var rankWinners = [];
    var winners = [];
    if (data.length < 1 || data[0].length <1 ) {
      return
    }

    data = data[0]
    var maxReferals = data[0].totalReferreral
    for (var winner of data) {
      if (winner.rank == 1) {
        // rankWinners.push(this.getRankWinner(winner))
        rankWinners.push(<Row
          noGutters
          key={winner.user.userId}
          style={{
            background: "radial-gradient(farthest-side ellipse at 10% 0, " + "#fdcb6e"
              + " 20%, " + "#bf8415" + ")", justifyContent: "start",
            paddingLeft: 15, paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 10,
          }}>


          <Col xs={2} lg={2} sm={2} md={2} xl={2}>
            <img src={winner.user.profile_pic ? winner.user.profile_pic : defaultAvatar}
              style={{
                height: 50, width: 50,
                borderRadius: "50%", border: "3px  solid white"
              }} />

          </Col>


          <Col xs={10} lg={10} sm={10} md={10} xl={10}>
            <div style={{ marginLeft: 10, marginRight: 10 }}>



              <h4 className="winnerTitle"> <strong>Winner</strong></h4>
              <h6 className='fw-semi-bold' style={{ marginTop: 5 }}>
                <strong>Rank : {winner.rank}</strong></h6>
              {winner.user.name ?
                <h6 className='fw-semi-bold'>Name : {winner.user.name}</h6>
                : null}
              <h6 className='fw-semi-bold'>ID : {winner.userId}</h6>

              <ProgressBar
                percent={(winner.totalReferreral / maxReferals) * 100}
                style={{}}
                filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
              />

              <h6 className='fw-semi-bold' style={{ marginTop: 5 }}>
                Total Direct : {winner.totalReferreral}</h6>




            </div>

          </Col>


        </Row>


        )
      } else {
        winners.push(<LinearWinnerTable key={winner.userId} data={winner} maxReferals={maxReferals} />)
      }
    }

    this.setState({ rankWinners, winners })
  }
  render() {
    return (
      <>
        {/* <Row noGutters>
          {this.state.rankWinners}
        </Row> */}
        {this.state.rankWinners}

        {this.state.winners}

      </>

    );
  }

}

export default RewardRankWinner;
