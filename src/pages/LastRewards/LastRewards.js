import React from 'react';
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from 'reactstrap';
import { Sparklines, SparklinesBars } from 'react-sparklines';

import Widget from '../../components/Widget/Widget';
import s from './LastRewards.module.scss';
import Avatar from '../../components/Avatar/Avatar';

class LastRewards extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstTableData:[],
      tableStyles: [
        {
          id: 1,
          picture: require('../../images/tables/1.png'), // eslint-disable-line global-require
          description: 'Palo Alto',
          info: {
            type: 'JPEG',
            dimensions: '200x150',
          },
          date: new Date('September 14, 2012'),
          size: '45.6 KB',
          progress: {
            percent: 29,
            colorClass: 'success',
          },
        },
        {
          id: 2,
          picture: require('../../images/tables/2.png'), // eslint-disable-line global-require
          description: 'The Sky',
          info: {
            type: 'PSD',
            dimensions: '2400x1455',
          },
          date: new Date('November 14, 2012'),
          size: '15.3 MB',
          progress: {
            percent: 33,
            colorClass: 'warning',
          },
        },
        {
          id: 3,
          picture: require('../../images/tables/3.png'), // eslint-disable-line global-require
          description: 'Down the road',
          label: {
            colorClass: 'primary',
            text: 'INFO!',
          },
          info: {
            type: 'JPEG',
            dimensions: '200x150',
          },
          date: new Date('September 14, 2012'),
          size: '49.0 KB',
          progress: {
            percent: 38,
            colorClass: 'inverse',
          },
        },
        {
          id: 4,
          picture: require('../../images/tables/4.png'), // eslint-disable-line global-require
          description: 'The Edge',
          info: {
            type: 'PNG',
            dimensions: '210x160',
          },
          date: new Date('September 15, 2012'),
          size: '69.1 KB',
          progress: {
            percent: 17,
            colorClass: 'danger',
          },
        },
        {
          id: 5,
          picture: require('../../images/tables/5.png'), // eslint-disable-line global-require
          description: 'Fortress',
          info: {
            type: 'JPEG',
            dimensions: '1452x1320',
          },
          date: new Date('October 1, 2012'),
          size: '2.3 MB',
          progress: {
            percent: 41,
            colorClass: 'primary',
          },
        },
      ],
     
    };

  }



  componentDidMount(){
    this.initTableData()
  }
  parseDate(date) {
    this.dateSet = date.toDateString().split(' ');

    return `${date.toLocaleString('en-us', { month: 'long' })} ${this.dateSet[2]}, ${this.dateSet[3]}`;
  }



  initTableData(){
    var data = [];
    data.push({
      rank:1,
      userId:1,
      name:"Shahzeb",
      avatar: require('../../images/tables/1.png'), // eslint-disable-line global-require
      
      totalDirects:12,
    
    })


    data.push({
      rank:2,
      userId:1,
      name:"Shahzeb",
      avatar: require('../../images/tables/1.png'), // eslint-disable-line global-require
      
      totalDirects:6,
    
    })



    data.push({
      rank:3,
      userId:1,
      name:"Shahzeb",
      avatar: require('../../images/tables/1.png'), // eslint-disable-line global-require
      
      totalDirects:3,
    
    })



    data.push({
      rank:4,
      userId:1,
      name:"Shahzeb",
      avatar: require('../../images/tables/1.png'), // eslint-disable-line global-require
      
      totalDirects:2,
    
    })


    this.setState({firstTableData:this.parseTableData(data)})

  }


  parseTableData(data){
    var colors = ["success","warning","primary","inverse","danger"]
    var colorNumber = 0
    var data1=[]
    var maxReferals = data[0].totalDirects
    for(var item of data){
      var item1 = item;
      item1.percent = item.totalDirects*100/maxReferals;
      item1.totalReward = item.totalDirects*10
      item1.colorClass = colors[colorNumber]
      data1.push(item1);

      if(colorNumber==colors.length){
        colorNumber = -1
      }
      colorNumber = colorNumber+1
    }


    return data1
  }


  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Reward - <span className="fw-semi-bold">Winners</span></h2>
        <Row>
          <Col>
            <Widget
              title={<h5>
                Date <span className="fw-semi-bold">Styles</span>
              </h5>} collapse
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                  <th className="hidden-sm-down">Rank</th>

                    <th className="hidden-sm-down">Id</th>

                    <th>Picture</th>
                    <th className="hidden-sm-down">Name</th>

                    <th>Total Directs</th>
                    <th className="hidden-sm-down">Reward Amount</th>
                    <th className="hidden-sm-down">Total referal</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.firstTableData.map(row =>
                    <tr key={row.userId}>
                      <td><span>{row.rank}</span></td>
                      <td>{row.userId}</td>

                      <td>
                        <Avatar src={row.avatar}  extraStyle={{borderRadius:"50%", 
                        height:50,width:50}}/>
                        {/* <img className="img-rounded" src={row.avatar} alt="" style={{borderRadius:"50%", 
                        height:50,width:50}}/> */}
                      </td>
                        
                      <td className="text-muted">
                      {row.name}
                      </td>
                      <td className="text-muted">
                        {row.totalDirects}
                      </td>
                      <td className="text-muted">
                        {row.totalReward}
                      </td>
                      <td className="width-150">
                        <Progress
                          color={row.colorClass} value={row.percent}
                          className="progress-sm mb-xs"
                        />
                      </td>
                    </tr>,
                  )
                }
                </tbody>
              </Table>
              
            </Widget>
       

            <Widget
              title={<h5>
                Date <span className="fw-semi-bold">Styles</span>
              </h5>} collapse
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                  <th className="hidden-sm-down">Rank</th>

                    <th className="hidden-sm-down">Id</th>

                    <th>Picture</th>
                    <th className="hidden-sm-down">Name</th>

                    <th>Total Directs</th>
                    <th className="hidden-sm-down">Reward Amount</th>
                    <th className="hidden-sm-down">Total referal</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.firstTableData.map(row =>
                    <tr key={row.userId}>
                      <td><span>{row.rank}</span></td>
                      <td>{row.userId}</td>

                      <td>
                        <img className="img-rounded" src={row.avatar} alt="" style={{borderRadius:"50%", 
                        height:50,width:50}}/>
                      </td>
                        
                      <td className="text-muted">
                      {row.name}
                      </td>
                      <td className="text-muted">
                        {row.totalDirects}
                      </td>
                      <td className="text-muted">
                        {row.totalReward}
                      </td>
                      <td className="width-150">
                        <Progress
                          color={row.colorClass} value={row.percent}
                          className="progress-sm mb-xs"
                        />
                      </td>
                    </tr>,
                  )
                }
                </tbody>
              </Table>
              
            </Widget>
       




            <Widget
              title={<h5>
                Date <span className="fw-semi-bold">Styles</span>
              </h5>} collapse
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                  <th className="hidden-sm-down">Rank</th>

                    <th className="hidden-sm-down">Id</th>

                    <th>Picture</th>
                    <th className="hidden-sm-down">Name</th>

                    <th>Total Directs</th>
                    <th className="hidden-sm-down">Reward Amount</th>
                    <th className="hidden-sm-down">Total referal</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.firstTableData.map(row =>
                    <tr key={row.userId}>
                      <td><span>{row.rank}</span></td>
                      <td>{row.userId}</td>

                      <td>
                        <img className="img-rounded" src={row.avatar} alt="" style={{borderRadius:"50%", 
                        height:50,width:50}}/>
                      </td>
                        
                      <td className="text-muted">
                      {row.name}
                      </td>
                      <td className="text-muted">
                        {row.totalDirects}
                      </td>
                      <td className="text-muted">
                        {row.totalReward}
                      </td>
                      <td className="width-150">
                        <Progress
                          color={row.colorClass} value={row.percent}
                          className="progress-sm mb-xs"
                        />
                      </td>
                    </tr>,
                  )
                }
                </tbody>
              </Table>
              
            </Widget>
       
       
       
       
       
       
       
       
          </Col>
        </Row>
          </div>
    );
  }

}

export default LastRewards;
