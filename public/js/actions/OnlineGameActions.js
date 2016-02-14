/**
 * Created by ой on 05.02.2016.
 */

import OnlineGameConstants from '../constants/OnlineGameConstants.js'
import AppDispatcher from '../AppDispatcher.js'

const PvpGameActions = {
    playerTurn(id,turn){
        socket.emit('PLAYER_TURN',{id:id,turn:turn});
        AppDispatcher.dispatch({
            action:OnlineGameConstants.WAIT_NEXT_TURN,
            data:''
        })
    },
    searchPlayers(){
        socket.emit('PLAYER_SEARCH',{})
    },
    updateGame(data){
        AppDispatcher.dispatch({
            action:OnlineGameConstants.UPDATE_GAME_STATE,
            data:data
        })
    },

   changeTurn(){
       AppDispatcher.dispatch({
           action:OnlineGameConstants.CHANGE_TURN,
           data:''
       })
    }
};

export default PvpGameActions;