import React from 'react';
import '../css/main.css';
import '../css/main-dashboard.css';
import MapSelector from '../components/map-selector';
import LogoutButton from '../components/logout-button';
import MapPointEntry from '../components/map-point-entry';
import Axios from 'axios';

export default class MainDashboard extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      mapPoints: [],
      mapCenter: [10,10],
      zoom: 1,
      solarData: undefined,
      selectedDate: new Date().toDateString(),
      loadingSolarData: true,
      redirectToLanding: false,
    }

    this.handleMapMove = this.handleMapMove.bind(this)
    this.handleMapMoveEnd = this.handleMapMoveEnd.bind(this)
    this.handleMapMoveStart = this.handleMapMoveStart.bind(this)
    
  }

  componentDidMount() {
    this.getMapPointData()
  }

  getMapPointData() {
    Axios.get("http://localhost:5000/api/users/self/map_points", {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }})
    .then(result => {
      this.setState({mapPoints: result.data})
      console.log(result)
    })
  }

  handleMapMove(mapObject) {
    this.setState({
      loadingSolarData: true,
      mapCenter: mapObject.state.mapCenter 
    })
  }

  updateSolarData() {
    this.setState({loadingSolarData: true})
    const lat = this.state.mapCenter[0]
    const lng = this.state.mapCenter[1]

    Axios.get("http://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng)
    .then(result => {
      this.setState({ 
        solarData: result.data.results,
        loadingSolarData: false
      })
    })
  }

  handleMapMoveStart(mapObject) {
    this.updateSolarData()
  }

  handleMapMoveEnd(mapObject) {
    this.updateSolarData()
  }

  handleMapPointSave = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('point_name', "New Point 1")
    formData.append('latitude', this.state.mapCenter[0])
    formData.append('longitude', this.state.mapCenter[1])
    formData.append('date', this.state.selectedDate)
    Axios.post("http://localhost:5000/api/map_points/new", formData, {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }})
    .then(result => {
      this.getMapPointData()
    })
  }

  render(){
    const dateNow = new Date().toDateString()
    return (
      <>
      <div className='container-fluid d-flex flex-row justify-content-center align-items-center w-100 main-dashboard-container px-0'>
        <div className='col-3 px-0 py-0 mx-0 sidebar h-100'>
          <div className='container-fluid d-flex flex-row text-center py-3 sidebar-top-panel'>
            <div className='col'>
              <LogoutButton />
            </div>
            <div className='col'>
              <button className='btn btn-lg w-100 btn-info'>Settings</button>
            </div>
          </div>
          <div>
            <h2 className='display-2 text-center py-3 my-0'>Saved Map Points</h2>
            <ul className='px-0 my-0 w-100'>
              {this.state.mapPoints.map( mapPoint => { return (
                <MapPointEntry pointName={mapPoint.point_name} latitude={mapPoint.latitude} longitude={mapPoint.longitude} />
              )})
              }
            </ul>
          </div>
        </div>
        <div className='col-9 px-5 mx-0 h-100 d-flex flex-column justify-content-center align-items-center text-center'>
          { this.state.solarData !== undefined ?
            <>
              <h1 className='display-1 my-5 py-0 '>Solar data for {dateNow}.</h1>
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

              { this.state.loadingSolarData ?
                <button className='btn btn-lg btn-dark my-5 py-3 w-50 save-mappoint-button' disabled>Save MapPoint</button>
              :
                <button className='btn btn-lg btn-warning my-5 py-3 w-50 save-mappoint-button' onClick={this.handleMapPointSave} >Save MapPoint</button>
              }
            </>
          :
            <>
              <h1 className='display-1 my-5 py-0 '>Pick a location and a date.</h1>
              <p className='lead my-3 py-0 '>Or select a map point from the list on the left, if you've saved any before.</p>
            </>
          }

          
          <MapSelector id='map-selector' latlng={this.state.mapCenter} onMapMove={this.handleMapMove} onMapMoveEnd={this.handleMapMoveEnd} onMapMoveStart={this.handleMapMoveStart} solarDataListener={this}/>

        </div>
      </div>
      </>
    );
  }
}
