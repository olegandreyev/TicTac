/**
 * Created by ой on 05.02.2016.
 */

import OnlineGameActions from './actions/OnlineGameActions.js'

socket.on('GAME_START', function (data) {
    OnlineGameActions.updateGame(data);
});
socket.on('UPDATE_GAME_STATE', function (data) {
    OnlineGameActions.updateGame(data);
});

socket.on('CHANGE_TURN',function(){
    OnlineGameActions.changeTurn();
})

socket.on('END_GAME',function(data){
    console.log(data);
 switch(data.winner){
     case 'cross':alert('cross');break;
     case 'zero':alert('zero');break;
     case 'draft':alert('draft');break;
 }
});