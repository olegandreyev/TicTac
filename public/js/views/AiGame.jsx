import React from 'react'
import GameField from './../components/GameField.jsx'
import SingleGameActions from './../actions/SingleGameActions.js'
import GameVsAiStore from './../stores/GameVsAiStore.js'
import {Link} from 'react-router'

class AiGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerTurns: GameVsAiStore.getPlayerTurns(),
            aiTurns: GameVsAiStore.getAiTurns(),
            isStarted: GameVsAiStore.isStarted(),
            who:GameVsAiStore.whoPlayer()
        }
    }
    componentDidMount() {
        var self = this;
        GameVsAiStore.addChangeListener(function () {
            self.setState({
                playerTurns: GameVsAiStore.getPlayerTurns(),
                aiTurns: GameVsAiStore.getAiTurns(),
                isStarted:GameVsAiStore.isStarted(),
                who:GameVsAiStore.whoPlayer()
            });
        })
    }
    componentWillUnmount(){
        GameVsAiStore.removeChangeListener(function () {
          SingleGameActions.resetGame();
        });
    }
    handleClick(row, col) {
        SingleGameActions.playerTurn(row, col)
    }
    start(who){
        SingleGameActions.startGame(who)
    }
    reset(){
        SingleGameActions.resetGame();
    }
    render() {

        return (
            <div className="container">
                <div  className={"promo "+this.state.isStarted}>
                   <p className='promo-ask'>Выберете за кого хотите играть</p>
                    <div className="btns">
                        <button onClick={this.start.bind(this,'cross')} className='btn btn-primary btn-large'>Крестики</button>
                        <button onClick={this.start.bind(this,'zero')} className='btn btn-warning btn-large'>Нолики</button>
                    </div>
                </div>

                <div className='promo-exit'>
                    <button onClick={this.reset} className='btn btn-primary'>Начать заново</button>
                    <Link to='/'> <button className='btn btn-default'>Главное меню</button></Link>
                </div>
                <GameField
                    player={this.state.who}
                    started={this.state.isStarted}
                    player1={this.state.playerTurns}
                    player2={this.state.aiTurns}
                    cb={this.handleClick}/>
            </div>
        )
    }
}

export default AiGame;