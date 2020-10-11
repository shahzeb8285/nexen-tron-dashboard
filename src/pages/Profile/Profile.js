import React, { Component } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import { Spinner } from 'reactstrap';
import { backgroundColor } from 'echarts/lib/theme/dark';
import './Profile.scss';
import Widget from '../../components/Widget/Widget';
import defaultAvatar from "../../images/avatar.png"
import Avatar from '../../components/Avatar/Avatar';
import { toast } from "react-toastify";
import { apiService } from '../../Services/api.service';
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { updateProfile } from "../../actions/profileActions";
import Resizer from 'react-image-file-resizer';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      name: "",
      email: "",
      islogin: true,
      defaultImage: require("../../images/avatar.png"),
      isLoading: false,
      avatarChanged: false
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

  async handleOnSubmitClick() {

    console.log("user", this.state.username);
    console.log("email", this.state.email);
    var isError = false;
    // if (!this.state.username) {
    //   isError = true;
    //   toast.error("Please Enter UserName!");
    // }

    // if (!this.state.email) {
    //   isError = true;
    //   toast.error("Please Enter Email!");
    // }


    if (!this.props.user.id) {
      toast.error("Please Wait,User loading");
      return
    }
    console.log("FDFD", this.props.user)

    if (!isError) {
      this.setState({ isLoading: true })
      var payload = {
        id: this.props.user.id,
        name: this.state.username,
      }

      if (this.state.email) {
        payload.email = this.state.email
      }

      if (this.state.username) {
        payload.name = this.state.username
      }

      if (this.state.phone) {
        payload.phone = this.state.phone
      }

      if (this.state.avatarChanged) {
        payload.profile_pic = this.state.avatar
      }


      try {
        var resp = await apiService.updateUser(payload)

        if (resp.status == 200) {
          toast.success("Profile Updated Successfully ");
          var user = resp.data;

          console.log("Resssssss", resp)
          this.props.dispatch(updateProfile(user));


        } else {
          toast.error("Error in updating profile");

        }

        this.setState({ isLoading: false })
      } catch (err) {
        toast.error("Error in updating profile");
        console.log("errrrr", err)
        this.setState({ isLoading: false })

      }

    }



  }




  componentWillReceiveProps(props) {
    console.log("fvgfggf", props)
    if (props.profile) {

      if (props.profile.name) {
        this.setState({ username: this.props.profile.name })
      }

      if (props.profile.email) {
        this.setState({ email: this.props.profile.email })
      }


      if (props.profile.profile_pic) {
        this.setState({ avatar: this.props.profile.profile_pic })
      }
    }
  }



  fileChangedHandler = async (event) => {
    console.log(event.target.files)
    const file = event.target.files[0];
    console.log(file);
    // let name = file.name;
    // const base64 = await this.convertBase64(file);

    Resizer.imageFileResizer(
      file,
      100,
      100,
      'JPEG',
      10,
      0,
      base64 => {
        console.log("bas1232", base64)
        this.setState({ avatar: base64, avatarChanged: true })

      },
      'base64',
      200,
      200,
    );

  }

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    })
  }

  render() {
    return (
      <Container className="mt--7" fluid>
        <Widget
          title={<h3>Edit Your Profile</h3>}>


          <div className="update">
            <Row>


              <Col lg="4">

                <Col>              <Avatar src={this.state.avatar} />
                </Col>               <Col>
                  <input type="file" onChange={this.fileChangedHandler} placeholder="change pic" />
                </Col>

                <Col>
                  <FormGroup>


                    <input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder="Your Name"
                      style={{   
                        marginTop:10,
                        padding:10,
                        borderWidth:3,
                        borderColor:"#2198c1",
                        color:"#fff",
                        width:"100%",
                        background: "radial-gradient(farthest-side ellipse at 10% 0, #000 20%, #232323)"}}
                     
                      type="text"
                      value={this.state.username}
                      onChange={(text) => {
                        this.setState({ username: text.target.value })
                      }}
                    />


                    <input
                      className="form-control-alternative"
                      id="input-email"
                      style={{   
                        width:"100%",

                        padding:10,
                        borderWidth:3,
                        marginTop:10,

                        borderColor:"#402493",
                        color:"#fff",
                        background: "radial-gradient(farthest-side ellipse at 10% 0, #000 20%, #232323)"}}
                      placeholder="Enter Your Email"
                      type="email"
                      value={this.state.email}

                      onChange={(text) => {
                        this.setState({ email: text.target.value })
                      }}
                    />

                    <input
                      className="form-control-alternative"
                      id="input-phone"
                      
                      placeholder="Enter Your Phone With Country Code"
                      type="phone"
                      value={this.state.phone}
                      style={{   
                        width:"100%",

                        padding:10,
                        borderWidth:3,
                        marginTop:10,
                        borderColor:"#b01ec6",
                        color:"#fff",
                        background: "radial-gradient(farthest-side ellipse at 10% 0, #000 20%, #232323)"}}
                     
                      onChange={(text) => {
                        this.setState({ phone: text.target.value })
                      }}
                    />



                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                      Details are required only for your  Marketing and Promotional Activities only.. (OPTIONAL)
                      </div>

                    <Button
                      color="primary"
                      onClick={() => {
                        this.handleOnSubmitClick()
                      }}

                      size="sm"
                    >
                      {this.state.isLoading ? <Spinner color="secondary" />
                        : null}
                      <span className="fw-semi-bold" style={{fontSize:20}}> Update Profile</span>
                    </Button>

                  </FormGroup>

                </Col>
              </Col>


            </Row>
          </div>






        </Widget>
      </Container>
    )
  }
}


function mapStateToProps(store) {
  return {
    user: store.Web3Reducer.user,
    profile: store.ProfileReducer.profile,

  };
}

export default withRouter(connect(mapStateToProps)(Profile));
