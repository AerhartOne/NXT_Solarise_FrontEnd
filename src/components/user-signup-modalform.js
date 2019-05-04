import React from 'react';
import '../css/main.css';
import Axios from 'axios';
import UserManagement from '../utils/user_management';
import { Redirect, withRouter } from 'react-router-dom';

export default class SignUpModalForm extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      signupCompleted: false
    }

    this.onDataChanged = this.onDataChanged.bind(this)
    this.submitSignUpData = this.submitSignUpData.bind(this)
  }

  onDataChanged = (e) => {
    this.setState({
      username: document.querySelector('#input-username').value,
      email: document.querySelector('#input-email').value,
      password: document.querySelector('#input-password').value,
      firstName: document.querySelector('#input-first-name').value,
      lastName: document.querySelector('#input-last-name').value
    })
  }

  submitSignUpData = (e) => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }
    UserManagement.signupUser(data)
    .then( () => {
      UserManagement.loginUser(data)
    })
    .then( ()  => {
      this.setState({ signupCompleted: true })
    })
  }

  render(){
    return (
      <>
      { this.state.signupCompleted ? 
        <Redirect push to='/dashboard' />
      :
        null
      }
      <form className='form-group w-100'>
      
        <div className='modal-body'>
          <div className='container-fluid mx-0 my-0 px-3 py-0'>
              <input className='input-group-text w-100 my-3' type='text' autoComplete='username' id='input-username' onBlur={this.onDataChanged} placeholder='Username' />
              <input className='input-group-text w-100 my-3' type='email' autoComplete='username' id='input-email' onBlur={this.onDataChanged} placeholder='Email' />
              <input className='input-group-text w-100 my-3' type='password' autoComplete='new-password' id='input-password' onBlur={this.onDataChanged} placeholder='Password' />
              <div className='container-fluid d-flex flex-row px-0 py-0 my-3'>
                <div className='col w-100 px-0 py-0'>
                  <input className='input-group-text w-100 my-0' type='text' id='input-first-name' onBlur={this.onDataChanged} placeholder='First Name' />
                </div>
                <div className='col w-100 px-0 py-0'>
                  <input className='input-group-text w-100 my-0' type='text' id='input-last-name' onBlur={this.onDataChanged} placeholder='Last Name' />
                </div>
              </div>
          </div>
        </div>

        <div className='modal-footer'>
          <button className='btn btn-lg btn-success w-100' onClick={this.submitSignUpData}>Sign Up</button>
        </div>

      </form>
      </>
    );
  }
}
