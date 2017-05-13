import React from 'react';
import PropTypes from 'prop-types';
import "./PhoneStats.css"

import {Alert, Container,  Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Button,Table} from 'reactstrap';

import {listSleepTime, createSleepTime} from 'api/sleep.js';
import {listPhoneTime, createPhoneTime} from 'api/phone.js'
import { Chart } from 'react-google-charts';
import moment from 'moment';
export default class PhoneStats extends React.Component {
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
        title: '滑手機時間紀錄',
        hAxis: { title: '開始時間', minValue: 0, maxValue: 15 },
        vAxis: { title: '時間長度(min)', minValue: 0, maxValue: 15 },
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
      var shortest = -1;
      var sum = 0;
      const data = this.state.data;
      var array = [['Phone Time', 'Duration',  { role: 'style' }]];
      for(var i = 0;i < 7;i ++){
          var tmp;
          var color;

          if(data[i] === undefined) tmp = ['No data', 0, 'red'];
          else{

              if(data[i].end > 30)color = "#FF3333";
              else if(data[i].end > 15)color = "#FFDC35";
              else color = "#00AA00";

               tmp = [data[i].date.slice(5,10), parseInt(data[i].end), color];



               //longest calculation
               if(data[i].end > longest) longest = data[i].end;
               //shortest calculation
               if(shortest === -1) {
                  shortest = data[i].end;
               }else if(data[i].end < shortest) shortest = data[i].end;
               //avg. calculation

               sum = sum + parseInt(data[i].end);
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
      <div className="Container">
      <div className="row">
      <div className="col-2"></div>
      <div className="col-8">
      <Chart
        chartType="ColumnChart"
        data={array}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="350px"
        legend_toggle
      />
      </div>
      {/* <div className="col-2" style={emptyStyle}></div> */}

  </div>
    <br />
      <Table bordered style={tableStyle} >
         <thead>
           <tr>
             <th>最長滑手機時間</th>
             <th>最短滑手機時間</th>
             <th>平均滑手機時間</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>{longest}</td>
             <td>{shortest}</td>
             <td>{(sum/7).toFixed(3)}</td>
           </tr>
         </tbody>
       </Table>

    </div>
    );
  }
}
