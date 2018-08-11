import React, { Component } from 'react';
import { Grid, Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import {db} from '../firebase/firebase'
class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
          playerData: [],
          loading: true
      }
  }

  componentDidMount() {
      this.readPlayerData();
  }

  readPlayerData () {
      let vm = this;
      this.setState({loading: true})
      db.ref('players/').on('value', function (snapshot) {
        vm.setState({playerData: snapshot.val(), loading: false})
          
      })
  }

  sortByWinPercentage = (a,b) => {
      if(a.wins/a.losses === b.wins/b.losses) {
          return (a.id - b.id)
      }
      return (b.wins/b.losses) - (a.wins/a.losses) 
  }

  render() {
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
                                {this.state.playerData.sort(this.sortByWinPercentage).map((row,index) => {
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
    );
  }
}

export default Home;