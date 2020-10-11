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
import './Ledger.scss';
import Widget from '../../components/Widget/Widget';
import defaultAvatar from "../../images/avatar.png"
import Avatar from '../../components/Avatar/Avatar';
import { toast } from "react-toastify";
import { apiService } from '../../Services/api.service';
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { updateProfile } from "../../actions/profileActions";
import Resizer from 'react-image-file-resizer';

class Ledger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPageLoaded: false
    }

  }


  componentDidMount() {
    // this.setState({ islogin: !true })
  }

  // fileChangedHandler = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   let name = file.name;
  //   this.setState({ image: name });

  // }




  componentWillReceiveProps(props) {
    console.log("123qwer",props);

    if(props.user && props.user.walletAddress){
      this.setState({walletAddress: props.user.walletAddress,isPageLoaded:true})
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
      <Container className="mt--7" fluid>
        {this.state.isPageLoaded ? <Widget
          title={<h3>Ledger Account</h3>}>

          <iframe
            src={"https://tronscan.org/#/address/"+this.state.walletAddress+"/transactions"}
            style={
              {
                width: "100%",
                height: "100vh"
              }
            }>
          </iframe>
        </Widget>
          : this.renderPageLoadingDialoge()}
      </Container>
    )
  }
}


function mapStateToProps(store) {
  return {
    user: store.Web3Reducer.user,
    // profile: store.ProfileReducer.profile,

  };
}

export default withRouter(connect(mapStateToProps)(Ledger));
