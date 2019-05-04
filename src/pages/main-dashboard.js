import React from 'react';
import '../css/main.css';
import '../css/main-dashboard.css';
import MapSelector from '../components/map-selector';
import LogoutButton from '../components/logout-button';
import MapPointEntry from '../components/map-point-entry';
import BasicModal from '../containers/basic-modal';
import Axios from 'axios';
import EditUserDetailsModalForm from '../components/user-edit-modalform';
import SaveMapPointForm from '../components/save-map-point-form';
import URLManagement from '../utils/url_management';

export default class MainDashboard extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      mapPoints: [],
      mapCenter: [10,10],
      zoom: 1,
      solarData: undefined,
      selectedDate: new Date().toISOString().slice(0, 10),
      loadingSolarData: true,
      redirectToLanding: false,
      saveMapPointEnabled: true,
      basicModalContents: null,
      modalTitle: ''
    }
    
  }

  componentDidMount() {
    this.getMapPointData()
  }

  getMapPointData = () => {
    Axios.get(URLManagement.baseAPIDomain + "/users/self/map_points", {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }})
    .then(result => {
      this.setState({mapPoints: result.data})
      console.log(result)
    })
  }

  handleMapMove = (mapObject) => {
    this.setState({
      loadingSolarData: true,
      mapCenter: mapObject.state.mapCenter 
    })
  }

  updateSolarData = () => {
    this.setState({loadingSolarData: true})
    const lat = this.state.mapCenter[0]
    const lng = this.state.mapCenter[1]

    Axios.get("http://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&date=" + this.state.selectedDate)
    .then(result => {
      this.setState({ 
        solarData: result.data.results,
        loadingSolarData: false
      })
    })
  }

  handleMapMoveStart = (mapObject) => {
    this.updateSolarData()
  }

  handleMapMoveEnd = (mapObject) => {
    this.updateSolarData()
  }

  handleDateChange = (e) => {
    let canSave = false
    if (e.target.value !== '') {
      canSave = true
    }
    this.setState({
      selectedDate: e.target.value,
      saveMapPointEnabled: canSave
    })
    this.updateSolarData()

  }

  handleMapPointSave = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('point_name', "New Point 1")
    formData.append('latitude', this.state.mapCenter[0])
    formData.append('longitude', this.state.mapCenter[1])
    formData.append('date', this.state.selectedDate)
    Axios.post(URLManagement.baseAPIDomain + "/map_points/new", formData, {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }})
    .then(result => {
      this.getMapPointData()
    })
  }

  handleLoadMapPoint = (mapPointObject) => {
    this.setState( {
      mapCenter: [mapPointObject.state.pointData.longitude, mapPointObject.state.pointData.latitude],
      selectedDate: mapPointObject.state.pointData.date
    } )
    this.mapSelector.state.mapObject.flyTo({
      center: [mapPointObject.state.pointData.longitude, mapPointObject.state.pointData.latitude]
    })
    console.log(this.state)
    this.updateSolarData()
  }

  handleSettingsClick = (e) => {
    this.setState({
      basicModalContents: <EditUserDetailsModalForm />,
      modalTitle: 'Edit User Settings'
    })
  }

  handleSaveMapPointClick = (e) => {
    this.setState({
      basicModalContents: <SaveMapPointForm latitude={this.state.mapCenter[0]} longitude={this.state.mapCenter[1]} dataRefresh={this.getMapPointData} date={this.state.selectedDate} />,
      modalTitle: 'Save Map Point'
    })
  }

  render(){
    const formattedCurrentDate = new Date().toISOString().slice(0, 10)
    return (
      <>
      <div className='container-fluid d-flex flex-row justify-content-center align-items-center w-100 main-dashboard-container px-0'>
        <div className='col-3 px-0 py-0 mx-0 sidebar h-100'>
          <div className='container-fluid d-flex flex-row text-center py-3 sidebar-top-panel'>
            <div className='col'>
              <LogoutButton />
            </div>
            <div className='col'>
              <button className='btn btn-lg w-100 btn-info' data-toggle='modal' data-target='#modal-basic' onClick={this.handleSettingsClick}>Settings</button>
            </div>
          </div>
          <div>
            <h2 className='display-2 text-center py-3 my-0'>Saved Map Points</h2>
            <ul className='px-0 my-0 w-100'>
              {this.state.mapPoints.map( mapPoint => { return (
                <MapPointEntry key={mapPoint.id} pointData={mapPoint} updateMapPointsCallback={this.getMapPointData} onEntryClick={this.handleLoadMapPoint} />
              )})
              }
            </ul>
          </div>
        </div>
        <div className='col-9 px-5 mx-0 h-100 d-flex flex-column justify-content-center align-items-center text-center'>
          { this.state.solarData !== undefined ?
            <>
              <h1 className='display-1 my-5 py-0 '>Solar Data</h1>
              <div className='container w-100 display-3'>
                
                <div className='row'>
                  <div className='col'>
                    Latitude: {this.state.mapCenter[0]}
                  </div>
                  <div className='col'>
                    Longitude: {this.state.mapCenter[1]}
                  </div>
                </div>
                <div className='row'>
                { this.state.loadingSolarData ?
                  <>
                    <div className='col'>
                      Loading solar data...
                    </div>
                  </>
                :
                  <>
                    <div className='col'>
                      Sunrise: {this.state.solarData.sunrise} UTC
                    </div>
                    <div className='col'>
                      Sunset: {this.state.solarData.sunset} UTC
                    </div>
                  </>
                }
                </div>
              </div>

              { this.state.saveMapPointEnabled && !this.state.loadingSolarData ?
                <button className='btn btn-lg btn-warning my-5 py-3 w-50 save-mappoint-button' data-toggle='modal' data-target='#modal-basic' onClick={this.handleSaveMapPointClick} >Save MapPoint</button>
                :
                <button className='btn btn-lg btn-dark my-5 py-3 w-50 save-mappoint-button' disabled>Save MapPoint</button>
              }
            </>
          :
            <>
              <h1 className='display-1 my-5 py-0 '>Pick a location and a date.</h1>
              <p className='lead my-3 py-0 '>Or select a map point from the list on the left, if you've saved any before.</p>
            </>
          }

          <input type='date' className='form-control-lg w-50 my-3 text-center' onChange={this.handleDateChange} defaultValue={formattedCurrentDate} /> 
          <MapSelector ref={mapObject => this.mapSelector = mapObject} id='map-selector' latlng={this.state.mapCenter} onMapMove={this.handleMapMove} onMapMoveEnd={this.handleMapMoveEnd} onMapMoveStart={this.handleMapMoveStart} solarDataListener={this}/>

        </div>
      </div>

      <BasicModal id='user-modal' modalTitle={this.state.modalTitle}>
          {this.state.basicModalContents}
      </BasicModal>

      </>
    );
  }
}
