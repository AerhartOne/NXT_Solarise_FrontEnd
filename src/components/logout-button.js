import React from 'react'
import { Redirect } from 'react-router-dom'
import UserManagement from '../utils/user_management'

export default class LogoutButton extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            logoutTriggered: false,
            }
    }

    handleLogOut = (e) => {
        this.setState({logoutTriggered: true})
    }
    
    redirectElement = (e) => {
        if (this.state.logoutTriggered) {
            UserManagement.logoutUser()
            return <Redirect to='/' />
        }
    }

    render() {
        return(
            <>
            <button className='btn btn-lg w-100 btn-danger' onClick={this.handleLogOut}>Log Out</button>
            {this.redirectElement()}
            </>
        )
    }
    
}
