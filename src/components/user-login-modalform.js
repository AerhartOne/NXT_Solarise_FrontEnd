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
    .catch(error => {
        console.log(error.response)
        alert(error.response.data.msg)
    })
  }

  render(){
    return (
      <>
        { this.state.loginCompleted ? 
          <Redirect push to='/dashboard' />
        :
          null
        }
        <form className='form-group w-100' onSubmit={this.submitLoginData}>
        <div className='modal-body'>
          <div className='container-fluid mx-0 my-0 px-3 py-0'>
            <input className='input-group-text w-100 my-3' type='text' autoComplete='username' id='input-username' onChange={this.onDataChanged} placeholder='Username' />
            <input className='input-group-text w-100 my-3' type='password' autoComplete='current-password' id='input-password' onChange={this.onDataChanged} placeholder='Password' />
          </div>
          <div className='modal-footer'>
            <button type='submit' className='btn btn-lg btn-success w-100'>Sign In</button>
          </div>
        </div>
        </form>
      </>
    );
  }
}

