import React from 'react';
import '../css/main.css';
import '../css/main-dashboard.css';
import BasicModal from '../containers/basic-modal'
import ReactMapBoxGL, {Layer, Feature, Map} from 'react-mapbox-gl'
import mapboxGL from 'mapbox-gl';

mapboxGL.accessToken = 'pk.eyJ1Ijoic3V6dWtpc3RldmVuIiwiYSI6ImNqdWpwcDhhYzFuczE0ZXAzamNkMWpvd2sifQ.PAW2yuz30KwTEL983iIN_g';

export default class MainDashboard extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      mapPoints: [],
      mapCenter: [0,0],
      zoom: 1
    }

    this.onMapClick = this.onMapClick.bind(this)
  }

  componentDidMount() {
    this.setupMap()
  }

  setupMap() {
    const map = new mapboxGL.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: this.state.mapCenter
    })

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

  }

  onMapClick(e) {
    this.setState({
      mapCenter: e.lnglat
    })
  }

  render(){
    const Map = ReactMapBoxGL({accessToken:'pk.eyJ1Ijoic3V6dWtpc3RldmVuIiwiYSI6ImNqdWpwcDhhYzFuczE0ZXAzamNkMWpvd2sifQ.PAW2yuz30KwTEL983iIN_g'})
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
          <h1 className='display-1 my-5 py-0 '>Pick a location.</h1>
          <p> Latitude: {this.state.mapCenter[0]} </p>
          <p> Longitude: {this.state.mapCenter[1]} </p>

          <button className='btn btn-lg btn-warning my-5 py-3 w-50 save-mappoint-button'>Save MapPoint</button>

          <div ref={e1 => this.mapContainer = e1} className='mapbox-embed my-5 w-75 h-50' />

          {/* <Map style="mapbox://styles/mapbox/streets-v11" containerStyle={{width: "75%", height: "60vh"}} center={this.state.mapCenter} className='mapbox-embed my-5'>
            <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
              <Feature coordinates={this.state.mapCenter}/>
            </Layer>
          </Map> */}

        </div>
      </div>
      </>
    );
  }
}
