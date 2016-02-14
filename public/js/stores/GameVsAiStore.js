/**
 * Created by ПК on 03.02.2016.
 */

import AppDispatcher from '../AppDispatcher.js'
import SingleGameConstants from '../constants/SingleGameConstants.js'
var EventEmitter = require('events').EventEmitter;
var GameHelpers = require('gameHelpers');


var priority = [
    [1,2,3],
    [8,0,4],
    [7,6,5]
];
var player = 'cross';
var started = false;
var playerTurns =[];
var aiTurns = [];
var pl1WinCombinations = [];
var pl2WinCombinations = [];

class GameVsAiStore extends EventEmitter {
     getPlayerTurns(){
        return playerTurns
    }
     getAiTurns(){
        return aiTurns;
    }
    isStarted(){
        return started;
    }
    whoPlayer(){
        return player;
    }
    initField(){
        priority = [
            [1,2,3],
            [8,0,4],
            [7,6,5]
        ];
    }
     emitChange () {
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
var store = new GameVsAiStore();


AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch(action){
        case SingleGameConstants.RESET_GAME:
            started=false;
            pl1WinCombinations = [];
            pl2WinCombinations = [];
            store.initField();
            player='cross';
            playerTurns = [];
            aiTurns = [];
            store.emitChange();
            break;
        case SingleGameConstants.START_GAME:
            started = true;
            if(payload.data == 'zero'){
                //emulating first turn
                player = 'zero';
                var i = Math.round(Math.random()*2);
                var j = Math.round(Math.random()*2);
                aiTurns.push([i,j]);
                pl2WinCombinations.push(priority[i][j]);
                priority[i][j] = -1;
            }else{
                player ='cross'
            }
            store.emitChange();
            break;
        case SingleGameConstants.TURN :
            var i = payload.data[0];
            var j = payload.data[1];

            if(priority[i][j] != -1){
                playerTurns.push(payload.data);
                pl1WinCombinations.push(priority[i][j]);
                priority[i][j] = -1;

                var winArr = GameHelpers.getWinComb(pl1WinCombinations,pl2WinCombinations);
                var maxPrior = GameHelpers.findIndexOfMaxPrior(winArr);

                if(GameHelpers.isWin(winArr)){
                    store.emitChange();
                    setTimeout(function () {
                        alert('Вы победили!');
                    },300);
                    return
                }else{
                    var zeroWinArr = GameHelpers.getWinComb(pl2WinCombinations,pl1WinCombinations);
                    var zeroMaxPrior = GameHelpers.findIndexOfMaxPrior(zeroWinArr);

                    if(zeroMaxPrior.max === 2){
                        maxPrior = zeroMaxPrior.combIndex;
                    }else{
                        maxPrior = maxPrior.combIndex;
                    }
                    var zeroTurnIndexes = GameHelpers.combinations[maxPrior];
                    var turn = null;
                    zeroTurnIndexes.forEach(function(turnIndex){
                        priority.forEach(function(arr,i){
                            var j = arr.indexOf(turnIndex);
                            if(j!=-1){
                                turn = {
                                    i:i,
                                    j:j
                                }
                            }
                        })
                    });

                    if(turn === null){
                        priority.forEach(function(arr,i){
                            arr.forEach(function(value, j){
                                if(value != -1){
                                    turn = {i:i,j:j}
                                }
                            })
                        })
                    }
                    if(turn === null){
                        store.emitChange();
                        setTimeout(function () {
                            alert('Ничья')
                        }, 300)
                        return
                    }

                    pl2WinCombinations.push( priority[turn.i][turn.j]);
                    priority[turn.i][turn.j] = -1;
                    aiTurns.push([turn.i,turn.j]);
                    store.emitChange();
                    var winArr = GameHelpers.getWinComb(pl2WinCombinations,pl1WinCombinations);
                    if(GameHelpers.isWin(winArr)){
                        setTimeout(function () {
                            alert('Поражение!');
                        },300)
                    }else {
                        var isEnd = priority.every(arr => arr.every(val => val == -1));
                        if (isEnd) {
                            store.emitChange();
                            setTimeout(function () {
                                alert('Ничья')
                            }, 300)
                            return
                        }
                    }

                }
            }

    }
});

export default store