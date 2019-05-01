import React from 'react';
import '../css/main.css';

export default class UserDetailsForm extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }

    this.onDataChanged = this.onDataChanged.bind(this)
  }

  onDataChanged(e) {
    this.setState({
      username: document.querySelector('#input-username').value,
      email: document.querySelector('#input-email').value,
      password: document.querySelector('#input-password').value,
      firstName: document.querySelector('#input-first-name').value,
      lastName: document.querySelector('#input-last-name').value
    })
  }

  render(){
    return (
      <>
      <div className='container-fluid mx-0 my-0 px-3 py-0'>
        <form className='form-group w-100'>
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
        </form>
      </div>
      </>
    );
  }
}
