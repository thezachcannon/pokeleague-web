import React, {Component} from 'react'
import {Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import withAuthentication from '../components/Session/withAuthentication';
import {db} from '../firebase/firebase'
const INITIAL_STATE = {
    lodaing: true,
    playerAccounts: []
}
class AdminView extends Component {
    constructor () {
        super()
        this.state = INITIAL_STATE
    }
    componentDidMount() {
        this.readPlayerData();
    }

    readPlayerData () {
        let vm = this;
        this.setState({loading: true})
        db.ref('players/').on('value', function (snapshot) {
          vm.setState({playerAccounts: snapshot.val(), loading: false})
            
        })
    }
    render(){
        return (
            <div>
            {!this.state.loading &&
            <div style={{"height": "100vh", "display": "flex"}}>
                
    <Grid container alignContent="center" justify="center" alignItems="center">
                <Grid item>
                   <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Wins</TableCell>
                                <TableCell>Losses</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.playerAccounts.sort(this.sortByWinPercentage).map((row,index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {row.firstName} {row.lastName}
                                        </TableCell>
                                        <TableCell>
                                            {row.wins}
                                        </TableCell>
                                        <TableCell>
                                            {row.losses}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    </Paper>
                </Grid>
                </Grid>
            </div>
            }
        </div>
        )
    }
}

export default withAuthentication(AdminView)