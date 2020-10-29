import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./style.css";
import moment from "moment"
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
import defaultAvatar from "../../images/avatar.png"
import htmlToImage from 'html-to-image';

class WinnerCard extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            reward: null
        }
        this.winnerPhoto = React.createRef()

    }





    componentWillReceiveProps(props) {
        console.log("winnerProps", props.profile);

        if (props.profile && props.profile.rewards && props.profile.rewards.length > 0) {
            var reward = props.profile.rewards[0];

            this.setState({ reward })

        }


    }




    static propTypes = {
        size: PropTypes.number.isRequired
    };

    static defaultProps = {
        size: 21
    };

    render() {
        return (
            <>
                {this.state.reward ? <>
                    <Button color="primary"
                            onClick={() => {
                                htmlToImage.toPng(this.winnerPhoto.current, { quality: 0.95 })
                                    .then(function (dataUrl) {
                                        var link = document.createElement('a');
                                        link.download = 'winner.png';
                                        link.href = dataUrl;
                                        link.click();
                                    });
                            }}
                            style={{ alignSelf: "center", }
                            }>Download Image</Button>

                    <div className="main-body"  ref={this.winnerPhoto}>
                    <div className="logo-container ">
                                <img className="logo"
                                    src={require("../../images/WinnerCard/logo.png")} />
                            </div>
                            <h3 style={{ color: "#fff", fontSize: 50 }}> REWARD
            </h3>
                            <h3
                                style={{ color: "#fff", fontSize: 45 }}>WINNER</h3>
                            <div className="image-container">
                                <div
                                    style={{ marginBottom: -10 }} className="image-head-outer">
                                    <div className="image-head-inner">
                                        <img className="avatar" src={this.props.profile.profile_pic ?
                                            this.props.profile.profile_pic : defaultAvatar} />
                                    </div>
                                </div>
                                <div style={{ zIndex: -1 }} className="image-bottom">
                                    <img style={{ zIndex: -1 }} 
                                    className="crown-image" 
                                    src={require("../../images/WinnerCard/crown4.png")} />
                                </div>
                            </div>
                            <div style={{ marginTop: 18 }} className="detail-container">
                                {this.props.profile.name ? <h2
                                    id="user-name">{this.props.profile.name}</h2> : <h2
                                        id="user-name">Name</h2>}
                                <h2 id="user-id">ID-{this.props.profile.userId}</h2>
                                <h2 id="trx">WON - {this.state.reward.rewardAmount} TRX</h2>
                                <h2 id="user-winning-date">{moment(this.state.reward.created_at).format("DD-MMM-YYYY")}</h2>

                                <h2 id="trx-from">TODAY'S DIRECT - {this.state.reward.totalReferreral}</h2>
                                {this.props.profile.phone ? <h2 id="user-phone">{this.props.profile.phone}</h2>
                                    : null}
                                <p>Hello, I Won This Award From NEXEN Competition.
                                You Can Also Win The Same.
For More Information Call Me Now.</p>

                            </div>
                            <div>
                                <a
                                    style={{ fontSize: 18, color: "#fff" }}
                                    href="https://www.nexen.live">www.nexen.live</a>
                            </div>


                    </div>


                </> : null}


            </>

        );
    }
}

// export default WinnerCard;

function mapStateToProps(store) {
    return {

        profile: store.ProfileReducer.profile,
    };
}

export default withRouter(connect(mapStateToProps)(WinnerCard));
