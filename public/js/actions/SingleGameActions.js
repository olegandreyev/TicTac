/**
 * Created by ой on 03.02.2016.
 */

import SingleGameConstants from '../constants/SingleGameConstants.js'
import AppDispatcher from '../AppDispatcher.js'

const SingleGameActions = {
    playerTurn(i,j){
       AppDispatcher.dispatch({
            action:SingleGameConstants.TURN,
            data:[i,j]
        })
    },
    startGame(who){
        AppDispatcher.dispatch({
            action:SingleGameConstants.START_GAME,
            data:who
        });
    },
    resetGame(){
        AppDispatcher.dispatch({
            action:SingleGameConstants.RESET_GAME,
            data:''
        });
    }
};

export default SingleGameActions;