import React from 'react'
import { Link } from 'react-router-dom';

const ProfileActions = (props) => {
  return (
    // <div className="Action-group" role="group">
    //   <div className="container">
        <div className="d-flex flex-row flex-wrap justify-content-center" >
            <Link to="/home/todos" className="col-2 btn btn-sm btn-primary mr-1 mb-1">
              <i className="fas fa-clipboard-check text-dark mr-1"></i>
              <span className="d-none d-sm-inline">Todos</span>
            </Link>
            <Link to="/home/hikes" className="col-2 btn btn-sm btn-primary mr-1 mb-1">
              <i className="fas fa-hiking text-dark mr-1"></i>
              <span className="d-none d-sm-inline">Hikes</span>
            </Link>
            <Link to="/photos" className="col-2 btn btn-sm btn-primary mr-1 mb-1">
              <i className="fas fa-camera text-dark mr-1"></i>
              <span className="d-none d-sm-inline">Photos</span>
            </Link>
            <Link to="/home/posts" className="col-2 btn btn-sm btn-primary mr-1 mb-1">
              <i className="fas fa-thumbtack text-dark mr-1"></i>
              <span className="d-none d-sm-inline">Posts</span>
            </Link>

            <Link to="/locations" className="col-2 btn btn-sm btn-primary mr-1 mb-1">
              <i className="fas fa-map-marked-alt text-dark mr-1 mb-1"></i>
              <span className="d-none d-sm-inline">Map</span>
            </Link>
        </div>
    //   </div>
    // </div>
  )
}

export default ProfileActions
