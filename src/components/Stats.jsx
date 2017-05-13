import React from 'react';
import PropTypes from 'prop-types';

import "./Stats.css"
import SleepStats from 'components/SleepStats.jsx';
import PhoneStats from 'components/PhoneStats.jsx';
import { Button, ButtonGroup } from 'reactstrap';
export default class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.getSleepChart = this.getSleepChart.bind(this);
        this.getPhoneChart = this.getPhoneChart.bind(this);

        this.state = {
            index: 'sleep'
        }
    }

    render() {
        var color1;
        if(this.state.index === "sleep")color1 = "warning";
        else color1 = "secondary";

        var color2;
        if(this.state.index === "sleep")color2 = "secondary";
        else color2 = "warning";
        return (

            <div>
              <div className="bbb">
                <ButtonGroup>
                    <Button onClick = {this.getSleepChart} color = {color1} >Sleep Time</Button>{' '}
                    <Button onClick = {this.getPhoneChart} color = {color2} >Phone Time</Button>
                  </ButtonGroup>
              </div>
                <div>
                {this.state.index === 'sleep' && <SleepStats/>}
                </div>
                <div>
                {this.state.index === 'phone' && <PhoneStats/>}
                </div>
            </div>
        );
    }


getSleepChart() {
    this.setState({
        index: 'sleep'
    });
}

getPhoneChart(){
    this.setState({
        index: 'phone'
    });
}

}
