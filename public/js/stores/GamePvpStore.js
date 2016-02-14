/**
 * Created by ПК on 04.02.2016.
 */

import AppDispatcher from '../AppDispatcher.js'
import PvpGameConstants from '../constants/PvpGameConstants.js'
var EventEmitter = require('events').EventEmitter;
var GameHelpers = require('gameHelpers');


var priority = [
    [1, 2, 3],
    [8, 0, 4],
    [7, 6, 5]
];
var started = false;
var player1Turns = [];
var player2Turns = [];
var pl1WinCombinations = [];
var pl2WinCombinations = [];
var crossesTurn = true;

class GamePvpStore extends EventEmitter {
    getP1Turns() {
        return player1Turns
    }

    getP2Turns() {
        return player2Turns
    }
    isCrossesTurn(){
        return crossesTurn ;
    }

    isStarted() {
        return started;
    }

    initField() {
        priority = [
            [1, 2, 3],
            [8, 0, 4],
            [7, 6, 5]
        ];
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
}
var store = new GamePvpStore();

AppDispatcher.register(function (payload) {
    switch(payload.action){
        case PvpGameConstants.RESET_PVP:
            started=false;
            pl1WinCombinations = [];
            pl2WinCombinations = [];
            store.initField();
            player1Turns = [];
            player2Turns = [];
            crossesTurn = true;
            store.emitChange();
            break;
        case PvpGameConstants.START_PVP:
            started = true;
            store.emitChange();
            break;
        case PvpGameConstants.PLAYER_TURN:
            var i = payload.data[0];
            var j = payload.data[1];

            if(priority[i][j] !=-1){
                var winArr;
                if(store.isCrossesTurn()){
                    player1Turns.push(payload.data)
                    pl1WinCombinations.push(priority[i][j])
                    winArr = GameHelpers.getWinComb(pl1WinCombinations,pl2WinCombinations);
                    crossesTurn = false;

                }else{
                    player2Turns.push(payload.data);
                    pl2WinCombinations.push(priority[i][j])
                    winArr = GameHelpers.getWinComb(pl2WinCombinations,pl1WinCombinations);
                    crossesTurn = true;
                }
                priority[i][j] = -1;
                if(GameHelpers.isWin(winArr)){
                    setTimeout(function () {
                        if(!store.isCrossesTurn()){
                            alert('победили крестики')
                        }else{
                            alert('победили нолики')
                        }
                    },300);
                }else{
                    var isEnd = priority.every(arr => arr.every(val => val == -1));
                    if(isEnd){
                        setTimeout(function(){
                            alert('Ничья')
                        },300)
                    }
                }
                store.emitChange();
            }

    }
});

export default store;