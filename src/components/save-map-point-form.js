import React from 'react';

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
        formData.append('point_name', pointName)
        formData.append('latitude', this.state.latitude)
        formData.append('longitude', this.state.longitude)
        formData.append('date', this.state.selectedDate)
        Axios.post("http://localhost:5000/api/map_points/new", formData, {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }})
        .then(result => {
          this.getMapPointData()
        })
      }

    render() {
        return(
            <form className='form-group w-100'>
            <div className='modal-body'>
              <div className='container-fluid mx-0 my-0 px-3 py-0'>
                <input className='input-group-text w-100 my-3' type='text' autoComplete='username' id='input-point-name' onBlur={this.onDataChanged} placeholder='Point Name' />
                <input className='input-group-text w-100 my-3' type='password' autoComplete='current-password' id='input-password' onBlur={this.onDataChanged} placeholder='Password' />
              </div>
              <div className='modal-footer'>
                <button className='btn btn-lg btn-success w-100' onClick={this.handleMapPointSave}>Save Map Point</button>
              </div>
            </div>
            </form>
        )
    }



}