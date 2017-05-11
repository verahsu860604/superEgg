import React from 'react';
import PropTypes from 'prop-types';

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
        return (
            
            <div>
                <ButtonGroup>
                    <Button onClick = {this.getSleepChart}>Sleep Time</Button>{' '}
                    <Button onClick = {this.getPhoneChart}>Phone Time</Button>
            </ButtonGroup>
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