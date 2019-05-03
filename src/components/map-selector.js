import React from 'react';
import ReactMapBoxGL, {Feature} from 'react-mapbox-gl';
import mapboxGL from 'mapbox-gl';

mapboxGL.accessToken = 'pk.eyJ1Ijoic3V6dWtpc3RldmVuIiwiYSI6ImNqdWpwcDhhYzFuczE0ZXAzamNkMWpvd2sifQ.PAW2yuz30KwTEL983iIN_g';

export default class MapSelector extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      mapCenter: this.props.latlng,
      zoom: 2,
      isMoving: false,
      solarData: undefined
    }

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

      this.props.onMapMove(this)
    })

    map.on('movestart', () => {   
      this.props.onMapMoveStart(this)
    })

    map.on('moveend', () => {
      this.props.onMapMoveEnd(this)
    })

    map.on('zoomstart', () => {
      this.props.onMapMoveStart(this)
    })

    map.on('zoomend', () => {
      this.props.onMapMoveEnd(this)
    })

  }

  render() {
    const Map = ReactMapBoxGL({accessToken:'pk.eyJ1Ijoic3V6dWtpc3RldmVuIiwiYSI6ImNqdWpwcDhhYzFuczE0ZXAzamNkMWpvd2sifQ.PAW2yuz30KwTEL983iIN_g'});
    return (
      <div ref={e1 => this.mapContainer = e1} className='mapbox-embed my-5 w-75 h-50' />
    );
  }
}