import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Tooltip
} from 'reactstrap';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import Mood from 'components/Mood.jsx';
import Mood_en from 'components/Mood_en.jsx';
import {unit, weather, weatherForm} from 'states/weather-reducers.js';
import {sleep, phone, breakFast} from 'states/reducers.js';
import Stats from 'components/Stats.jsx';
import Stats_en from 'components/Stats_en.jsx';
import './Main.css';
var FontAwesome = require('react-fontawesome');

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navbarToggle: false,
            searchText: '',
            en: true,
            guideModal: false,
            tooltipOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.store = null;
        this.searchEl = null;
        this.language = this.language.bind(this);
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.guideOnClick = this.guideOnClick.bind(this);
    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            unit,
            weather,
            weatherForm,
            sleep,
            phone,
            breakFast
        }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <div className='main'>
                        <div className='bg-faded'>
                            <div className='container'>
                              {!this.state.en && <Modal id="guide" isOpen={this.state.guideModal} toggle={this.toggle} className={this.props.className}>
                                 {/* <ModalHeader toggle={this.toggle}>早上吃早餐 頭好壯壯</ModalHeader> */}
                                 <ModalBody >
                                   <div id="cell1">&nbsp;<strong>手機</strong><br/>
                                   <img className="s"  src='images/icon_phone.png'/>
                                    <span>當要開始滑手機時，按下此按鈕，進入滑手機狀態！</span>
                                    <br />
                                    <img className="s"  src='images/icon1.png' />
                                    <span>滑完手機時，按下此按鈕，記錄你滑了多久！</span>
                                    <br/>
                                  </div>
                                  <div id="cell2">&nbsp;<strong>睡眠</strong><br/>
                                    <img className="s" src='images/icon2.png' />
                                    <span>睡覺前按下此按鈕，開睡 \^0^/ </span>
                                    <br/>
                                    <img className="s"  src='images/icon3.png' />
                                    <span>起床按此鈕，跳出天氣及睡眠時間，還有待辦事項喔！</span>
                                    <br/>
                                  </div>
                                    <div id="cell3">&nbsp;<strong>一鍵早晨</strong><br/>
                                    <img className="s"  src='images/icon4.png' />
                                    <span>根據地理位置的一鍵天氣，方便穿搭，給你每日好心情！</span>
                                    <br/>
                                    <img className="s"  src='images/icon5.png' />
                                    <span>一鍵頭條，讓你隨時掌握世界動向！</span>
                                    <br/>
                                    <img className="s" src='images/icon-eat.png' />
                                    <span>一鍵早餐，為你精心挑選，吃什麼不再煩惱！</span>
                                  </div>
                                 </ModalBody>
                                 <ModalFooter>
                                     <Button color="secondary" onClick={this.guideOnClick}>X</Button>
                                 </ModalFooter>
                             </Modal>}
                             {this.state.en && <Modal id="guide" isOpen={this.state.guideModal} toggle={this.toggle} className={this.props.className}>
                                {/* <ModalHeader toggle={this.toggle}>早上吃早餐 頭好壯壯</ModalHeader> */}
                                <ModalBody >
                                  <div id="cell1">&nbsp;<strong>Phone</strong><br/>
                                  <img className="s"  src='images/icon_phone.png'/>
                                   <span>Press this when you start using your phone before bed.</span>
                                   <br />
                                   <img className="s"  src='images/icon1.png' />
                                   <span>Press the button when you finish using your phone.</span>
                                   <br/>
                                 </div>
                                 <div id="cell2">&nbsp;<strong>Sleep</strong><br/>
                                   <img className="s" src='images/icon2.png' />
                                   <span>Press this button when you're about to go to bed \^0^/ </span>
                                   <br/>
                                   <img className="s"  src='images/icon3.png' />
                                   <span>Press the button when you get up, this reminds you of the weather and memo! </span>
                                   <br/>
                                 </div>
                                   <div id="cell3">&nbsp;<strong>Morning</strong><br/>
                                   <img className="s"  src='images/icon4.png' />
                                   <span>Based on your geo location, it gives you current weather.</span>
                                   <br/>
                                   <img className="s"  src='images/icon5.png' />
                                   <span>Give you the headline of today, keep in touch with the world! </span>
                                   <br/>
                                   <img className="s" src='images/icon-eat.png' />
                                   <span>To help you decide on what to eat for breakfast!</span>
                                 </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.guideOnClick}>X</Button>
                                </ModalFooter>
                            </Modal>}
                                <Navbar color='faded' light toggleable>
                                    <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                    <NavbarBrand className='text-info' href="/"><span id="super">超</span><span id="superr">營養蛋餅</span></NavbarBrand>
                                    <Collapse isOpen={this.state.navbarToggle} navbar>
                                      <div  className="d-flex flex-row-reverse">

                                           <div className="p-2">
                                            <Nav tabs id="navv">
                                              <NavItem active>

                                                <NavLink tag={Link} to='/'>
                                                <FontAwesome
                                                  className='super-crazy-colors'
                                                  name='home'
                                                  size='1x'
                                                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                                &nbsp;
                                                {this.state.en?'Home':'主頁'}
                                              </NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink tag={Link} to='/stats'>
                                                <FontAwesome
                                                  className='super-crazy-colors'
                                                  name='bar-chart'
                                                  size='1x'
                                                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                                &nbsp;
                                                {this.state.en?'Stats':'數據'}
                                              </NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink tag={Link} to='/en' onClick = {this.language}>
                                                <FontAwesome
                                                  className='super-crazy-colors'
                                                  name='book'
                                                  size='1x'
                                                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                                &nbsp;
                                                {this.state.en?'中文':'English'}
                                              </NavLink>
                                              </NavItem>
                                              <NavItem>
                                              &nbsp;&nbsp;

                                              <a href='https://github.com/verahsu860604'  id="TooltipExample">
                                              &nbsp;&nbsp;
                                              <FontAwesome
                                                className='super-crazy-colors'
                                                name='github'
                                                size='2x'
                                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                id='fbicon'
                                              />

                                            </a>
                                            {this.state.en && <Tooltip color="danger" placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
                                                Contact Developer
                                              </Tooltip>}
                                              {!this.state.en && <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
                                                  與開發者聯絡
                                                </Tooltip>}


                                              &nbsp;&nbsp;
                                            </NavItem>

                                            </Nav>
                                          </div>
  </div>



                                    </Collapse>

                                </Navbar>

                            </div>
                            </div>



                        {!this.state.en &&<Route exact path="/" render={() => (
                            <Mood />
                        )}/>}
                        {this.state.en &&<Route exact path="/" render={() => (
                            <Mood_en />
                        )}/>}
                        {!this.state.en &&<Route exact path="/stats" render={() => (
                            <Stats />
                        )}/>}
                        {this.state.en &&<Route exact path="/stats" render={() => (
                            <Stats_en />
                        )}/>}
                        {this.state.en &&<Route exact path="/en" render={() => (
                            <Mood_en />
                        )}/>}
                        {!this.state.en &&<Route exact path="/en" render={() => (
                            <Mood />
                        )}/>}
                        {/*<div className='footer'>
                            DataLab.
                        </div>*/}
                      </div>
                </Router>
            </Provider>
        );
    }

    toggle() {
      this.setState({
      tooltipOpen: !this.state.tooltipOpen
      });
    }

    language(){
        this.setState({
            en: !this.state.en
        })
    }
    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13){
            this.setState({
                searchText: e.target.value
            });
        }
    }

    handleClearSearch() {
        this.setState({
            searchText: ''
        });
        this.searchEl.value = '';
    }

    guideOnClick() {
        this.setState({
            guideModal: !this.state.guideModal
        })
    }
}
