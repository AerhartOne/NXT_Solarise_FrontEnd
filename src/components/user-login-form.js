import React from 'react';
import '../css/main.css';

export default class UserLoginForm extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.onDataChanged = this.onDataChanged.bind(this)
  }

  onDataChanged(e) {
    this.setState({
      username: document.querySelector('#input-username').value,
      password: document.querySelector('#input-password').value
    })
  }

  render(){
    return (
      <>
      <div className='container-fluid mx-0 my-0 px-3 py-0'>
        <form className='form-group w-100'>
          <input className='input-group-text w-100 my-3' type='text' autoComplete='username' id='input-username' onBlur={this.onDataChanged} placeholder='Username' />
          <input className='input-group-text w-100 my-3' type='password' autoComplete='current-password' id='input-password' onBlur={this.onDataChanged} placeholder='Password' />
        </form>
      </div>
      </>
    );
  }
}
