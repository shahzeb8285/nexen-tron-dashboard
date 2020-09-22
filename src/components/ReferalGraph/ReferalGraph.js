import React from 'react';

import {
  Row, Col
} from 'reactstrap';

import ApexChart from 'react-apexcharts';


import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/themeRiver';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import Widget from "../Widget/Widget";

import config from './config';
const colors = config.chartColors;

let columnColors = [colors.blue, colors.green, colors.orange, colors.red, colors.default, colors.gray, colors.teal, colors.pink];


class ReferalGraph extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      chartData: null,
  
    }
  }
 

  componentDidMount() {
    const chartData = {
      series: [{
        data: [21, 22, 10, 28, 16, 21, 13, 30,31,12]
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar'
        },
        colors: columnColors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ['Level1', 'Level2', 'Level3', 'Level4', 'Level5', 
          'Level6', 'Level7', 'Level8','Level9',"Level10"],
          labels: {
            style: {
              colors: columnColors,
              fontSize: '14px'
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            // show: false
          }
        },
        yaxis: {
          labels: {
            style: {
              color: colors.red,
            }
          }
        },
        tooltip: {
          theme: 'dark'
        },
        grid: {
          borderColor: colors.gridLineColor
        }
      }
    };


    this.setState({chartData:chartData})
    
  }

  render() {
    return (
              <Widget
                title={<h3>Referrer <span className='fw-semi-bold'>Graph</span></h3>}
              >
             {this.state.chartData?   <ApexChart 
                  className="sparkline-chart" 
                  height={350} 
                  series={this.state.chartData.series}
                  options={this.state.chartData.options}
                  type={"bar"}
                />:null}
         
         </Widget>
    
    );
  }

}

export default ReferalGraph;
