import React from 'react';
import Axios from 'axios';
import URLManagement from '../utils/url_management';


export default class SaveMapPointForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            pointName: '',
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            selectedDate: this.props.date
        }
    }

    handleMapPointSave = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('point_name', this.state.pointName)
        formData.append('latitude', this.props.latitude)
        formData.append('longitude', this.props.longitude)
        formData.append('date', this.props.date)
        Axios.post(URLManagement.baseAPIDomain + "/map_points/new", formData, {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }})
        .then(result => {
            document.querySelector('#input-point-name').value = ''
            this.props.dataRefresh()
        })
      }

      onDataChanged = (e) => {
          this.setState({
              pointName: e.target.value
          })
      }

    render() {
        return(
            <form className='form-group w-100'>
            <div className='modal-body'>
              <div className='container-fluid mx-0 my-0 px-3 py-0'>
                <input className='input-group-text w-100 my-3' type='text' id='input-point-name' onChange={this.onDataChanged} placeholder='Point Name' />
              </div>
              <div className='modal-footer'>
                <button type='submit' className='btn btn-lg btn-success w-100' data-dismiss='modal' onClick={this.handleMapPointSave} >Save Map Point</button>
              </div>
            </div>
            </form>
        )
    }



}