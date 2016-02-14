/**
 * Created by ПК on 05.02.2016.
 */

var GameHelpers = require('gameHelpers');
var Game = require('./Game');

module.exports = function (io) {
    var waitPlayers = [];
    var games = {};

    io.on('connection', function (socket) {

        socket.on('PLAYER_SEARCH', function (data) {
            waitPlayers.push(socket.id)
        });

        socket.on('PLAYER_TURN', function (data) {
            var game = games[data.id];
            game.turn(data, function (nextPlayer) {
                io.sockets.connected[nextPlayer].emit('CHANGE_TURN')
            }, function (result) {
                io.to(game.gameId).emit('END_GAME', {winner: result})
            });
            io.to(data.id).emit('UPDATE_GAME_STATE', game.getGameState())

        });

        setInterval(function () {
            if (waitPlayers.length >= 2) {
                createGame();
            }
        }, 1000)

        socket.on('disconnect', function () {
            waitPlayers = waitPlayers.filter(function (id) {
                return id != socket.id;
            })
        })
    })


    function createGame() {
        var id1 = waitPlayers.shift();
        var id2 = waitPlayers.shift();
        var game = new Game(id1 + id2, id1, id2);

        io.sockets.connected[id1].join(game.gameId);
        io.sockets.connected[id2].join(game.gameId);
        games[game.gameId] = game;

        io.to(game.gameId).emit('GAME_START', game.getGameState());
        io.sockets.connected[id1].emit('CHANGE_TURN')
    }
};



