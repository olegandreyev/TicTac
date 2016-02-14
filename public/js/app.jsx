import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import $ from 'jquery';
import AiGame from './views/AiGame.jsx'
import PvpGame from './views/PvpGame.jsx'
import OnlineGame from './views/OnlineGame.jsx'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var io = require('socket.io-client');
var socket = io();
window.socket = socket;

require('./events');

class App extends React.Component {
    render() {
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="jumbo" transitionAppear={true}>
            <div className='jumbotron'>
                <div className="container">
                <h1>Крестики-Нолики!</h1>
                <p>Играйте!!! весело и бесплатно!</p>
                </div>
            </div>
                   </ReactCSSTransitionGroup>
                <div className="container">
                    <div className="row menu">
                        <ReactCSSTransitionGroup transitionName="menu1" transitionAppear={true} >
                        <div className="col-md-4">
                            <Link to='/game/ai'>
                            Играй с компьютером
                            <img  src="resources/vsai.jpg" alt="vsai"/>
                            </Link>
                        </div>
                        </ReactCSSTransitionGroup>
                        <ReactCSSTransitionGroup transitionName="menu2" transitionAppear={true} >
                        <div className="col-md-4">
                            <Link to='/game/pvp'>
                            Играй на двоих
                            <img  src="resources/parnoje.jpg" alt="vshuman"/>
                                </Link>
                        </div>
                        </ReactCSSTransitionGroup>
                        <ReactCSSTransitionGroup transitionName="menu3" transitionAppear={true}>
                        <div className="col-md-4">
                            <Link to='/game/online'>
                            Играй онлайн
                            <img  src="resources/online.jpg" alt="online"/>
                                </Link>
                        </div>
                        </ReactCSSTransitionGroup>
                    </div>
               </div>
            </div>
        )
    }
}

$(document).ready(function () {
    render((
            <Router history={browserHistory}>
                <Route path="/" component={App}/>
                <Route path='/game/ai' component={AiGame} />
                <Route path='/game/pvp' component={PvpGame} />
                <Route path='/game/online' component={OnlineGame} />
            </Router>),
        document.getElementById('container'));
})

