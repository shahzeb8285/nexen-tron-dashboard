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
    var smallBanner = '<a href="https://nexen.live/?ref='+this.props.auth.userId+'"><img src="http://dash.nexen.live/static/media/ADVTISE250x250.gif" width="250" height="250" alt="Nexen.Live | Get 80% Direct + Daily Reward + 20%  Direct level 8% team Level bonus + Recycle bonus. Join with World`s advance smart Contract!"></a>'
    var mediumBanner = '<a href="https://nexen.live/?ref='+this.props.auth.userId+'"><img src="http://dash.nexen.live/static/media/ADVTISE468x90.gif" width="468" height="90" alt="Nexen.Live| Get 80% Direct + Daily Reward + 20%  Direct level 8% team Level bonus + Recycle bonus. Join with World`s advance smart Contract!"></a>'
    var largeBanner = '<a href="https://nexen.live/?ref='+this.props.auth.userId+'"><img src="http://dash.nexen.live/static/static/media/large.gif" width="728" height="90" alt="Nexen.Live | Get 80% Direct + Daily Reward + 20%  Direct level 8% team Level bonus + Recycle bonus. Join with World`s advance smart Contract!"></a>'

    this.setState({ smallBanner, mediumBanner, largeBanner });


  }






  componentWillReceiveProps(props) {
    console.log("123qwer", props);

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
      {this.state.isPageLoaded ?   <Row style={{ alignItems: "baseline" }}>
            <Col xs={8} lg={8} sm={8} md={8} xl={8}>
              <h3>
                Promo <span className="fw-semi-bold">Material</span>
              </h3>


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


                <img src={mediumGif} style={{ height: 90, width: 468, marginBottom: 15 }}></img>

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

                <img src={largeGif} style={{ height: 90, width: 500, marginBottom: 15 }}></img>

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


            {/* <Col xs={4} lg={4} sm={4} md={4} xl={4}>
              <div
                style={{
                  position: "relative",
                  marginTop: 10
                }}>


                <div

                  ref={this.winnerPhoto}

                  style={{
                    background: "radial-gradient(farthest-side ellipse at 10% 0, #fdcb6e 20%, #bf8415)",
                    // width: "100%",
                    borderRadius: "8px",
                    padding: "15px",
                    textAlign: "center",
                    marginTop: 0

                  }}>
                  <div className="image-crop" style={{
                    display: "block",
                    position: "relative",
                    backgroundColor: "#E6EBEE",
                    width: 150,
                    height: 150,
                    margin: "0 auto",
                    overflow: "hidden",
                    borderRadius: "50%",
                    boxs: "1px 1px 5px #4069E2",
                  }}>
                    <img src={defaultAvatar} style={{
                      height: 150,
                      width: 150,
                      objectFit: "cover",
                      borderRadius: "50%"
                    }} alt="" />
                  </div>


                  <div style={{ display: "inline-block" }}>

                    <h2 style={{ fontSize: 50, color: "#fff", fontWeight: "bold" }} >Name</h2>

                    <h4 style={{ color: "#fff" }}>Winning Date 22/May/2020</h4>



                    <div style={{
                      // background: "radial-gradient(farthest-side ellipse at 10% 0, #00b894 20%, #076e59)",
                      // width: "100%",
                      borderRadius: "8px",
                      padding: "15px",
                      // textAlign: "center",
                      marginTop: 0
                    }}>
                      <h2 style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }} >WON 300 TRX</h2>

                      <Row style={{ justifyContent: "space-between" }}>
                        <h2 style={{ fontSize: 25, color: "#fff", fontWeight: 700 }} >ID 300 </h2>
                        <div>&nbsp;</div>


                        <h2 style={{ fontSize: 25, color: "#fff", fontWeight: 700 }} >Directs 300 </h2>

                      </Row>

                    </div>
                  </div>
                </div>



              </div>
              <Button color="primary" style={{ width: "100%", marginTop: 10 }}
                onClick={() => {
                  htmlToImage.toPng(this.winnerPhoto.current, { quality: 0.95 })
                    .then(function (dataUrl) {
                      var link = document.createElement('a');
                      link.download = 'winner.jpeg';
                      link.href = dataUrl;
                      link.click();
                    });


                }} >


                Download Image
              </Button>




            </Col>
           */}
          
          
          
          </Row>
        
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
