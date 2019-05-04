import React from 'react';
import '../css/main.css';
import Axios from 'axios';
import UserManagement from '../utils/user_management';
import { Redirect, withRouter } from 'react-router-dom';

export default class EditUserDetailsModalForm extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      editCompleted: false
    }
  }

  componentDidMount() {
    this.getUserData()
  }

  getUserData = () => {
    Axios.get("http://localhost:5000/api/users/self", {headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')}})
    .then(result => {
      console.log(result)
      this.setState({
        username: result.data.username,
        email: result.data.email,
        password: result.data.password,
        firstName: result.data.first_name,
        lastName: result.data.last_name
      })
      console.log(this.state)
      document.querySelector('#input-email').value = this.state.email
      document.querySelector('#input-first-name').value = this.state.firstName
      document.querySelector('#input-last-name').value = this.state.lastName
    })
  }

  onDataChanged = (e) => {
    this.setState({
      email: document.querySelector('#input-email').value,
      password: document.querySelector('#input-password').value,
      firstName: document.querySelector('#input-first-name').value,
      lastName: document.querySelector('#input-last-name').value
    })
  }

  submitNewUserData = (e) => {
    e.preventDefault()
    let data = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }
    UserManagement.editUser(data)
    .then( () => {
      this.setState({ editCompleted: true })
    })
    
  }

  render(){
    return (
      <>
      <form className='form-group w-100'>
      
        <div className='modal-body'>
          <div className='container-fluid mx-0 my-0 px-3 py-0'>
              <input className='input-group-text w-100 my-3' type='email' autoComplete='username' id='input-email' onBlur={this.onDataChanged} placeholder='Email'/>
              <input className='input-group-text w-100 my-3' type='password' autoComplete='new-password' id='input-password' onBlur={this.onDataChanged} placeholder='Password'/>
              <div className='container-fluid d-flex flex-row px-0 py-0 my-3'>
                <div className='col w-100 px-0 py-0'>
                  <input className='input-group-text w-100 my-0' type='text' id='input-first-name' onBlur={this.onDataChanged} placeholder='First Name'/>
                </div>
                <div className='col w-100 px-0 py-0'>
                  <input className='input-group-text w-100 my-0' type='text' id='input-last-name' onBlur={this.onDataChanged} placeholder='Last Name'/>
                </div>
              </div>
          </div>
        </div>

        <div className='modal-footer'>
          <button className='btn btn-lg btn-success w-100' data-dismiss='modal' onClick={this.submitNewUserData}>Save</button>
        </div>

      </form>
      </>
    );
  }
}
