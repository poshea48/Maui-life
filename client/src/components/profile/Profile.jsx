import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileHeader from "./ProfileHeader"
import Spinner from '../common/Spinner'
import { getProfileByUserId } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'

class Profile extends Component {
  componentDidMount() {
    this.props.getProfileByUserId(this.props.match.params.id)
  }
  render () {
    const { profile, loading } = this.props.profile
    console.log(this.props)
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div>
          {<ProfileHeader profile={profile}/>}
        </div>
      )
    }
    return (
      <div>
        {profileContent}
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, { getProfileByUserId })(Profile);
