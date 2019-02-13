import React, { Component } from 'react'

class HikeItem extends Component {
  render () {
    const { hike } = this.props
    return (
      <div className="card mb-2">
        <div className="card-body">
          <h4 className="card-title text-center text-info">{hike.name}</h4>
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
