import React from 'react';
import '../css/main.css';
import '../css/landing-page.css';
import UserDetailsForm from '../components/user-details-form'
import UserLoginForm from '../components/user-login-form'
import BasicModal from '../containers/basic-modal'

export default class LandingPage extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      modalTitle: 'Sign In',
      formType: <UserDetailsForm />
    }

    this.onSignInButtonClicked = this.onSignInButtonClicked.bind(this)
    this.onSignUpButtonClicked = this.onSignUpButtonClicked.bind(this)
  }

  onSignInButtonClicked(e) {
    this.setState({
      modalTitle: 'Sign In',
      formType: <UserLoginForm />
    })
  }

  onSignUpButtonClicked(e) {
    this.setState({
      modalTitle: 'Sign Up',
      formType: <UserDetailsForm />
    })
  }

  render(){
    return (
      <>
      <div className='container-fluid w-100 landing-page-container'>
        <div className='row d-flex flex-column align-items-center justify-content-center h-100 w-100 text-center'>
          <h1 className='display-1 my-5 py-0'>Welcome to Solarise.</h1>
          <h2 className='display-2 my-5 py-0'>Be ready for sunrise and sunset, no matter where you are.</h2>
          <div className='container w-100 py-0 my-0'>
            <div className='row'>
              <div className='col'>
                <button data-toggle='modal' data-target='#landing-modal' onClick={this.onSignInButtonClicked} className='btn btn-lg btn-success main-button mx-3 my-5 py-3 w-100' >Sign in</button>
              </div>
              <div className='col'>
                <button href='#' data-toggle='modal' data-target='#landing-modal' onClick={this.onSignUpButtonClicked} className='btn btn-lg btn-danger main-button mx-3 my-5 py-3 w-100'>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BasicModal modalTitle={this.state.modalTitle}>
        {this.state.formType}
      </BasicModal>

      </>
    );
  }
}
