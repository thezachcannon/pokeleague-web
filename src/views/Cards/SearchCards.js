import React from 'react';
import axios from 'axios';


import { MenuItem, Select, TextField } from '@material-ui/core';

export default class SearchCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            deck: [],
            supporterAmount: 0,
            itemAmount: 0,
            pokemonAmount: 0,
            energyAmount: 0,
            stadiumAmount: 0,
            gxexAmount: 0,
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
            this.addTypes(card);
            deck.push(card);
            this.setState({ deck: deck });
        } else {
            var index = deck.findIndex(it => it === card ? it : null)
            deck.splice(index, 1)
            this.removeTypes(card);
            this.setState({ deck: deck })
        }
    }

    addTypes = (card) => {
        if (card.subtype === 'Supporter') {
            this.setState({ supporterAmount: this.state.supporterAmount + 1 })
        } else if (card.subtype === 'Item' || card.subtype === 'Pokémon Tool') {
            this.setState({ itemAmount: this.state.itemAmount + 1 })
        } else if (card.supertype === 'Pokémon') {
            this.setState({ pokemonAmount: this.state.pokemonAmount + 1 })
        } else if (card.supertype === 'Energy') {
            this.setState({ energyAmount: this.state.energyAmount + 1 })
        } else if (card.subtype === 'Stadium') {
            this.setState({ stadiumAmount: this.state.stadiumAmount + 1 })
        } else if (card.subtype === 'GX' || card.subtype === 'EX') {
            this.setState({ gxexAmount: this.state.gxexAmount + 1 })
        }
    }

    removeTypes = (card) => {
        if (card.subtype === 'Supporter') {
            this.setState({ supporterAmount: this.state.supporterAmount - 1 })
        } else if (card.subtype === 'Item' || card.subtype === 'Pokémon Tool') {
            this.setState({ itemAmount: this.state.itemAmount - 1 })
        } else if (card.supertype === 'Pokémon') {
            this.setState({ pokemonAmount: this.state.pokemonAmount - 1 })
        } else if (card.supertype === 'Energy') {
            this.setState({ energyAmount: this.state.energyAmount - 1 })
        } else if (card.subtype === 'Stadium') {
            this.setState({ stadiumAmount: this.state.stadiumAmount - 1 })
        } else if (card.subtype === 'GX' || card.subtype === 'EX') {
            this.setState({ gxexAmount: this.state.gxexAmount - 1 })
        }
    }

    render() {

        const types = [
            { title: 'Pokemon', state: this.state.pokemonAmount },
            { title: 'Supporters', state: this.state.supporterAmount },
            { title: 'Items', state: this.state.itemAmount },
            { title: 'Energy', state: this.state.energyAmount },
            { title: 'Stadiums', state: this.state.stadiumAmount },
            { title: 'GX / EX', state: this.state.gxexAmount }
        ]

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', width: '100%', marginTop: '100px' }}>Deck List</div>
                <div style={{ textAlign: 'center', width: '100%', marginBottom: '20px' }}>{this.state.deck.length} / 60</div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', marginBottom: '20px' }}>
                    {types.map(it => {
                        return <div key={it.title}><div>{it.title}</div><div>{it.state}</div></div>
                    })}
                </div>
                <div style={{ display: 'flex', flexWrap: 'nowrap', width: '80%', overflow: 'scroll' }}>
                    {this.state.deck.map(it => {
                        return <img onClick={() => this.updateDeck(it, false)} src={it.imageUrl} alt='card' key={it.id} />
                    })}
                </div>
                <div style={{ display: 'flex', marginBottom: '50px', alignItems: 'baseline', justifyContent: 'center', width: '100%' }}>
                    <div >
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
                    <div style={{ marginLeft: '50px' }}>
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
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {this.state.cardList.map(it => (
                        <div key={it.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            <img style={{ height: '400px', width: '300px', opacity: it.id.substring(0, 2) === 'sm' ? '1' : '.5' }} onClick={() => this.updateDeck(it, true)} src={it.imageUrl} alt='card' />
                        </div>
                    )
                    )}
                </div>
            </div>
        )
    }
}