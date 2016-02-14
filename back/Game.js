
var GameHelpers = require('gameHelpers')

var Game = function (gameId, pl1Id, pl2Id) {
    this.gameId = gameId;
    this.pl1 = {id: pl1Id, turns: [], winCombinations: []};
    this.pl2 = {id: pl2Id, turns: [], winCombinations: []};
    this.currentTurn = pl1Id;
    this.field = [
        [1, 2, 3],
        [8, 0, 4],
        [7, 6, 5]
    ]
};


Game.prototype.getGameState = function () {
    return {
        id: this.gameId,
        pl1Turns: this.pl1.turns,
        pl2Turns: this.pl2.turns,
        field: this.field,
        started: true
    }
}
Game.prototype.turn = function (data, cb, cb2) {
    var i = data.turn[0];
    var j = data.turn[1];
    var winArr;
    if (this.pl1.id == this.currentTurn) {
        this.pl1.turns.push(data.turn);
        this.pl1.winCombinations.push(this.field[i][j]);
        winArr = GameHelpers.getWinComb(this.pl1.winCombinations, this.pl2.winCombinations);
        this.currentTurn = this.pl2.id;
        cb(this.pl2.id);
    } else {
        this.pl2.turns.push(data.turn);
        this.pl2.winCombinations.push(this.field[i][j]);
        winArr = GameHelpers.getWinComb(this.pl2.winCombinations, this.pl1.winCombinations);
        this.currentTurn = this.pl1.id;
        cb(this.pl1.id);
    }
    this.field[i][j] = -1;
    if (GameHelpers.isWin(winArr)) {
        setTimeout(function () {
            if (this.pl1.id != this.currentTurn) {
                cb2('cross');

            } else {
                cb2('zero');
            }
        }.bind(this), 300);
    } else {
        var isEnd = this.field.every(function (arr) {
            return arr.every(function (val) {
                return val == -1
            })
        });
        if (isEnd) {
            setTimeout(function () {
                cb2('draft');
            }.bind(this), 300)
        }
    }

}
Game.prototype.initFiled = function () {
    return [
        [1, 2, 3],
        [8, 0, 4],
        [7, 6, 5]
    ];
}

module.exports = Game;