
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Badge, Col, Row, Table, Button, Modal,Spinner,
  ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { incomeFetched, userFetched, onLevelUpdated } from "../../actions/web3Actions";
import { toast } from 'react-toastify';
import { compose } from 'redux';
import  Level from '../../pages/dashboard/components/Level/Level'

class TronProvider extends React.Component {


  constructor(props) {
    super(props);




    this.state = {
      user: {},
      income: {},
      mlm: null,
      selectedLevel:{
        position: 1,
        amount: 50000000000000000,
        icon: require("../../images/levels/l1.png"),
        isBought:  1,
        amountTag: "0.05",
  
        bgStartColor: "#621e94",
        bgEndColor: "#240b36"
      }
    };
  }


  async componentDidMount() {
    // let userId =this.props.auth.userId
    // // this.setState({userId:parseInt(this.props.auth.userId)})
    // await this.loadWeb3();
    // await this.loadBlockchainData();

    // if (!this.state.InitError) {
    //   await this.initUsersFunds(userId);
    //   await this.initUser(userId)
    // }





  }




  showBuyLevelDialog(level){
    this.setState({visibleBuyModal:true,selectedLevel:level})
   


  }


  async loadBlockchainData() {

  }





  getLevels(levelNumber) {
    console.log("^^^^^^^^^^^^^^^^", levelNumber)
    var levels = [];


    levels.push({
      position: 1,
      amount: 50000000000000000,
      icon: require("../../images/levels/l1.png"),
      isBought: levelNumber >= 1,
      amountTag: "0.05",

      bgStartColor: "#621e94",
      bgEndColor: "#240b36"
    })

    levels.push({
      position: 2,
      amount: 100000000000000000,
      icon: require("../../images/levels/l2.png"),
      isBought: levelNumber >= 2,
      amountTag: "0.10",

      bgStartColor: "#0984e3",
      bgEndColor: "#06508a"

    })


    levels.push({
      position: 3,
      amount: 150000000000000000,
      amountTag: "0.15",

      icon: require("../../images/levels/l3.png"),
      isBought: levelNumber >= 3,
      bgStartColor: "#fdcb6e",
      bgEndColor: "#bf8415",

    })


    levels.push({
      position: 4,
      amount: 2000,
      amountTag: "0.20",

      icon: require("../../images/levels/l4.png"),
      isBought: levelNumber >= 4,
      bgStartColor: "#787777",
      bgEndColor: "#a8a8a8"

    })


    levels.push({
      position: 5,
      amount: 2500,
      icon: require("../../images/levels/l5.png"),
      isBought: levelNumber >= 5,
      amountTag: "0.25",

      bgStartColor: "#961516",
      bgEndColor: "#d63031"
    })


    levels.push({
      position: 6,
      amount: 3000,
      amountTag: "0.30",

      icon: require("../../images/levels/l6.png"),
      isBought: levelNumber >= 6,
      bgStartColor: "#0984e3",
      bgEndColor: "#06508a"
    })


    levels.push({
      position: 7,
      amount: 3500,
      icon: require("../../images/levels/l7.png"),
      isBought: levelNumber >= 7,
      amountTag: "0.35",

      bgStartColor: "#621e94",
      bgEndColor: "#240b36"
    })


    levels.push({
      position: 8,
      amount: 4000,
      amountTag: "0.40",

      icon: require("../../images/levels/l8.png"),
      isBought: levelNumber >= 8,
      bgStartColor: "#fdcb6e",
      bgEndColor: "#bf8415"
    })


    levels.push({
      position: 9,
      amount: 4500,
      amountTag: "0.45",

      icon: require("../../images/levels/l9.png"),
      isBought: levelNumber >= 9,
      bgStartColor: "#787777",
      bgEndColor: "#a8a8a8"

    })


    levels.push({
      position: 10,
      amountTag: "0.50",

      amount: 5000,
      icon: require("../../images/levels/l10.png"),
      isBought: levelNumber >= 10,
      bgStartColor: "#961516",
      bgEndColor: "#d63031"
    })
var level = null;
    if(levelNumber == 10){
      level = levels[9]
      level.isThisNextLevel = true
    }else{
     level = levels[levelNumber]
    level.isThisNextLevel = true
    }
    


    // this.setState({selectedLevel:level})
    return levels

  }

  


  makeErrorToast(error) {
    toast.error(error, {
      position: "bottom-center",
      autoClose: 7000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });

  }



  renderBuyDialog() {
    return <>

      <Modal isOpen={this.state.visibleBuyModal} >
        <ModalHeader><h3 className="fw-semi-bold" >Buy Level
            {this.state.selectedLevel ? " " + this.state.selectedLevel.position : ""}</h3></ModalHeader>
        <ModalBody>

          <Row>

            <Col>



              <Level


                levelData={this.state.selectedLevel}
                enable={true}
                onLevelClicked={()=>{

                }}
              /></Col>



            <Col>

            <h2>Buy Level {this.state.selectedLevel.position}+ {" "}</h2>
            <hr className="solid" />
            <Row>


              <Col>
              <h4>Buy Level {this.state.selectedLevel.position}+ {" "}</h4>
              <h4>Buy Level {this.state.selectedLevel.position}+ {" "}</h4>

              </Col>

              {/* <Spinner color="secondary" /> */}


              <Col>
              <h4>Buy Level {this.state.selectedLevel.position}+ {" "}</h4>
              <h4>Buy Level {this.state.selectedLevel.position}+ {" "}</h4>

              </Col>
            </Row>

            </Col>




          </Row>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{
             this.buyLevel(this.state.selectedLevel.position,this.state.selectedLevel.amount,(receipt=>{
                console.log("gffgfgg",receipt)
                toast.success("Successfully bought level "+this.state.selectedLevel.position, {
                  position: "bottom-center",
                  autoClose: 7000,
                  hideProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: false
                });

                this.setState({ visibleBuyModal: false })
                window.location.reload();

            }))
          }} >Pay
            {this.state.selectedLevel ? " " + this.state.selectedLevel.amountTag + " ETH" : ""}</Button>{' '}


          <Button color="danger" onClick={() => {
            this.setState({ visibleBuyModal: false })
          }}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </>
  }




  render() {
    return (

      <>

          {this.state.visibleBuyModal ? this.renderBuyDialog() : null}
      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    auth:store.auth
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(TronProvider);

// export default compose(
//   connect(mapStateToProps, null, null, { withRef: true }),
//     Web3Provider
// );
