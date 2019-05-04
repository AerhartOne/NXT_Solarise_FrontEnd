import React from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';
import '../css/landing-page.css';
import SignUpModalForm from '../components/user-signup-modalform'
import UserLoginModalForm from '../components/user-login-modalform'
import BasicModal from '../containers/basic-modal'
import Axios from 'axios';

export default class LandingPage extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      modalCaption: 'Sign In',
      formType: <SignUpModalForm onSubmit={this.submitLoginData} />
    }

    this.onSignInButtonClicked = this.onSignInButtonClicked.bind(this)
    this.onSignUpButtonClicked = this.onSignUpButtonClicked.bind(this)
  }

  onSignInButtonClicked(e) {
    this.setState({
      modalCaption: 'Sign In',
      formType: <UserLoginModalForm onSubmit={this.submitLoginData} />
    })
  }

  onSignUpButtonClicked(e) {
    this.setState({
      modalCaption: 'Sign Up',
      formType: <SignUpModalForm />
    })
  }

  render(){
    return (
      <>
      <div className='container-fluid d-flex flex-column justify-content-center align-items-center w-100 landing-page-container'>
        <div className='row d-flex flex-column align-items-center justify-content-center h-100 w-100 text-center'>
          <h1 className='display-1 my-5 py-0'>Welcome to Solarise.</h1>
          <h2 className='display-2 my-5 py-0'>Be ready for sunrise and sunset, no matter where you are.</h2>
          <div className='container w-100 py-0 my-0 d-flex justify-content-center align-items-center'>
            <div className='row d-flex justify-content-center align-items-center w-100'>
              <div className='col d-flex justify-content-center align-items-center'>
                <button data-toggle='modal' data-target='#modal-basic' onClick={this.onSignInButtonClicked} className='btn btn-lg btn-success main-button mx-3 my-5 py-3 w-100' >Sign in</button>
              </div>
              <div className='col d-flex justify-content-center align-items-center'>
                <button href='#' data-toggle='modal' data-target='#modal-basic' onClick={this.onSignUpButtonClicked} className='btn btn-lg btn-danger main-button mx-3 my-5 py-3 w-100'>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BasicModal id='user-modal' modalTitle={this.state.modalCaption}>
          {this.state.formType}
      </BasicModal>
      </>
    );
  }
}
