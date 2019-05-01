import React from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';
import '../css/landing-page.css';
import UserDetailsForm from '../components/user-details-form'
import UserLoginForm from '../components/user-login-form'
import BasicModal from '../containers/basic-modal'

import MainDashboard from '../pages/main-dashboard'

export default class LandingPage extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      modalCaption: 'Sign In',
      formType: <UserDetailsForm />
    }

    this.onSignInButtonClicked = this.onSignInButtonClicked.bind(this)
    this.onSignUpButtonClicked = this.onSignUpButtonClicked.bind(this)
  }

  onSignInButtonClicked(e) {
    this.setState({
      modalCaption: 'Sign In',
      formType: <UserLoginForm />
    })
  }

  onSignUpButtonClicked(e) {
    this.setState({
      modalCaption: 'Sign Up',
      formType: <UserDetailsForm />
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
                <button data-toggle='modal' data-target='#landing-modal' onClick={this.onSignInButtonClicked} className='btn btn-lg btn-success main-button mx-3 my-5 py-3 w-100' >Sign in</button>
              </div>
              <div className='col d-flex justify-content-center align-items-center'>
                <button href='#' data-toggle='modal' data-target='#landing-modal' onClick={this.onSignUpButtonClicked} className='btn btn-lg btn-danger main-button mx-3 my-5 py-3 w-100'>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BasicModal modalTitle={this.state.modalCaption} modalButtonText={this.state.modalCaption}>
        <div className='modal-body'>
          {this.state.formType}
        </div>
        <div className='modal-footer'>
          <Link to='/dashboard' className='w-100 px-3 py-3'><button className='btn btn-lg btn-success w-100'>{this.state.modalCaption}</button></Link>
        </div>
      </BasicModal>
      </>
    );
  }
}
