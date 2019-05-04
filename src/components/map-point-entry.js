import React from 'react';
import '../css/map-point-entry.css';
import Axios from 'axios';
import URLManagement from '../utils/url_management'

export default class MapPointEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pointData: this.props.pointData
        }
    }

    handleClick = (e) => {
        this.props.onEntryClick(this)
    }

    handleDelete = (e) => {
        let formData = new FormData()
        formData.append('map_point_id', this.state.pointData.id)
        Axios.post(URLManagement.baseAPIDomain + "/map_points/delete", formData, {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }})
        .then( result => {
            console.log(result)
            this.props.updateMapPointsCallback()
        })
    }

    render() {
        return (
            <>
            <li className='w-100 my-1'>
            <div className='container-fluid mx-0 px-0 d-flex flex-row'>
                <div onClick={this.handleClick} className='col-11 mx-0 px-0'>
                    <button className='map-point-entry h-100 px-3'>{this.state.pointData.point_name} : {this.state.pointData.latitude}, {this.state.pointData.longitude} : {this.state.pointData.date}</button>
                </div>
                {/* <div className='col-1 mx-0 px-0'>
                    <button className='btn btn-sm btn-info w-100'>Edit</button>
                </div> */}
                <div onClick={this.handleDelete} className='col-1 mx-0 px-0'>
                    <button className='btn btn-sm btn-danger w-100 h-100 px-3'>&times;</button>
                </div>
            </div>
            </li>
            </>
        )
    }
}
