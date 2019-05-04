import React from 'react';
import '../css/main.css';
import Axios from 'axios';
import UserManagement from '../utils/user_management'
import { Redirect } from 'react-router-dom'

export default class UserLoginModalForm extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loginCompleted: false
    }

  }

  onDataChanged = (e) => {
    this.setState({
      username: document.querySelector('#input-username').value,
      password: document.querySelector('#input-password').value
    })
  }

  submitLoginData = (e) => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    UserManagement.loginUser(data)
    .then(() => {
      this.setState({loginCompleted: true})
    })
  }

  render(){
    return (
      <>
        <form className='form-group w-100'>
        <div className='modal-body'>
          <div className='container-fluid mx-0 my-0 px-3 py-0'>
            <input className='input-group-text w-100 my-3' type='text' autoComplete='username' id='input-username' onBlur={this.onDataChanged} placeholder='Username' />
            <input className='input-group-text w-100 my-3' type='password' autoComplete='current-password' id='input-password' onBlur={this.onDataChanged} placeholder='Password' />
          </div>
          <div className='modal-footer'>
            <button className='btn btn-lg btn-success w-100' onClick={this.submitLoginData}>Sign In</button>
            { this.state.loginCompleted ? 
              <Redirect to='/dashboard' />
            :
              null
            }
          </div>
        </div>
        </form>
      </>
    );
  }
}

