import React, {Component} from 'react'
import { Grid, FormControl, FormGroup, TextField, Button, Paper } from '@material-ui/core';
import {auth} from '../firebase/firebase'
import {withRouter} from 'react-router-dom'

const INITIAL_STATE = {
    username: '',
    password: '',
    error: '',
}
const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class LoginView extends Component {
    constructor(props){
        super(props)
        this.state = INITIAL_STATE
        this.submitLogin = this.submitLogin.bind(this);
    }
    submitLogin () {
        let vm = this;
        vm.setState(updateByPropertyName('error', ''))
     auth.signInWithEmailAndPassword(vm.state.username, vm.state.password).then(function (){
         vm.props.history.push('/')
    }).catch(function (error){
         vm.setState(updateByPropertyName('error', error))
     })
     
    }
    render() {
        return (
            <div>
                <Grid style={{width: '100vw'}}container alignContent="center" justify="center" alignItems="center">
                <Grid item>
                    <Paper style={{padding: '10px'}}>
                    <FormControl>
                            <FormGroup>
                                <TextField label="Username" id='username' onChange={event => this.setState(updateByPropertyName('username', event.target.value))}>

                                </TextField>
                                <TextField label="Password" id='password' type="password" onChange={event => this.setState(updateByPropertyName('password', event.target.value))}>

                                </TextField>
                                <br/>
                                <Button variant='contained' color='secondary' onClick={this.submitLogin}>
                                    Login
                                </Button>
                            </FormGroup>
                        </FormControl>
                        {this.state.error && <p>{this.state.error.message}</p>}
                    </Paper>
                </Grid>
            </Grid>
            </div>
        )
    }}

export default withRouter(LoginView)