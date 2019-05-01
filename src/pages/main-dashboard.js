import React from 'react';
import '../css/main.css';
import '../css/main-dashboard.css';
import BasicModal from '../containers/basic-modal'

export default class MainDashboard extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      mapPoints: []
    }
  }

  render(){
    return (
      <>
      <div className='container-fluid d-flex flex-row justify-content-center align-items-center w-100 main-dashboard-container px-0'>
        <div className='col-3 px-0 py-5 mx-0 sidebar h-100'>
          <ul className='px-0 my-0 w-100'>
            <li className='map-point-li w-100 py-3 px-3 my-1'>Test Location 1</li>
            <li className='map-point-li w-100 py-3 px-3 my-1'>Test Location 2</li>
            <li className='map-point-li w-100 py-3 px-3 my-1'>Test Location 3</li>
            <li className='map-point-li w-100 py-3 px-3 my-1'>Test Location 4</li>
          </ul>
        </div>
        <div className='col-9 px-5 mx-0 h-100 d-flex flex-column justify-content-center align-items-center text-center'>
            <h1 className='display-1 my-5 py-0'>Pick a location.</h1>

            

            <button className='btn btn-lg btn-warning my-5 py-3 w-50 save-mappoint-button'>Save MapPoint</button>
            <div className='mapbox-embed w-75 h-50 text-center'> Mapbox goes here </div>
        </div>
      </div>
      </>
    );
  }
}
