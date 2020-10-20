import React from 'react';

import {
  Row, Col
} from 'reactstrap';


import 'swiper/components/scrollbar/scrollbar.scss';

import defaultAvatar from "../../images/avatar.png"
import { ProgressBar } from "react-step-progress-bar";
import WinnerTile from "../WinnerSlider/WinnerTile"
import LinearWinnerTable from "../LinearWinnerTable/LinearWinnerTable"
import { init } from 'echarts';
import { max } from 'moment';
import { apiService } from '../../Services/api.service';
// import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

// import { Splide, SplideSlide } from '@splidejs/react-splide';


import SwiperCore, { Autoplay } from 'swiper';

SwiperCore.use([Autoplay]);

const rankColor = [
  "#0984e3",
  "#b01ec6",
  "#402493",
  "#4c28b5",
  "#b01ec6",
  "#402493",
  "#4c28b5",
  "#b01ec6",
  "#621e94",
  "#0984e3"

]


const rankGradient = [
  "linear-gradient(to right, #0984e3, #06508a)",
  "linear-gradient(to right, #b01ec6,#ed0bd7)",
  "linear-gradient(to right, #402493, #8c24ad)",
  "linear-gradient(to right, #4c28b5, #2198c1)",
  "linear-gradient(to right, #b01ec6,#ed0bd7)",
  "linear-gradient(to right, #402493, #8c24ad)",
  "linear-gradient(to right, #4c28b5, #2198c1)",
  "linear-gradient(to right, #b01ec6,#ed0bd7)",
  "linear-gradient(to right, #621e94, #240b36)",
  "linear-gradient(to right, #0984e3, #06508a)"



]
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
    if (data.length < 1 || data[0].length < 1) {
      return
    }

    data = data[0]
    var maxReferals = data[0].totalReferreral
    for (var winner of data) {
      if(rankWinners.length == 8){
        break
      }
      if (winner.rank == 1) {
        rankWinners.push(<>
          <Row
            noGutters
            key={winner.user.userId}
            style={{
              background: "radial-gradient(farthest-side ellipse at 10% 0, " + "#fdcb6e"
                + " 20%, " + "#bf8415" + ")",
              paddingLeft: 15, paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10,
              marginTop: 10,
              paddingRight: 15,
            }}>


            <div style={{ position: "relative" }}>
              <span className="notify-badge" style={{
                fontWeight: "bold", borderRadius: 10,
                background: rankGradient[0],
                textAlign: "center",
                padding: "0.4vw",
                position: "absolute",
                top: -5,
                left: 0

              }}>
                1st
                  </span>
              <img src={winner.user.profile_pic ? winner.user.profile_pic : defaultAvatar}
                style={{
                  height: "5vw", width: "5vw",
                  borderRadius: "50%",
                  borderWidth: 3,
                  borderColor: rankColor[0],
                  borderStyle: "solid",
                  // borderImage: rankGradient[0]
                }} />
            </div>


            <Col style={{ marginRight: 10, marginLeft: 10 }}>

              <span style={{ fontWeight: 900, fontSize: "0.9vw",color:"#000" }}>
                {winner.user && winner.user.name ? winner.user.name : "Name :"}</span>

              <ProgressBar
                percent={(winner.totalReferreral / maxReferals) * 100}
                // height={18}

                filledBackground={rankGradient[0]}
              />

              <span style={{ fontWeight: 900, fontSize: "0.9vw" ,color:"#000"}}>User ID : {winner.userId}</span>



            </Col>

            <span style={{
              fontWeight: "bold", borderRadius: 10,
              background: rankGradient[0],
              textAlign: "center",
              padding: "0.5vw",
              fontSize: "18px"


            }}>
              {winner.totalReferreral}
            </span>

          </Row>

        </>
        )
      } else {
        winners.push(
          <LinearWinnerTable key={winner.userId} data={winner} maxReferals={maxReferals} />

        )
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



        <h2 style={{ fontWeight: "bold" ,fontSize:35,
        textAlign:"center",marginTop:10,marginBottom:10}}>Super Seven</h2>


        {this.state.winners}

        {/* <Swiper
          style={{ height: "auto" }}
          slidesPerView={7}
          spaceBetween={0}
          autoHeight={true}
          autoplay={{
            delay: 3000
          }}

          direction="vertical"

        >




          {this.state.rankWinners}

          {this.state.winners}






        </Swiper> */}
      </>

    );
  }

}

export default RewardRankWinner;
