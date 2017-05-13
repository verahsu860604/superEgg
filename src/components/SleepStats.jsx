import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import "./SleepStats.css";
import {listSleepTime, createSleepTime} from 'api/sleep.js';
import {listPhoneTime, createPhoneTime} from 'api/phone.js'
import { Chart } from 'react-google-charts';
import moment from 'moment';
export default class SleepStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Sleep Time record',
        hAxis: { title: 'Time to sleep', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Duration', minValue: 0, maxValue: 15 },
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
    this.listSleepTime();
  }
  listSleepTime(){
      listSleepTime().then(data => {
                console.log('sssssssssssssssssssssss',data);
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
      var array = [['Time to sleep', 'Duration', { role: 'style' }]];
      for(var i = 0;i < 7;i ++){
          var tmp;

          var color;



          if(data[i] === undefined) tmp = ['No data', 0 , 'red'];
          else{

              if(data[i].diff < 6)color = "#FF3333";
              else if(data[i].diff < 8)color = "#FFDC35";
              else color = "#00AA00";

              tmp = [data[i].date.slice(5,10), parseInt(data[i].diff), color] ;

               //longest calculation
               if(data[i].diff > longest) longest = data[i].diff;
               //shortest calculation
               if(shortest === -1) {
                  shortest = data[i].diff;
               }else if(data[i].diff < shortest) shortest = data[i].diff;
               //avg. calculation

               sum = sum + parseInt(data[i].diff);


               console.log('in sleep stats',i,longest,shortest,sum);
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


    console.log(array);
    return (
      <div className="Container">
      <div className="row">
      <div className="col-2"></div>
      <div className="col-8 sss">
      <Chart
        chartType="ColumnChart"
        data={array}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle
      />
      </div>
      {/* <div className="col-2" style={emptyStyle}></div> */}

  </div>
    <br />
      <Table bordered style={tableStyle} >
         <thead>
           <tr>
             <th>Longest</th>
             <th>Shortest</th>
             <th>Average</th>
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
