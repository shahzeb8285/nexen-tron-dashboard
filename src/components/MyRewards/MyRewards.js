import React from 'react';
import {
  Row,
  Col,
  Table,
 
} from 'reactstrap';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router";
import Widget from '../Widget/Widget';
import s from './MyRewards.module.scss';
import moment from "moment";

class MyRewards extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rewards: [],

    };

  }



  componentDidMount() {
    // this.initTableData()
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(' ');

    return `${date.toLocaleString('en-us', { month: 'long' })} ${this.dateSet[2]}, ${this.dateSet[3]}`;
  }


  componentWillReceiveProps(props) {
    if (props.profile && props.profile.rewards) {
      this.initTableData(props.profile.rewards)
    }
  }

  initTableData(data) {
   
    this.setState({ rewards: this.parseTableData(data) })

  }


  parseTableData(data) {

    var data1 = []
    for (var item of data) {
      var item1 = item;
      item1.date = item.created_at
      item1.rewardAmount = item.rewardAmount
      item1.totalReferreral = item.totalReferreral

      data1.push(item1);


    }


    return data1
  }


  getDate(date){
    // DD/MMMM/YYYY
    return moment(date).format("DD-MMM-YYYY")
  }

  render() {
    return (
      <Widget
          title={<h3  style={{textAlign:"center"}}>
            MY <span className="fw-semi-bold">REWARDS HISTORY</span>
          </h3>}
          bodyClass={s.mainTableWidget}
        >
          <Table striped>
            <thead>
              <tr className="fs-sm">
                <th className="hidden-sm-down">Date</th>

                <th className="hidden-sm-down">Total Directs</th>

                <th className="hidden-sm-down">Reward Amount</th>


              </tr>
            </thead>

            {this.state.rewards.length == 0 ? <h4>No Rewards</h4> :
              <tbody>
                {
                  this.state.rewards.map(row =>
                    <tr key={row.created_at}>
                      <td><span>{this.getDate(row.created_at)}</span></td>
                      <td>{row.totalReferreral}</td>

                      <td><strong>{row.rewardAmount}</strong></td>


                    </tr>
                  )
                }
              </tbody>}

          </Table>

        </Widget>

 
    );
  }

}

function mapStateToProps(store) {
  return {
    profile: store.ProfileReducer.profile,

  };
}

export default withRouter(connect(mapStateToProps)(MyRewards));
