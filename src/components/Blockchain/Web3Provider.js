
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Badge, Col, Row, Table, Button, Modal,Spinner,
  ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MLM from "../../contracts/MLM.json";
import Web3 from "web3";
import { incomeFetched, userFetched, onLevelUpdated } from "../../actions/web3Actions";
import { toast } from 'react-toastify';
import { compose } from 'redux';
import  Level from '../../pages/dashboard/components/Level/Level'

class Web3Provider extends React.Component {


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
    let userId =this.props.auth.userId
    // this.setState({userId:parseInt(this.props.auth.userId)})
    await this.loadWeb3();
    await this.loadBlockchainData();

    if (!this.state.InitError) {
      await this.initUsersFunds(userId);
      await this.initUser(userId)
    }

  }




  showBuyLevelDialog(level){
    this.setState({visibleBuyModal:true,selectedLevel:level})
   


  }


  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert(
      //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
      // );

      this.makeErrorToast("Non-Ethereum browser detected. You should consider trying MetaMask!"
      )
      this.setState({ InitError: true })
    }
  }


  async loadBlockchainData() {

    try {

      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];
      const networkId = await web3.eth.net.getId();
      const networkData = MLM.networks[networkId];
      if (networkData) {
        const mlm = new web3.eth.Contract(MLM.abi, networkData.address);
        const contractAddress = networkData.address;
        // this.data.totalUsers = web3.utils.toBN(await mlm.methods.getTotalUsers().call()).toString();
        // this.data.rewardWallet = web3.utils.fromWei(web3.utils.toBN(await mlm.methods.getRewardWallet().call()), "ether");
        // this.data.totalAmountWithdrawn = web3.utils.fromWei(web3.utils.toBN(await mlm.methods.getTotalAmountWithdrawn().call()), "ether");

        this.setState({ mlm, contractAddress, walletAddress });
        // this.setState({
        //     contractAddress: networkData.address,
        //     totalUsers: web3.utils.toBN(await mlm.methods.getTotalUsers().call()).toString(),
        //     rewardWallet: web3.utils.fromWei(web3.utils.toBN(await mlm.methods.getRewardWallet().call()), "ether"),
        //     totalAmountWithdrawn: web3.utils.fromWei(web3.utils.toBN(await mlm.methods.getTotalAmountWithdrawn().call()), "ether"),
        // });

      } else {
        // window.alert(
        //   "MLM contract not deployed to detected network."
        // );

        this.setState({InitError:true})
        this.makeErrorToast("MLM contract not deployed to detected network.")
      }
    }
    catch (e) {
      console.log(e);
      console.log("you have an error");
    }
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

  async  initUser(referalId) {
    console.log("initUser")
    if (!this.state.mlm) {
      return
    }

    console.log("initUser", "Gggg")

    const web3 = window.web3;
    const mlm = this.state.mlm;
    console.log("mlmmmm", mlm)
    mlm.methods.getUserInfo(referalId).call().then((User) => {

      mlm.methods.getUsersIncomes(referalId).call().then((income) => {
        var user = {}

        // address inviter,
        // uint256 totalReferals,
        // uint256 totalRecycles,
        // uint256 totalWins,
        // uint256 levelsPurchased,
        // uint256 loss
        user = {
          inviter: User[0],
          totalReferrals: User[1],
          totalRecycles: User[2],
          totalWins: User[3],
          levelsPurchased: User[4],
          loss: User[5],

          walletAddress: this.state.walletAddress,
          contractAddress: this.state.contractAddress
        }

        var di = income.directIncome;
        var ri = income.recycleIncome;
        var li = income.levelIncome;
        var rewi = income.rewardIncome;

        console.log("rewardIncome")
        var income = {

          directIncome: web3.utils.fromWei(di.toString(), "ether"),
          recycleIncome: web3.utils.fromWei(ri.toString(), "ether"),
          levelIncome: web3.utils.fromWei(li.toString(), "ether"),
          rewardIncome: web3.utils.fromWei(rewi.toString(), "ether")
        };


        // var fund = {
        //   recycleFund: web3.utils.fromWei(rf.toString(), "ether"),
        //   levelFund: web3.utils.fromWei(lf.toString(),"ether")
        // }
        user.income = income;
        user.funds = this.state.funds;

        user.levels = this.getLevels(user.levelsPurchased)
        console.log("=======================", user)
        this.setState({ user })
        this.props.dispatch(userFetched(user));


      })
        .catch(function (err) {
          console.error("problem getting user", err);
        });

    })
      .catch(function (err) {
        console.error("problem getting user", err);
      });


  }



  async initUsersFunds(referalId) {
    
    const web3 = window.web3;
    const mlm = this.state.mlm;
    if(!mlm){
      return
    }
    mlm.methods.getUsersFunds(referalId).call().then((user) => {
      var rf = user.recycleFund;
      var lf = user.levelFund;
      var funds = {
        recycleFund: web3.utils.fromWei(rf.toString(), "ether"),
        levelFund: web3.utils.fromWei(lf.toString(), "ether")
      };

      this.setState({ funds })
      // callback(false,income);
    })
      .catch(function (err) {
        console.error("problem getting user", err);
        // callback(true,err);
      });
  }


  async register(id, price, callback) {
    // this.setState({ loading: true });
    this.data.mlm.methods.register(id).send({ from: this.data.account, value: price })
      .once('receipt', (receipt) => {
        callback(receipt)
        // this.setState({ loading: false })
      })
  }

  //Buy level
  buyLevel = (level, price, callback) => {
    // this.setState({ loading: true });


    console.log("BUYLEVEL",level,"pricwe",price)
    this.state.mlm.methods.buyLevel(level)
      .send({ from: this.state.user.walletAddress, value: price })
      .once('receipt', (receipt) => {
        // this.setState({ loading: false })
        callback(receipt)

      }).catch(error => {
        console.log("errrrrrror", error)

        this.makeErrorToast("Error Buying Level!")
      })
  }

  //auto buylevel
  async autoBuyLevel(callback) {
    // this.setState({ loading: true });
    this.data.mlm.methods.autoBuyLevel().send({ from: this.data.account })
      .once('receipt', (receipt) => {
        // this.setState({ loading: false })
        callback(receipt)
      })
  }

  //withdraw autobuy level wallet
  async withDrawAutobuyWalletAmount(callback) {
    // this.setState({ loading: true });
    this.data.mlm.methods.withDrawAutobuyWalletAmount().send({ from: this.data.account })
      .once('receipt', (receipt) => {
        // this.setState({ loading: false })
        callback(receipt)

      })
  }

  //distribute rewards
  async giveRewards(callback) {
    // this.setState({ loading: true });
    this.data.mlm.methods.giveRewards().send({ from: this.data.account })
      .once('receipt', (receipt) => {
        // this.setState({ loading: false })
        callback(receipt)

      })
  }

  //retopup or recycle id
  async recycle(id1, id2, id3, callback) {
    // this.setState({ loading: true });
    this.data.mlm.methods.recycle(id1, id2, id3).send({ from: this.data.account })
      .once('receipt', (receipt) => {
        // this.setState({ loading: false })
        callback(receipt)

      })
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

export default connect(mapStateToProps, null, null, { withRef: true })(Web3Provider);

// export default compose(
//   connect(mapStateToProps, null, null, { withRef: true }),
//     Web3Provider
// );
