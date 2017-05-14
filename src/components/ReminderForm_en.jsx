import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import {getMoodIcon} from 'utilities/weather.js';

import './ReminderForm.css';

export default class ReminderForm_en extends React.Component {
    static propTypes = {
        onPost: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            //inputValue: props.city,
            // inputDanger: false,
            // moodToggle: false,
            // mood: 'na'
        };
        this.inputEl = null;
        this.moodToggleEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleMoodToggle = this.handleMoodToggle.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const {inputValue, moodToggle, mood} = this.state;
        const inputDanger = this.state.inputDanger ? 'has-danger' : '';

        return (
            <div className='post-form'>
                <Alert color='warning' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDanger}`}>
                    <div className='mood align-self-start'>
                    </div>
                    <Input className='input' type='textarea' getRef={el => {this.inputEl = el}} value={this.state.inputValue} onChange={this.handleInputChange} placeholder="What do you want to add to memo？"></Input>
                    <Button className='btn-post align-self-end' color="warning" onClick={this.handlePost}>Add to List</Button>
                </Alert>
            </div>
        );
    }

    handleDropdownSelect(mood) {
        this.setState({mood: mood});
    }

    handleInputChange(e) {
        const text = e.target.value
        this.setState({inputValue: text});
        if (text) {
            this.setState({inputDanger: false});
        }
    }

    handleMoodToggle(e) {
        this.setState((prevState, props) => ({
            moodToggle: !prevState.moodToggle
        }));
    }

    handlePost() {
        if (this.state.mood === 'na') {
            this.setState({moodToggle: true});
            return;
        }
        if (!this.state.inputValue) {
            this.setState({inputDanger: true});
            return;
        }

        this.props.onPost(this.state.inputValue);
        this.setState({
            inputValue: ''
        });
    }
}
