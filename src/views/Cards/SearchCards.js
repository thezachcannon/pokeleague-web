import React from 'react';
import axios from 'axios';

import { Button, Grid, MenuItem, Select, TextField } from '@material-ui/core';


export default class SearchCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            deck: [],
            selectedSet: 'Select a Set',
            searchCardName: '',
            cardList: [],
            sets: []
        }
    }

    componentDidMount() {
        axios.get('https://api.pokemontcg.io/v1/sets')
            .then(response => {
                this.setState({ sets: response.data.sets })
            })
        axios.get(`https://api.pokemontcg.io/v1/cards?setCode=${this.state.selectedSet}&name=${this.state.searchCardName}`)
            .then(response => {
                this.setState({ cardList: response.data.cards })
            })
    }

    searchCards = (value) => {
        axios.get(`https://api.pokemontcg.io/v1/cards?name=${value}`)
            .then(response => {
                this.setState({ cardList: response.data.cards })
            })
    }

    searchSet = (value) => {
        axios.get(`https://api.pokemontcg.io/v1/cards?setCode=${value}`)
            .then(response => {
                this.setState({ cardList: response.data.cards })
            })
    }

    updateDeck = (card, action) => {
        var deck = this.state.deck;
        if (action) {
            if (deck.length > 59) {
                return;
            }
            deck.push(card);
            this.setState({ deck: deck });
        } else {
            deck.splice(deck.findIndex(it => {
                if (it === card) {
                    return it
                }
            }), 1)
            this.setState({ deck: deck })
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
                <Grid container alignContent="center" justify="center" alignItems="center">
                    <div style={{ textAlign: 'center', width: '100%' }}>Deck List</div>
                    <div style={{ textAlign: 'center', width: '100%', marginBottom: '20px' }}>{this.state.deck.length} / 60</div>
                    <div style={{ display: 'flex', flexWrap: 'nowrap', width: '80%', overflow: 'scroll' }}>
                        {this.state.deck.map(it => {
                            return <img onClick={() => this.updateDeck(it, false)} src={it.imageUrl} alt='card' key={it.id} />
                        })}
                    </div>
                    <div style={{ display: 'flex', marginBottom: '50px', alignItems: 'baseline', justifyContent: 'center', width: '100%' }}>
                        <div style={{ marginRight: '100px' }}>
                            <Select
                                id='setList'
                                value={this.state.selectedSet}
                                onChange={(event) => {
                                    this.setState({ selectedSet: event.target.value })
                                    this.searchSet(event.target.value)
                                }}
                            >
                                <MenuItem key='Select a Set' value='Select a Set'>Select a Set</MenuItem>
                                {this.state.sets.map(it => {
                                    return <MenuItem key={it.name} value={it.code}>{it.name}</MenuItem>
                                })}
                            </Select>
                        </div>
                        <div style={{ marginRight: '100px' }}>
                            <TextField
                                id="searchCard"
                                label="Search Card"
                                value={this.state.searchCardName}
                                onChange={(event) => {
                                    this.setState({ searchCardName: event.target.value })
                                    this.searchCards(event.target.value);
                                }}
                                margin="normal"
                            />
                        </div>
                    </div>
                    <div style={{ height: '500px' }}>
                        {this.state.cardList.map(it => {
                            return <img onClick={() => this.updateDeck(it, true)} src={it.imageUrl} alt='card' key={it.id} />
                        })}
                    </div>
                </Grid>
            </div>
        )
    }
}