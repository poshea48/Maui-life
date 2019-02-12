import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
import { getHikes } from '../../actions/hikeActions'
import AddHike from './AddHike';
import HikeItem from './HikeItem';
import Scroll from '../common/Scroll'

class HikesHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hikes: []
    }
  }
  componentDidMount() {
    this.props.getHikes();
  }
  
  render () {
    const { hikes, loading } = this.props.hikes
    let hikesContent;

    if ( hikes === null || loading) {
      hikesContent = <Spinner />
    } else {
      // Check if logged in user has any todos
      if (isEmpty(hikes)) {
        // User logged in with no todos
        hikesContent = <p>No hikes recorded yet</p>
      } else {
        hikesContent = (
          <div className="hikes-content">
            <Scroll>
              <ul className="list-unstyled">
                {hikes.map((hike, i) => {
                  return (
                    <li className="hikes-content" key={i}>
                      <HikeItem hike={hike} />
                    </li>
                  )
                })}
              </ul>
            </Scroll>
          </div>
        )
      }
    }
    return (
      <div className="hikes">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3 className="display-5 ">Your Hikes!</h3>
              {hikesContent}
            </div>
            <div className="col-md-6">
              <AddHike />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HikesHome.propTypes = {
  getHikes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  hikes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  hikes: state.hikes,
  auth: state.auth
})

export default connect(mapStateToProps, { getHikes })(HikesHome);
