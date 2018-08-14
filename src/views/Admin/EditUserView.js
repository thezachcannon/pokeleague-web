import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
import withAuthentication from '../../components/Session/withAuthentication'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import EditIcon from '@material-ui/icons/Edit'
import {db} from '../../firebase/firebase'
import { Grid, Card, CardMedia, Paper, TableBody,CardContent, Typography, CardActions, Button, Table, TableHead, TableRow, TableCell, CardHeader } from "@material-ui/core";
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

    increment = field =>{
        db.ref().child('/players').child(this.state.userId).update({[field]: (this.state.player[field] + 1)})
    }

    decrement = field => {
        if(this.state.player[field] > 0) {
        db.ref().child('/players').child(this.state.userId).update({[field]: (this.state.player[field] - 1)})
    }}

    

    render() {
        return (
            <div style={{height: '100vh', display: 'flex'}}>
                <Grid container alignContent="center" justify="center" alignItems="center" >
                    <Grid item>
                    <Card>
                        <CardContent>
                            <Typography>
                                {this.state.player.firstName} {this.state.player.lastName}
                            </Typography>
                        </CardContent>
                        <Grid container alignContent='space-between'>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography>Wins: {this.state.player.wins}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={()=> this.decrement('wins')} color='secondary'><RemoveIcon/></Button>
                                        <Button onClick={() => this.increment('wins')}color='primary'><AddIcon/></Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography>Losses: {this.state.player.losses}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button color='secondary' onClick={() => this.decrement('losses')}><RemoveIcon/></Button>
                                    <Button color='primary' onClick={()=> this.increment('losses')}><AddIcon/></Button>
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
            </div>
        );
    }

    componentDidMount(){
        let vm = this;
        db.ref('players/' + this.state.userId).on('value', function (snapshot){
            vm.setState({player: snapshot.val()})
        })
      }}

export default withAuthentication(withRouter(EditUserView))