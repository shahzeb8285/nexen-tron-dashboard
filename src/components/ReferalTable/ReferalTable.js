import React from 'react';

import {
  Row, Col, Table, Badge,
  Modal,
  Spinner,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Progress,
  Label,
  Checkbox,
  Input



} from 'reactstrap';
import Avatar from '../Avatar/Avatar';

import Widget from "../Widget/Widget";
import { apiService } from '../../Services/api.service';
import defaultAvatar from "../../images/avatar.png";
import "./ReferalTable.scss"
const levelPrice = [
  200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100
]
class ReferalTable extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      levelData: null,
      selectedLevel: null,
      levelExpandData: [],
      isDataLoading: false,
      currentExpandUiItems: [],
      isMyRefFilterChecked:false,
    }
  }


  componentDidMount() {
    var levelArray = this.props.data
    var levelData = [
      { level: 1, referals: levelArray[0] },
      { level: 2, referals: levelArray[1] },
      { level: 3, referals: levelArray[2] },
      { level: 4, referals: levelArray[3] },
      { level: 5, referals: levelArray[4] },
      { level: 6, referals: levelArray[5] },
      { level: 7, referals: levelArray[6] },
      { level: 8, referals: levelArray[7] },
      { level: 9, referals: levelArray[8] },
      { level: 10, referals: levelArray[9] },
    ]




    this.setState({ levelData })
  }



  getMaxReferals(levelNumber) {
    return Math.pow(4, levelNumber)
  }


  getBadge(referalNumber, levelNumber) {
    var totalReferals = this.getMaxReferals(levelNumber);

    if (referalNumber == totalReferals) {
      return <Badge style={{background:"#ed0bd7",width:"100%"}} className="text-secondary" pill>Completed</Badge>
    } else if (referalNumber == 0) {
      return <Badge  style={{width:"100%"}}  color="gray" className="text-secondary" pill>Not Started</Badge>
    } else if (referalNumber < totalReferals) {
      return <Badge  style={{width:"100%"}} color="primary" className="text-secondary" pill>Going On</Badge>
    }
  }


  calculateLevelBonus(levels) {
    console.log("levewl", level)
    var total = 0
    for (var level of levels) {
      var levelBonus = 0;
      for (var j = 0; j < level.levelNumber; j++) {
        levelBonus = levelBonus + (parseInt(levelPrice[j]) * 8 / 100)
      }
      total = total + levelBonus
    }

    return total
  }

  async fetchLevelData(levelNumber) {
    var totalBonus = 0
    var resp = await apiService.getUserTree(parseInt(this.props.myId),
      parseInt(levelNumber))
    if (resp.status == 200) {
      var data = resp.data;
      var levelExpandData = this.state.levelExpandData;
      for (var i = 0; i < data.tree.length; i++) {
        var user = data.tree[i];
        var bonus = 0;
        for (var j = 0; j < user.levelNumber; j++) {
          bonus = bonus + (parseInt(levelPrice[j]) * 8 / 100)
          totalBonus = bonus + parseInt(totalBonus)
        }
        console.log("totalBonus", totalBonus)

        data.tree[i].totalLevelBonus = bonus
      }
      levelExpandData[levelNumber - 1] = data.tree;
      this.setState({ levelExpandData, currentExpandUiItems: data.tree, totalBonus })
      console.log("refereadata", JSON.stringify(data.tree))

    } else {

    }


    this.setState({ isDataLoading: false })
  }

  onLevelClicked(level) {
    var isDataLoading = false
    var currentExpandUiItems = []
    if (!this.state.levelExpandData[level.level - 1]) {
      isDataLoading = true
      this.fetchLevelData(level.level)
    } else {
      currentExpandUiItems = this.state.levelExpandData[level.level - 1]
    }
    this.setState({ selectedLevel: level.level, isDataLoading, currentExpandUiItems })
  }


  renderTableData() {

    return <>


      <span>Filter By</span>

      <Col>
        <Input type="checkbox" onChange={()=>{
          var isPrevChecked = this.state.isMyRefFilterChecked
         
          if(isPrevChecked){

            this.setState({isMyRefFilterChecked:!isPrevChecked})

          }else{
            var filteredData = [];

            for(var data of this.state.currentExpandUiItems){
              if(data.rootReferrer == this.props.myId){
                filteredData.push(data)

              }
            }
            this.setState({isMyRefFilterChecked:!isPrevChecked,filteredData})

          }
        }} />{' '}
          Filter My Referrals
      </Col>



      <Table striped>
        <thead>
          <tr className="fs-sm">
            <th className="hidden-sm-down">Id</th>
            <th>Image</th>
            <th className="hidden-sm-down">Name</th>
            <th className="hidden-sm-down">Level Badge</th>

            <th className="hidden-sm-down">Level</th>
            <th className="hidden-sm-down">Is Direct Referral</th>
            <th className="hidden-sm-down">Total Level Bonus</th>
            <th className="hidden-sm-down">View Dashboard</th>

            {/* <th className="hidden-sm-down">Reward Amount</th>
          <th className="hidden-sm-down">Total referal</th> */}
          </tr>
        </thead>
        <tbody>
          {this.state.isMyRefFilterChecked? this.state.filteredData.map(row =>
              <tr key={row.userId}>
                <td>{row.userId}</td>
                <td>
                  <Avatar src={row.profile_pic ? row.profile_pic : defaultAvatar} extraStyle={{
                    borderRadius: "50%",
                    height: 50, width: 50
                  }} />

                </td>
                <td>{row.name ? row.name : "-"}</td>

                <td>
                  {!row.levelNumber || row.levelNumber == 0 ? "-" :
                    <img src={require("../../images/level_badges/" + row.levelNumber + ".png")} style={{
                      height: 50,
                      // width: 50
                    }} />}

                </td>
                <td>{row.levelNumber ? row.levelNumber : 0}</td>
                <td>{row.rootReferrer == this.props.myId ? "Yes" : "No"}</td>
                <td>{row.totalLevelBonus}</td>
                <td> <Button
                  color="primary"
                  onClick={() => {
                    var win = window.open("https://dash.nexen.live/"+row.userId, '_blank');
                    win.focus();
                  }}
                >
                  View
            </Button></td>



              </tr>
            )
        :
            this.state.currentExpandUiItems.map(row =>
              <tr key={row.userId}>
                <td>{row.userId}</td>
                <td>
                  <Avatar src={row.profile_pic ? row.profile_pic : defaultAvatar} extraStyle={{
                    borderRadius: "50%",
                    height: 50, width: 50
                  }} />

                </td>
                <td>{row.name ? row.name : "-"}</td>

                <td>
                  {!row.levelNumber || row.levelNumber == 0 ? "-" :
                    <img src={require("../../images/level_badges/" + row.levelNumber + ".png")} style={{
                      height: 50,
                      // width: 50
                    }} />}

                </td>
                <td>{row.levelNumber ? row.levelNumber : 0}</td>
                <td>{row.rootReferrer == this.props.myId ? "Yes" : "No"}</td>
                <td>{row.totalLevelBonus}</td>
                <td> <Button
                  color="primary"
                  onClick={() => {
                    var win = window.open("https://dash.nexen.live/"+row.userId, '_blank');
                    win.focus();
                  }}
                >
                  View
            </Button></td>



              </tr>
            )
          }
        </tbody>
      </Table>


    </>

  }

  renderLevelExpandModal() {
    return (
      <>
        <Modal isOpen={this.state.selectedLevel != null} size="xl">
          <ModalHeader>
            <span className='fw-semi-bold'>{this.state.selectedLevel} Level Referrals Details</span>

          </ModalHeader>
          <ModalBody>
            {this.state.isDataLoading ?
              <Row><Spinner color="secondary" />
                <span className='fw-semi-bold'
                  style={{ marginLeft: 5 }}>Loading Data...</span>
              </Row>
              : this.renderTableData()}




          </ModalBody>
          <ModalFooter>

            <Row style={{
              alignItems: "flex-start",
              width: "100%", justifyContent: "flex-start"
            }}>
              <h5> * TOTAL LEVEL BONUS is calculated from the 8% of each level bonus</h5>
              <h5> | <strong>Total {this.calculateLevelBonus(this.state.currentExpandUiItems)} TRX</strong></h5>

            </Row>
            <Button
              color="danger"
              onClick={() => {
                this.setState({ selectedLevel: null, currentExpandUiItems: [],
                  isMyRefFilterChecked:false,filteredData:[] });
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }


  renderTableItems() {
    var items = this.state.levelData.map((level) => {
      return (
        <tr key={level.level} onClick={() => {
          this.onLevelClicked(level)
        }}>
          <td className='fw-semi-bold'>{level.level}</td>
          <td className='fw-semi-bold'>{level.referals}</td>
          <td>{this.getMaxReferals(level.level)}</td>
          <td className='fw-semi-bold'>{this.getMaxReferals(level.level) - level.referals}</td>
          <td>{this.getBadge(level.referals, level.level)}</td>
        </tr>
      )
    })

    return items

  }
  render() {
    return (
      <>
        {this.renderLevelExpandModal()}
        <Widget
          title={<h3 style={{textAlign:"center"}}> <span className='fw-semi-bold' style={{textAlign:"center"}}>LEVEL DETAILS</span></h3>}
        >
          {this.state.levelData ? <Table>
            <thead>
              <tr>
                <th>Level Number</th>
                <th>Your Referrals</th>
                <th>Max Referrals</th>
                <th>Difference</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>



              {this.renderTableItems()}

            </tbody>
          </Table>

            : null}
        </Widget>

      </>

    );
  }

}

export default ReferalTable;
