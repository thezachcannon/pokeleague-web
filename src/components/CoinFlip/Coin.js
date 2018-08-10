import React, {Component} from 'react';
import pika_head from '../../assets/pika_head.png'
import eevee_tails from '../../assets/eevee_tails.png'

class Coin extends Component {
    constructor() {
        super()
        this.state = {
            heads: null
        }

        this.handleCoinClick = this.handleCoinClick.bind(this);
    }


    handleCoinClick () {
        let rtnVal;
        let x = (Math.floor(Math.random() * 2) == 0);
        if(x){
            rtnVal = true
        }else{
           rtnVal = false
        }
        this.setState({heads: rtnVal})
    }

    render() {
        return (
            <div onClick={this.handleCoinClick}>   
                {
                    this.state.heads ? <img style={{height: '48px', width: '48px'}} src={pika_head} /> : <img style={{height: '48px', width: '48px'}} src={eevee_tails} />
                }
            </div>
        )
    }
}

export default Coin