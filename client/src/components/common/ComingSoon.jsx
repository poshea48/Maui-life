import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ComingSoon extends Component {
  render () {
    return (
      <div className="d-flex flex-column justify-content-center">
        <h1 className="align-self-center">Coming Soon</h1>
        <Link className="nav-link align-self-center" to="/home">Home</Link>
      </div>
    )
  }
}

export default ComingSoon;
