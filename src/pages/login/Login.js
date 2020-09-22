import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, Label, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import Widget from '../../components/Widget';

class Login extends React.Component {




    constructor(props) {
        super(props);

        this.state = {

        };


    }




    goTodashboard() {
        this.props.history.push('/register');
    }

    render() {

        // cant access login page while logged in


        return (
            <div className="auth-page">
                <Container>
                    <Widget className="widget-auth mx-auto"
                        title={<h3 className="mt-0">Login to Nexen Dashboard</h3>}>

                        <form onSubmit={this.doLogin}>

                            <FormGroup>
                                <InputGroup className="">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-user text-white" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="userId" className="input-transparent pl-3"
                                        value={this.state.userId} onChange={(e) => {
                                            this.setState({ userId: e.target.value });

                                        }}
                                        type="number"
                                        required name="userId" placeholder="Enter ID" />
                                </InputGroup>
                            </FormGroup>


                            <div className="auth-widget-footer" style={{ paddingBottom: 20 }}>
                                <Button onClick={() => {
                                    this.props.history.push('/'+this.state.userId);
                                }} color="primary" className="auth-btn"
                                    size="sm" style={{ color: '#fff' }}>
                                    Go To Dashboard
                                </Button>

                            </div>
                        </form>
                    </Widget>
                </Container>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Login));

