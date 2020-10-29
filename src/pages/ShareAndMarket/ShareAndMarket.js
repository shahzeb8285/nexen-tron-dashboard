import React, { Component } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  ModalBody,
  Modal,

  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import WinnerCard from "../../components/WinnerCard/WinnerCard"
import { Spinner } from 'reactstrap';
import { backgroundColor } from 'echarts/lib/theme/dark';
import './ShareAndMarket.scss';
import Widget from '../../components/Widget/Widget';
import defaultAvatar from "../../images/avatar.png"
import smallGif from "../../marketing/ADVTISE250x250.gif"
import mediumGif from "../../marketing/ADVTISE468x90.gif"
import largeGif from "../../marketing/large.gif"

import { connect } from "react-redux";
import { withRouter } from "react-router";

import htmlToImage from 'html-to-image';

class ShareAndMarket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPageLoaded: true,
      reward: null
    }
    this.winnerPhoto = React.createRef()

  }


  componentDidMount() {
    // this.setState({ islogin: !true })
    var smallBanner = '<a href="https://nexen.live/?ref=' + this.props.auth.userId + '"><img src="http://dash.nexen.live/static/media/ADVTISE250x250.gif" width="250" height="250" alt="Nexen.Live | Get 80% Direct + Daily Reward + 20%  Direct level 8% team Level bonus + Recycle bonus. Join with World`s advance smart Contract!"></a>'
    var mediumBanner = '<a href="https://nexen.live/?ref=' + this.props.auth.userId + '"><img src="http://dash.nexen.live/static/media/ADVTISE468x90.gif" width="468" height="90" alt="Nexen.Live| Get 80% Direct + Daily Reward + 20%  Direct level 8% team Level bonus + Recycle bonus. Join with World`s advance smart Contract!"></a>'
    var largeBanner = '<a href="https://nexen.live/?ref=' + this.props.auth.userId + '"><img src="http://dash.nexen.live/static/static/media/large.gif" width="728" height="90" alt="Nexen.Live | Get 80% Direct + Daily Reward + 20%  Direct level 8% team Level bonus + Recycle bonus. Join with World`s advance smart Contract!"></a>'

    this.setState({ smallBanner, mediumBanner, largeBanner });


  }






  componentWillReceiveProps(props) {
    console.log("123qwer", props.profile);

    if (props.user && props.user.walletAddress) {
      this.setState({ walletAddress: props.user.walletAddress, isPageLoaded: true })
    }
  }



  renderPageLoadingDialoge() {
    return (
      <>
        <Modal isOpen={!this.state.isPageLoaded}>
          <ModalBody>
            <Row>
              <Spinner color="secondary" />
              <h4 style={{ marginLeft: 10 }}>Loading...</h4>
            </Row>
          </ModalBody>
        </Modal>
      </>
    );
  }



  render() {
    return (
      <>
        {this.state.isPageLoaded ?



          <>

            <h3>
              Promo <span className="fw-semi-bold">Material</span>
            </h3>

            <Row style={{ alignItems: "baseline" }}>
          <Col xs={6} lg={6} sm={6} md={6} xl={6}>
           


            <Col style={{
              marginTop: 25, marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}>


              <img src={smallGif} style={{ height: 150, width: 150, marginBottom: 15 }}></img>

              <h4>
                Size <span className="fw-semi-bold">250px x 250px</span>
              </h4>


              <input type="text" value={this.state.smallBanner} style={{
                background: "#fff",
                paddingLeft: 8,
                paddingRight: 8,

                paddingTop: 12,
                marginTop: 12,
                paddingBottom: 12,
                fontSize: 18,
                borderWidth: 0,
                // fontWeight: "bold",
                borderRadius: 8, width: "100%"
              }} />



            </Col>


            <Col style={{
              marginTop: 50,
              marginBottom: 50,
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}>


              <img src={mediumGif} style={{ height: 90, width: 200, marginBottom: 15 }}></img>

              <h4>
                Size <span className="fw-semi-bold">468px x 90px</span>
              </h4>


              <input type="text" value={this.state.mediumBanner} style={{
                background: "#fff",
                paddingLeft: 8,
                paddingRight: 8,

                paddingTop: 12,
                marginTop: 12,
                paddingBottom: 12,
                fontSize: 18,
                borderWidth: 0,
                // fontWeight: "bold",
                borderRadius: 8, width: "100%"
              }} />



            </Col>





            <Col style={{
              marginTop: 25, marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}>

              <img src={largeGif} style={{ height: 90, width: 300, marginBottom: 15 }}></img>

              <h4>
                Size <span className="fw-semi-bold">728px x 90px</span>
              </h4>


              <input type="text" value={this.state.largeBanner} style={{
                background: "#fff",
                paddingLeft: 8,
                paddingRight: 8,

                paddingTop: 12,
                marginTop: 12,
                paddingBottom: 12,
                fontSize: 18,
                borderWidth: 0,
                // fontWeight: "bold",
                borderRadius: 8, width: "100%"
              }} />



            </Col>

          </Col>





          <Col xs={6} lg={6} sm={6} md={6} xl={6}>

            <WinnerCard
            />
          </Col>

        </Row>
          </>


          : this.renderPageLoadingDialoge()}</>
    )
  }
}


function mapStateToProps(store) {
  return {
    user: store.Web3Reducer.user,
    profile: store.ProfileReducer.profile,
    auth: store.auth,

  };
}

export default withRouter(connect(mapStateToProps)(ShareAndMarket));
