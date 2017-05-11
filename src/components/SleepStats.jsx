import React from 'react';
import PropTypes from 'prop-types';

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
      console.log(this.state);
      const data = this.state.data;
      var array = [['Time to sleep', 'Duration']];
      for(var i = 0;i < 7;i ++){
          //console.log(data[i]);
          var tmp;
          
          if(data[i] === undefined) tmp = ['No data', 0];
          else{
              console.log('gggg',data[i].date,data[i].end);
              //var diff = moment.utc(moment(data[i].date,"DD/MM/YYYY HH:mm:ss").diff(moment(data[i].end,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
              //console.log(diff);
               tmp = [data[i].date.slice(5,10), parseInt(data[i].diff)];
          }
          array.push(tmp);
      }
    
    console.log(array);
    return (
      <Chart
        chartType="ColumnChart"
        data={array}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    );
  }
}
