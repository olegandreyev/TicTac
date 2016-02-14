/**
 * Created by ПК on 05.02.2016.
 */
import React from 'react';
import {Link} from 'react-router'
import GameField from './../components/GameField.jsx'
import  OnlineGameStore from './../stores/OnlineGameStore.js'
import  OnlineGameActions from './../actions/OnlineGameActions.js'

class OnlineGame extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            player1Turns:OnlineGameStore.getP1Turns(),
            player2Turns:OnlineGameStore.getP2Turns(),
            isStarted:OnlineGameStore.isStarted(),
            currentTurn:OnlineGameStore.isCurrentTurn(),
            gameId:OnlineGameStore.getGameId()
        }
    }
    componentDidMount(){
        var self = this;
        OnlineGameStore.addChangeListener(function () {
            self.setState({
                player1Turns:OnlineGameStore.getP1Turns(),
                player2Turns:OnlineGameStore.getP2Turns(),
                isStarted:OnlineGameStore.isStarted(),
                currentTurn:OnlineGameStore.isCurrentTurn(),
                gameId:OnlineGameStore.getGameId()
            })
        })
    }
    componentWillUnmount(){
        OnlineGameStore.removeChangeListener(function () {
           OnlineGameActions.resetGame();
        })
    }
    handleClick(row,col){
        if(this.state.currentTurn) {
            OnlineGameActions.playerTurn(this.state.gameId,[row, col])
        }
    }
    searchPlayers(){
        OnlineGameActions.searchPlayers()
    }
    render(){
        var turnInfo = this.state.currentTurn ? 'Ваш ход':'Ход противника'
        return (
            <div className="container">
                <div  className={"promo "+this.state.isStarted}>
                    <div className="btns">
                        <button onClick={this.searchPlayers} className='btn btn-primary btn-large'>Поиск игроков</button>
                    </div>
                </div>
               <div hidden={!this.state.isStarted}
                    className={"alert "+( this.state.currentTurn ? 'alert-success' : 'alert-warning')}>
                   {turnInfo}
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

export default OnlineGame