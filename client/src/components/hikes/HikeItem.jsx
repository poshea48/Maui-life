import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HikeItem extends Component {
  render () {
    const { hike } = this.props
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{hike.name}</h4>
          {/* <Location location={hike.location} */}
          <p>Rating: {hike.rating}</p>
          {hike.distance && (<p>Distance: { hike.distance }</p>)}
          {hike.comments && (<p>Comments: { hike.comments }</p>)}
        </div>
      </div>
    )
  }
}

export default HikeItem;
