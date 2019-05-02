import React from 'react';
import '../css/main.css';
import '../css/main-dashboard.css';
import BasicModal from '../containers/basic-modal'
import ReactMapBoxGL, {Layer, Feature, Map} from 'react-mapbox-gl'
import mapboxGL from 'mapbox-gl';
import Axios from 'axios';

mapboxGL.accessToken = 'pk.eyJ1Ijoic3V6dWtpc3RldmVuIiwiYSI6ImNqdWpwcDhhYzFuczE0ZXAzamNkMWpvd2sifQ.PAW2yuz30KwTEL983iIN_g';

export default class MainDashboard extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      mapPoints: [],
      mapCenter: [10,10],
      zoom: 1,
      solarData: undefined,
      loadingSolarData: true,
    }

    this.onMapClick = this.onMapClick.bind(this)
  }

  componentDidMount() {
    this.setupMap()
  }

  setupMap() {
    const map = new mapboxGL.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: this.state.mapCenter,
      zoom: 2
    }).setMinZoom(2)
    
    const centerMarker = new mapboxGL.Marker({
      draggable: false
    }).setLngLat(this.state.mapCenter).addTo(map)

    map.on('move', () => {
      const { lat, lng } = map.getCenter();
      centerMarker.setLngLat([lng, lat])
      this.setState({
        mapCenter: [lat.toFixed(4), lng.toFixed(4)],
        zoom: map.getZoom().toFixed(2)
      })
    })

    map.on('movestart', () => {
      this.setState({loadingSolarData: true})
    })

    map.on('moveend', () => {
      this.updateSolarData()
    })

    map.on('zoomend', () => {
      this.updateSolarData()
    })

  }

  onMapClick(e) {
    this.setState({
      mapCenter: e.lnglat
    })
  }

  updateSolarData() {
    this.setState({loadingSolarData: true})
    const lat = this.state.mapCenter[0]
    const lng = this.state.mapCenter[1]

    Axios.get("http://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng)
    .then(result => {
      console.log(result)
      this.setState({ 
        solarData: result.data.results,
        loadingSolarData: false
      })
    })
  }

  render(){
    const Map = ReactMapBoxGL({accessToken:'pk.eyJ1Ijoic3V6dWtpc3RldmVuIiwiYSI6ImNqdWpwcDhhYzFuczE0ZXAzamNkMWpvd2sifQ.PAW2yuz30KwTEL983iIN_g'})
    const dateNow = new Date().toDateString()
    return (
      <>
      <div className='container-fluid d-flex flex-row justify-content-center align-items-center w-100 main-dashboard-container px-0'>
        <div className='col-3 px-0 py-0 mx-0 sidebar h-100'>
          <div className='container-fluid d-flex flex-row text-center py-3 sidebar-top-panel'>
            <div className='col'>
              <button className='btn btn-lg w-100 btn-danger'>Log Out</button>
            </div>
            <div className='col'>
              <button className='btn btn-lg w-100 btn-info'>Settings</button>
            </div>
          </div>
          <div>
            <h2 className='display-2 text-center py-3 my-0'>Saved Map Points</h2>
            <ul className='px-0 my-0 w-100'>
              <li className='map-point-li w-100 py-3 px-3 my-1'>Test Location 1</li>
              <li className='map-point-li w-100 py-3 px-3 my-1'>Test Location 2</li>
              <li className='map-point-li w-100 py-3 px-3 my-1'>Test Location 3</li>
              <li className='map-point-li w-100 py-3 px-3 my-1'>Test Location 4</li>
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

              <button className='btn btn-lg btn-warning my-5 py-3 w-50 save-mappoint-button'>Save MapPoint</button>
            </>
          :
            <>
              <h1 className='display-1 my-5 py-0 '>Pick a location and a date.</h1>
              <p className='lead my-3 py-0 '>Or select a map point from the list on the left, if you've saved any before.</p>
            </>
          }



          <div ref={e1 => this.mapContainer = e1} className='mapbox-embed my-5 w-75 h-50' />

        </div>
      </div>
      </>
    );
  }
}
