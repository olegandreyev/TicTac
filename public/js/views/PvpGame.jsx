/**
 * Created by ПК on 04.02.2016.
 */
import React from 'react';
import {Link} from 'react-router'
import GameField from './../components/GameField.jsx'
import GamePvpStore from './../stores/GamePvpStore.js'
import PvpGameActions from './../actions/PvpGameActions.js'

class PvpGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            player1Turns:GamePvpStore.getP1Turns(),
            player2Turns:GamePvpStore.getP2Turns(),
            isStarted:GamePvpStore.isStarted()
        }
    }
    componentDidMount(){
        var self = this;
        GamePvpStore.addChangeListener(function () {
            self.setState({
                player1Turns:GamePvpStore.getP1Turns(),
                player2Turns:GamePvpStore.getP2Turns(),
                isStarted:GamePvpStore.isStarted()
            })
        })
    }
    componentWillUnmount(){
        GamePvpStore.removeChangeListener(function () {
            PvpGameActions.resetGame();
        })
    }
    handleClick(row,col){
        PvpGameActions.playerTurn(row,col)
    }
    start(){
        PvpGameActions.startGame()
    }
    reset(){
        PvpGameActions.resetGame()
    }
    render(){
        return (
            <div className="container">
                <div  className={"promo "+this.state.isStarted}>
                    <div className="btns">
                        <button onClick={this.start} className='btn btn-primary btn-large'>Начать</button>
                    </div>
                </div>

                <div className='promo-exit'>
                    <button onClick={this.reset} className='btn btn-primary'>Начать заново</button>
                    <Link to='/'> <button className='btn btn-default'>Главное меню</button></Link>
                </div>
                <GameField
                    player='cross'
                    started={this.state.isStarted}
                    player1={this.state.player1Turns}
                    player2={this.state.player2Turns}
                    cb={this.handleClick}/>
            </div>
        )
    }
}

export default PvpGame;