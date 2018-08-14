import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
import withAuthentication from '../../components/Session/withAuthentication'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import {db} from '../../firebase/firebase'
import { Grid, Card, CardContent, Typography, CardActions, Button,} from "@material-ui/core";
const INITIAL_STATE = {
    player: {}
}

class EditUserView extends Component {
    constructor(props){
        super();
        this.state = Object.assign(INITIAL_STATE, {...props.match.params})
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    componentWillMount(){
        let vm = this;
        db.ref('players/' + this.state.userId).on('value', function(snapshot){
            vm.setState({player:snapshot.val()})
        })
    }

    increment = (field, prop) =>{
        db.ref().child('/players').child(this.state.userId).child(prop).update({[field]: (this.state.player[prop][field] + 1)})
    }

    decrement = (field, prop) => {
        if(this.state.player[prop][field] > 0) {
        db.ref().child('/players').child(this.state.userId).child(prop).update({[field]: (this.state.player[prop][field] - 1)})
    }}

    

    render() {
        return (
                <Grid container alignContent="center" justify="center" alignItems="center" >
                    <Grid item>
                    <Card>
                        <CardContent>
                            <Typography>
                                {this.state.player.firstName} {this.state.player.lastName}
                            </Typography>
                        </CardContent>
                        <Grid container>
                        <Grid item>
                                <Typography>League Stats</Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignContent='space-between'>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography>Wins: {this.state.player.leagueStats.wins}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={()=> this.decrement('wins', 'leagueStats')} color='secondary'><RemoveIcon/></Button>
                                        <Button onClick={() => this.increment('wins', 'leagueStats')}color='primary'><AddIcon/></Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography>Losses: {this.state.player.leagueStats.losses}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button color='secondary' onClick={() => this.decrement('losses', 'leagueStats')}><RemoveIcon/></Button>
                                    <Button color='primary' onClick={()=> this.increment('losses', 'leagueStats')}><AddIcon/></Button>
                                </CardActions>
                            </Card>
                            </Grid>
                        </Grid>
                        <Grid container>
                        <Grid item>
                                <Typography>Scrimmage Stats</Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignContent='space-between'>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography>Wins: {this.state.player.scrimStats.wins}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={()=> this.decrement('wins','scrimStats')} color='secondary'><RemoveIcon/></Button>
                                        <Button onClick={() => this.increment('wins', 'scrimStats')}color='primary'><AddIcon/></Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography>Losses: {this.state.player.scrimStats.losses}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button color='secondary' onClick={() => this.decrement('losses', 'scrimStats')}><RemoveIcon/></Button>
                                    <Button color='primary' onClick={()=> this.increment('losses', 'scrimStats')}><AddIcon/></Button>
                                </CardActions>
                            </Card>
                            </Grid>
                        </Grid>
                    </Card>
                    <br/>
                    {/* <Grid item>
                        <Card>
                            <CardContent>
                                Sun Steel
                            </CardContent>
                            <CardActions>
                                <Button>
                                    <EditIcon></EditIcon>
                                </Button>
                                <Button>
                                    <RemoveIcon></RemoveIcon>
                                </Button>
                            </CardActions>
                        </Card>
                        <Button color='primary' variant='contained'>
                            Create Deck
                        </Button>
                    </Grid> */}
                    
                    </Grid>
                </Grid>
        );
    }

    componentDidMount(){
        let vm = this;
        db.ref('players/' + this.state.userId).on('value', function (snapshot){
            vm.setState({player: snapshot.val()})
        })
      }}

export default withAuthentication(withRouter(EditUserView))