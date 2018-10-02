import React, { Component } from 'react';
import { Grid, Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import {db} from '../firebase/firebase'
import {withRouter} from 'react-router-dom'
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
      if(a.leagueStats.wins/a.leagueStats.losses === b.leagueStats.wins/b.leagueStats.losses) {
          return (a.id - b.id)
      }
      return (b.leagueStats.wins/b.leagueStats.losses) - (a.leagueStats.wins/a.leagueStats.losses) 
  }

  render() {
    return (
            <div>
                {!this.state.loading &&                
                    <div style={{overflow: 'auto'}}>
                       <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>League Wins</TableCell>
                                    <TableCell>League Losses</TableCell>
                                    <TableCell>Scrimmage Wins</TableCell>
                                    <TableCell>Scrimmage Losses</TableCell>
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
                                            {row.leagueStats.wins} 
                                        </TableCell>
                                        <TableCell>
                                            {row.leagueStats.losses}    
                                        </TableCell>
                                        <TableCell>                                               
                                            {row.scrimStats.wins} 
                                        </TableCell>
                                        <TableCell>
                                            {row.scrimStats.losses}    
                                        </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        </Paper>
                        </div>
                }
            </div>
    );
  }
}

export default withRouter(Home);