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


export default class Profile extends Component{
    constructor(){
        super();
        
        this.state={
           id:1,
           name:"Binod",
           islogin:true,
           image:"../../images/people/a1.jpg",
           
        }
        
    
      }
     
      fileChangedHandler = (event) => {
        const file = event.target.files[0];
        console.log(file);
        let name=file.name;
        this.setState({image:name})
      }
      update(){

        // document.querySelectorAll('.update').forEach(a=>{
        //   a.remove();
        //   console.log("hello");
        // })
       }
    render(){
        return (
            <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../images/people/a1.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="change-pic">

                    {/* <Input type="file" className="float-right"
                      color="default"
                    size="sm"/> */}
                      {/* <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            /> */}
            <input type="file" onChange={this.fileChangedHandler} placeholder="change pic"></input>
                    
                    {/* <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      change pic
                    </Button> */}
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                 
                  <div className="update">
                  <Row>
                       <Col lg="4"></Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="lucky.jesse"
                              id="input-username"
                              placeholder="Username"
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
                              placeholder="jesse@example.com"
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
                              Contact Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-number"
                              placeholder="1234567"
                              type="tel"
                              readOnly={this.state.islogin}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4"></Col>
                      </Row>
                  </div>
                  
                  <Row>
                  <Col lg="4"></Col>
                  <Col lg="4">
                  <Button
                      className="mr-4"
                      color="info"
                      
                      onClick={this.update()}
                     
                      size="sm"
                    >
                      Update
                    </Button>
                  </Col>
                  <Col lg="4"></Col>
                  
                  </Row>
                 
                 
                 
                  
                 
                  
                </CardBody>
              </Card>
            </Col>
            </Row>
        </Container>
        )
    }
}