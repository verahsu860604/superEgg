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
// import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';
// import cookie from 'react-cookie';
import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import Mood from 'components/Mood.jsx';
import {unit, weather, weatherForm, forecast} from 'states/weather-reducers.js';
import {sleep, phone, breakFast} from 'states/reducers.js';
import Stats from 'components/Stats.jsx';
import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navbarToggle: false,
            searchText: ''
        };
        this.store = null;
        this.searchEl = null;

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
            forecast,
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
                                <Navbar color='faded' light toggleable>
                                    <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                    <NavbarBrand className='text-info' href="/"><span id="super">超</span><span id="superr">營養蛋餅</span></NavbarBrand>
                                    <Collapse isOpen={this.state.navbarToggle} navbar className="d-flex flex-row-reverse">
                                        {/* <Nav navbar>
                                            <NavItem>
                                                <NavLink tag={Link} to='/'>Home</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} to='/stats'>Stats</NavLink>
                                            </NavItem>
                                        </Nav> */}
                                        {/* <div className="d-flex flex-row-reverse"> */}
                                          <div className="p-2">
                                            <Nav tabs id="navv">
                                              <NavItem active>
                                                <NavLink tag={Link} to='/'>主頁</NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink tag={Link} to='/stats'>數據</NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink tag={Link} to='/stats'>English</NavLink>
                                              </NavItem>
                                            </Nav>
                                          {/* </div> */}



                                        </div>

                                        {/* <div className='search ml-auto'>
                                            <Input className='ml-auto' type='text' getRef={this.searchEl} placeholder='Search' onKeyPress={this.handleSearchKeyPress} getRef={e => this.searchEl = e}></Input>{
                                                this.state.searchText &&
                                                <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
                                            }
                                        </div> */}
                                    </Collapse>
                                </Navbar>

                            </div>
                            </div>


                        {/* <Route exact path="/" render={() => (
                            <Today searchText={this.state.searchText} />
                        )}/>
                        <Route exact path="/forecast" render={() => (
                            <Forecast />
                        )}/> */}
                        <Route exact path="/" render={() => (
                            <Mood />
                        )}/>
                        <Route exact path="/stats" render={() => (
                            <Stats />
                        )}/>
                        {/*<div className='footer'>
                            DataLab.
                        </div>*/}
                      </div>
                </Router>
            </Provider>
        );
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
