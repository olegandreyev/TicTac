import React from 'react';

class GameField extends React.Component {
    render(){
        var rows =[];
        var p1Turns = this.props.player1;
        var p2Turns = this.props.player2;
        for(var i =0;i<3;i++){
            rows.push(
            <tr key={i}>
                {[0,1,2].map(v =>{
                    var cls = '';
                    if(p1Turns.some(arr => arr[0] == i && arr[1] == v)){
                        cls = this.props.player == 'zero'?'zero':'cross'
                    }
                    if(p2Turns.some(arr => arr[0] == i && arr[1] == v)){
                        cls = this.props.player == 'zero'?'cross':'zero'
                    }
                   return <td className={cls} onClick={this.props.cb.bind(this,i,v)} key={v}></td>
                })}
            </tr>)
        }
        if(this.props.started) {
            return (
                <table className='center'>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            )
        }else{
            return <span></span>
        }
    }
}

export default GameField;