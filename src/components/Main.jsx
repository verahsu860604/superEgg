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
    Button
} from 'reactstrap';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import Mood from 'components/Mood.jsx';
import Mood_en from 'components/Mood_en.jsx';
import {unit, weather, weatherForm} from 'states/weather-reducers.js';
import {sleep, phone, breakFast, login} from 'states/reducers.js';
import Stats from 'components/Stats.jsx';
import Stats_en from 'components/Stats_en.jsx';
import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navbarToggle: false,
            searchText: '',
            en: true
        };
        this.store = null;
        this.searchEl = null;
        this.language = this.language.bind(this);
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            unit,
            weather,
            weatherForm,
            sleep,
            phone,
            breakFast,
            login
        }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <div className='main'>
                        <div className='bg-faded'>
                            <div className='container'>
                                <Navbar color='faded' light toggleable>
                                    <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                    <NavbarBrand className='text-info' href="/"><span id="super">超</span><span id="superr">營養蛋餅</span></NavbarBrand>
                                    <Collapse isOpen={this.state.navbarToggle} navbar className="d-flex flex-row-reverse">
                                          <div className="p-2">
                                            <Nav tabs id="navv">
                                              <NavItem active>
                                                <NavLink tag={Link} to='/'>{this.state.en?'Home':'主頁'}</NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink tag={Link} to='/stats'>{this.state.en?'Stats':'數據'}</NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink tag={Link} to='/en' onClick = {this.language}>{this.state.en?'中文':'English'}</NavLink>
                                              </NavItem>
                                            </Nav>
                                          {/* </div> */}



                                        </div>

                                    </Collapse>
                                  <a href='https://www.facebook.com/vera.hsu.37?fref=ts'><img src={`images/fbbb4.png`} id="facebok"/></a>
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
}
