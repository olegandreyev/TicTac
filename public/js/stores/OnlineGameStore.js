/**
 * Created by ой on 05.02.2016.
 */
import AppDispatcher from '../AppDispatcher.js'
import OnlineGameConstants from '../constants/OnlineGameConstants.js'
var EventEmitter = require('events').EventEmitter;
var GameHelpers = require('gameHelpers');


var priority = [];
var started = false;
var player1Turns = [];
var player2Turns = [];
var currentTurn = false;
var gameId = null;

class OnlineGameStore extends EventEmitter {
    getP1Turns() {
        return player1Turns
    }

    getP2Turns() {
        return player2Turns
    }

    isStarted() {
        return started;
    }
    getGameId(){
        return gameId;
    }

    emitChange() {
        this.emit('change')
    }

    addChangeListener(cb) {
        this.on('change', cb)
    }

    removeChangeListener(callback) {
        this.removeAllListeners('change');
        callback();
    }
    copyGameState(gameData){
        priority = gameData.field;
        player1Turns = gameData.pl1Turns;
        player2Turns = gameData.pl2Turns;
        started = gameData.started;
        gameId = gameData.id;
    }
    isCurrentTurn(){
        return currentTurn;
    }
}
var store = new OnlineGameStore();

AppDispatcher.register(function (payload) {
    switch(payload.action){
        case OnlineGameConstants.UPDATE_GAME_STATE:
            store.copyGameState(payload.data);
            store.emitChange();
            break;
        case OnlineGameConstants.CHANGE_TURN:
            currentTurn = true;
            store.emitChange();
            break;
        case OnlineGameConstants.WAIT_NEXT_TURN:
            currentTurn = false;
            store.emitChange();
            break;
    }
})

export default store;