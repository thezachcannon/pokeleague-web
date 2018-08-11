import React, {Component} from 'react';
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
                }
            </div>
        )
    }
}

export default Coin