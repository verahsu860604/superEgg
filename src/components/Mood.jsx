import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Container,  Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import {connect} from 'react-redux';
// import { CookiesProvider, withCookies, Cookies, cookie } from 'react-cookie';
import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import {cancelWeather} from 'api/open-weather-map.js';
import {getWeather, weatherToggle} from 'states/weather-actions.js';
import PostForm from 'components/PostForm.jsx';
import PostList from 'components/PostList.jsx';
import {listPosts, createPost, createVote} from 'api/posts.js';
import ReminderForm from 'components/ReminderForm.jsx'
import './Mood.css';
import moment from 'moment';
import {getStartSleepTime, getEndSleepTime, getStartPhoneTime, getEndPhoneTime, sleepToggle, phoneToggle} from 'states/actions.js';
import {listReminders, createReminders} from 'api/reminder.js'
import {listSleepTime, createSleepTime} from 'api/sleep.js';
import {listPhoneTime, createPhoneTime} from 'api/phone.js'
class Mood extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        code: PropTypes.number,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string,
        weatherLoading: PropTypes.bool,
        masking: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            lat: 0,
            lon: 0,
            postLoading: false,
            posts: [],
            phone: [],
            sleep: []
        };

        this.sleepTime = new Date();
        this.diff = 0;
        this.phoneDiff = 0;
        this.handleCreatePost = this.handleCreatePost.bind(this);
        // this.handleCreateSleep = this.handleCreateSleep.bind(this);
        // this.handleCreateVote = this.handleCreateVote.bind(this);
        this.handlesnow = this.handlesnow.bind(this);
        // this.getTime = this.getTime.bind(this);
        // this.getDiff = this.getDiff.bind(this);
        this.popWeather = this.popWeather.bind(this);
        this.getStartSleepTime = this.getStartSleepTime.bind(this);
        this.getEndSleepTime = this.getEndSleepTime.bind(this);
        this.phoneTime = this.phoneTime.bind(this);
        this.sleepToggle = this.sleepToggle.bind(this);
        this.phoneToggle = this.phoneToggle.bind(this);
        this.weatherToggle = this.weatherToggle.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getWeather('Hsinchu', this.props.unit));
        this.listPosts(this.props.searchText);
        this.getLocation();
    }

    componentWillUnmount() {
        if (this.state.weatherLoading) {
            cancelWeather();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.listPosts(nextProps.searchText);
        }
    }

    render() {
        const {city, group, description, temp, unit, masking} = this.props;
        const {posts, postLoading} = this.state;
        const {startSleepTime, endSleepTime} = this.props;
        console.log(this.state);
        document.body.className = `weather-bg ${group}`;
        document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            /*<div className='today'>
                <div>
                    <p> {this.cook}</p>
                </div>
                <div className='weather'>
                    <WeatherForm city={city} defaultUnit={unit} submitAction={getWeather} />
                    <WeatherDisplay {...{group, description, temp, unit, masking}} day='today'/>
                </div>
                <div className='posts'>
                    <PostForm onPost={this.handleCreatePost} />
                    <PostList posts={posts} onVote={this.handleCreateVote} />{
                        postLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>*/
            <div className='row'>
            <div className='col-sm-8'>
                <div className='row'>
                    <div className='col-sm-6'>
                     <img src={`images/icon1.png`} onClick = {this.getEndSleepTime}/>
                     </div>
                     <Modal isOpen={this.props.sleepToggle} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Total Sleep Time</ModalHeader>
                        <ModalBody>
                            {this.diff}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.sleepToggle}>X</Button>
                        </ModalFooter>
                    </Modal>
                     <div className='col-sm-6'>
                     <img src={`images/icon1.png`} onClick = {this.popWeather}/>
                     </div>
                     <Modal isOpen={this.props.weatherToggle} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Current Weather in {this.props.city}</ModalHeader>
                        <ModalBody>
                            <div className={`weather-display `}>
                                <img src={`images/w-${this.props.group}.png`}/>
                                <p className='description'>{`${this.props.description}`}</p>
                                <h1 className='temp'>
                                    <span className='display-3'>{this.props.temp.toFixed(0)}&ordm;</span>
                                    &nbsp;{(this.props.unit === 'metric')
                                        ? 'C'
                                        : 'F'}
                                </h1>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.weatherToggle}>X</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                     <img src={`images/icon1.png`} onClick = {this.phoneTime}/>
                     </div>
                     <Modal isOpen={this.props.phoneToggle} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Total Phone Time</ModalHeader>
                        <ModalBody>
                            {this.phoneDiff}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.phoneToggle}>X</Button>
                        </ModalFooter>
                    </Modal>
                     <div className='col-sm-6'>
                     <img src={`images/icon1.png`} onClick = {this.getStartSleepTime}/>
                     </div>
                </div>
            </div>

            <div className='col-sm-4'>
                <div className='reminder'>
                    <ReminderForm onPost={this.handleCreatePost} />
                    <PostList posts={posts} onVote={this.handleCreateVote} />{
                        postLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>

            </div>

        );
    }

    handlesnow(){
        alert('test!');

    }

    sleepToggle() {
        this.props.dispatch(sleepToggle());
    }

    phoneToggle() {
        this.props.dispatch(phoneToggle());
    }

    getStartSleepTime() {
        let startSleepTime = new Date();
        this.sleepTime = new Date();
        this.props.dispatch(getStartSleepTime(startSleepTime));
    }

    getEndSleepTime() {
        let endSleepTime = new Date();
        this.diff = moment.utc(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss").diff(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");

        var diff = moment.utc(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss").diff(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss"))).format("X");
        console.log(this.diff);
        this.props.dispatch(getEndSleepTime(endSleepTime,diff));
        this.props.dispatch(sleepToggle());
        // var x = moment(this.sleepTime,"DD/MM");
        // console.log(x);
        this.handleCreateSleep(this.sleepTime, endSleepTime, diff);
    }

    phoneTime() {
        //console.log(this.props.phone + '!!');
        const {phone, startPhoneTime, endPhoneTime, totalPhoneTime} = this.props;
        if (phone == false) {
            let time = new Date();
            this.props.dispatch(getStartPhoneTime(time));
        } else {
            let time = new Date();
            this.phoneDiff = moment.utc(moment(time,"DD/MM/YYYY HH:mm:ss").diff(moment(startPhoneTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
            var diff = moment.utc(moment(time,"DD/MM/YYYY HH:mm:ss").diff(moment(startPhoneTime,"DD/MM/YYYY HH:mm:ss"))).format("X");
            this.props.dispatch(getEndPhoneTime(time,diff));
            this.props.dispatch(phoneToggle());
            this.handleCreatePhone(this.props.startPhoneTime, diff);
        }
    }

    // getTime(){
    //     this.sleepTime = new Date();
    //     alert(this.sleepTime);
    // }
    //
    // getDiff(){
    //     const now = new Date();
    //     var diff = moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
    //     alert("You've slept for " + diff + '!');
    // }
    listSleepTime() {
       // console.log('hi');
        this.setState({
            postLoading: true
        }, () => {
            listSleepTime().then(sleep => {
                this.setState({
                    sleep,
                    postLoading: false
                });
            }).catch(err => {
                console.error('Error listing phoneTime', err);

                this.setState({
                    sleep: [],
                    postLoading: false
                });
            });
        });
    }

    getLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                })
            })
        }
    }

    weatherToggle() {
        this.props.dispatch(weatherToggle());
    }

    popWeather() {
        this.props.dispatch(getWeather(this.state.lat,this.state.lon,'metric'));
        this.props.dispatch(weatherToggle());
    }

    handleCreateSleep(start, end, diff) {
        //console.log(diff);
        createSleepTime(start, end, diff).then(() => {
            this.listSleepTime();
        }).catch(err => {
            console.error('Error creating SleepTime', err);
        });
    }
    listPhoneTime() {
       // console.log('hi');
        this.setState({
            postLoading: true
        }, () => {
            listPhoneTime().then(phone => {
                this.setState({
                    phone,
                    postLoading: false
                });
            }).catch(err => {
                console.error('Error listing phoneTime', err);

                this.setState({
                    phone: [],
                    postLoading: false
                });
            });
        });
    }

    handleCreatePhone(start, diff) {
        //console.log(diff);
        createPhoneTime(start, diff).then(() => {
            this.listPhoneTime();
        }).catch(err => {
            console.error('Error creating phoneTime', err);
        });
    }

     listPosts() {
        this.setState({
            postLoading: true
        }, () => {
            listPosts().then(posts => {
                this.setState({
                    posts,
                    postLoading: false
                });
            }).catch(err => {
                console.error('Error listing posts', err);

                this.setState({
                    posts: [],
                    postLoading: false
                });
            });
        });
    }

    handleCreatePost(text) {
        console.log(text);
        createPost(text).then(() => {
            this.listPosts();
        }).catch(err => {
            console.error('Error creating posts', err);
        });
    }

    handleCreateVote(id, mood) {
        createVote(id, mood).then(() => {
            this.listPosts(this.props.searchText);
        }).catch(err => {
            console.error('Error creating vote', err);
        });
    }
}

export default connect((state) => {
    return {
        ...state.sleep,
        ...state.phone,
        ...state.weather,
        unit: state.unit
    };
})(Mood);
