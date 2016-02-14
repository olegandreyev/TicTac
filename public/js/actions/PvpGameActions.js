/**
 * Created by ой on 04.02.2016.
 */

import PvpGameConstants from '../constants/PvpGameConstants.js'
import AppDispatcher from '../AppDispatcher.js'

const PvpGameActions = {
    playerTurn(i,j){
        AppDispatcher.dispatch({
            action:PvpGameConstants.PLAYER_TURN,
            data:[i,j]
        })
    },
    startGame(who){
        AppDispatcher.dispatch({
            action:PvpGameConstants.START_PVP,
            data:who
        });
    },
    resetGame(){
        AppDispatcher.dispatch({
            action:PvpGameConstants.RESET_PVP,
            data:''
        });
    }
};

export default PvpGameActions;