import React from 'react';
import '../css/main.css';

export default class BasicModal extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }


  render(){
    return (
      <>
      <div id='landing-modal' className='modal fade'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3 className='modal-title'>{this.props.modalTitle}</h3>
              <button className='close' data-dismiss='modal'>&times;</button>
            </div>
            <div className='modal-body'>
              {this.props.children}
            </div>
            <div className='modal-footer'>
              <button className='btn btn-lg btn-success w-100'>{this.props.modalTitle}</button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
