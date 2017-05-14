import React from 'react';
import PropTypes from 'prop-types';
import "./PhoneStats.css"

import {Alert, Container,  Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Button,Table} from 'reactstrap';

import {listSleepTime, createSleepTime} from 'api/sleep.js';
import {listPhoneTime, createPhoneTime} from 'api/phone.js'
import { Chart } from 'react-google-charts';
import moment from 'moment';
export default class PhoneStats_en extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // options: {
      //   title: 'Phone Time record',
      //   hAxis: { title: 'Time phoning', minValue: 0, maxValue: 15 },
      //   vAxis: { title: 'Duration', minValue: 0, maxValue: 15 },
      //   legend: 'none',
      // },
      options: {
        title: 'Phone Time Record',
        hAxis: { title: 'Start Time', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Duration(min)', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
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
    this.listPhoneTime();
  }
  listPhoneTime(){
      listPhoneTime().then(data => {
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
      const data = this.state.data;
      var array = [['Phone Time', 'Duration',  { role: 'style' }]];
      for(var i = 0;i < 7;i ++){
          var tmp;
          var color;
          var dur;
          if(data[i] === undefined) tmp = ['No data', 0, 'red'];
          else{
              dur = parseInt(data[i].end)/60;
              if(dur > 30)color = "#FF3333";
              else if(dur > 15)color = "#FFDC35";
              else color = "#00AA00";
              
               tmp = [data[i].date.slice(5,10)+' '+data[i].date.slice(11,16), dur, color];



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
             <th>Longest Phone Time</th>
             <th>Shortest Phone Time</th>
             <th>Average Phone Time</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>{longest.toFixed(0)<10?'0':''}{longest.toFixed(0)}:{(longest*60)%60<10?'0':''}{(longest*60)%60}</td>		     
             <td>{shortest.toFixed(0)<10?'0':''}{shortest.toFixed(0)}:{(shortest*60)%60<10?'0':''}{(shortest*60)%60}</td>		             
             <td>{(sum/7).toFixed(2)}&nbsp;mins</td>
           </tr>
         </tbody>
       </Table>

       <Row>&nbsp;</Row>
           </Container>
    );
  }
}
