import React from 'react';
import PropTypes from 'prop-types';
import "./SleepStats.css";
import {listSleepTime, createSleepTime} from 'api/sleep.js';
import {Alert, Container,  Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Button,Table} from 'reactstrap';
import {listPhoneTime, createPhoneTime} from 'api/phone.js'
import { Chart } from 'react-google-charts';
import moment from 'moment';
export default class SleepStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: '睡眠時間紀錄',
        hAxis: { title: '入睡時間', minValue: 0, maxValue: 15 },
        vAxis: { title: '睡眠長度(hr)', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      // options: {
      //   title: 'Sleep Time record',
      //   hAxis: { title: 'Time to sleep', minValue: 0, maxValue: 15 },
      //   vAxis: { title: 'Duration', minValue: 0, maxValue: 15 },
      //   legend: 'none',
      // },
      data: {
        //['Age', 'Weight'],
        // [8, 12],
        // [4, 5.5],
        // [11, 14],
        // [4, 5],
        // [3, 3.5],
        // [6.5, 7],
      }
    };

    // this.listSleepTime = this.listSleepTime.bind(this);
  }

  componentDidMount() {
    this.listSleepTime();
  }
  listSleepTime(){
      listSleepTime().then(data => {

                this.setState({
                    data
                });
            }).catch(err => {
                console.error('Error listing sleepTime', err);

                this.setState({
                    data: {}
                });
            });
  }

  render() {
      var longest = 0;
      var shortest = 0;
      var sum = 0;
      var dur;
      const data = this.state.data;
      var array = [['Time to sleep', 'Duration', { role: 'style' }]];
      for(var i = 0;i < 7;i ++){
          var tmp;
          
          var color;



          if(data[i] === undefined) tmp = ['No data', 0 , 'red'];
          else{
              dur = parseInt(data[i].diff)/60;
              if(dur < 6)color = "#FF3333";
              else if(dur < 8)color = "#FFDC35";
              else color = "#00AA00";

              tmp = [data[i].date.slice(5,10)+' '+data[i].date.slice(11,16), dur, color] ;

               //longest calculation
               if(dur > longest) longest = dur;
               //shortest calculation
               if(shortest === 0) {
                  shortest = dur;
               }else if(dur < shortest) shortest = dur;
               //avg. calculation

               sum = sum + dur;



          }
          array.push(tmp);
      }

      var tableStyle = {
        width: '50%',
        margin: 'auto',
        backgroundColor: 'rgba(255, 203, 0, 0.5)'
      };

      var emptyStyle = {
        paddingRight: '0'
      }


    return (
      <Container>
      <Row>
      <Col xs="1"></Col>
    <Col>
      <Chart
        chartType="ColumnChart"
        data={array}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="350px"
        legend_toggle
      />
    </Col>
      {/* <div className="col-2" style={emptyStyle}></div> */}
<Col xs="1"></Col>
  </Row>
    <br />
      <Table bordered style={tableStyle} >
         <thead>
           <tr>
             <th>最長睡眠時間</th>
             <th>最短睡眠時間</th>
             <th>平均睡眠時間</th>
           </tr>
         </thead>
         <tbody>
           <tr>
            <td>{longest.toFixed(0)<10?'0':''}{longest.toFixed(0)}:{(longest*60)%60<10?'0':''}{(longest*60)%60}</td>
             <td>{shortest.toFixed(0)<10?'0':''}{shortest.toFixed(0)}:{(shortest*60)%60<10?'0':''}{(shortest*60)%60}</td>
             <td>{(sum/7).toFixed(2)}&nbsp;分鐘</td>
           </tr>
         </tbody>
       </Table>
       <Row>&nbsp;</Row>
           </Container>
    );
  }
}
