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
import { backgroundColor } from 'echarts/lib/theme/dark';
import './Profile.scss';
import Widget from '../../components/Widget/Widget';


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      name: "Binod",
      islogin: true,
      image: "../../images/people/a1.jpg",

    }


  }


  componentDidMount(){
    this.setState({islogin:!true})
  }

  fileChangedHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);
    let name = file.name;
    this.setState({ image: name })
  }
  update() {

    // document.querySelectorAll('.update').forEach(a=>{
    //   a.remove();
    //   console.log("hello");
    // })
  }
  render() {
    return (
      <Container className="mt--7" fluid>
        <Widget
        title={<h3>Edit Your Profile</h3>}>


          <div className="update">
            <Row>
            

              <Col lg="4">
              <img src="https://adminlte.io/themes/AdminLTE/dist/img/user3-128x128.jpg"
                  style={{ borderRadius: "50%", border: "5px solid white",marginBottom:5 }}
                />
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Username
                           </label>
                  <Input
                    className="form-control-alternative"
                    id="input-username"
                    placeholder="Your Name"
                    type="text"
                    readOnly={this.state.islogin}
                  />
                </FormGroup>
              </Col>
              <Col lg="4"></Col>

              <Col lg="4"></Col>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Email address
                           </label>
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    placeholder="Enter Your Email"
                    type="email"
                    readOnly={this.state.islogin}
                  />
                </FormGroup>
              </Col>
              <Col lg="4"></Col>
              <Col lg="4"></Col>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Phone Number
                           </label>
                  <Input
                    className="form-control-alternative"
                    id="input-number"
                    placeholder="Your Phone Number"
                    type="tel"
                    readOnly={this.state.islogin}
                  />
                </FormGroup>
                <Button
                  color="success"

                  onClick={this.update()}

                  size="sm"
                >
                  Update Profile
                   </Button>

              </Col>
              <Col lg="4"></Col>


            </Row>
          </div>






        </Widget>
      </Container>
    )
  }
}