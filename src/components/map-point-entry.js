import React from 'react';


export default class MapPointEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pointName: this.props.pointName,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            date: this.props.date
        }
    }

    handleClick = (e) => {
        this.props.onEntryClick(this)
    }

    render() {
        return (
            <li onClick={this.handleClick} className='map-point-li w-100 py-3 px-3 my-1'>{this.state.pointName} : {this.state.latitude}, {this.state.longitude} : {this.state.date}</li>
        )
    }
}
