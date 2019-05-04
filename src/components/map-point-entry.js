import React from 'react';
import '../css/map-point-entry.css';

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

    render() {
        return (
            <button className='map-point-entry'><li onClick={this.handleClick} className='w-100 py-3 px-3 my-1'>{this.state.pointData.point_name} : {this.state.pointData.latitude}, {this.state.pointData.longitude} : {this.state.pointData.date}</li></button>
        )
    }
}
