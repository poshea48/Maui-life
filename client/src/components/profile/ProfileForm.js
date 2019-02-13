import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { saveProfile, getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import { clearErrors } from '../../actions/clearErrorAction'


class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      username: '',
      location: '',
      bio: '',
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      errors: {},
      // action: this.props.match.params.action
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.erros !== prevState.errors) {
      return ({ errors: nextProps.errors })
    }

    if (nextProps.profile.profile !== prevState) {
      return ({ profile: nextProps.profile })
    }
    return null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      return ({ errors: this.props.errors })
    }

    if (prevProps.profile.profile !== this.props.profile.profile) {
      const { profile } = this.props.profile
      const { social } = profile
      this.setState(prevState => ({
        ...prevState,
        ...profile,
        ...social
      }))
    }
  }

  onChange = e => {
    return this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();
    const profile = {...this.state}
    this.props.saveProfile(profile, this.props.history)
  }

  openSocialMediaField = (e) => {
    e.preventDefault();
    this.setState(prevState => {
      return {displaySocialInputs: !prevState.displaySocialInputs}
    })
  }

  deleteAccount = (e) => {
    e.preventDefault();
    this.props.deleteAccount()
  }

  render () {
    const {errors, displaySocialInputs } = this.state
    console.log(this.props)
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = ['Twitter', 'Facebook', 'Linkedin', 'Youtube', 'Instagram'].map((social, i) => (
        <div key={i} >
          <InputGroup
            placeholder={`${social} Profile URL`}
            name={social.toLowerCase()}
            icon={`fab fa-${social.toLowerCase()}`}
            value={this.state[social.toLowerCase()]}
            onChange={this.onChange}
            error={errors[social.toLowerCase()]}
          />
        </div>
      ))
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">{this.state.action === 'create' ? "Create" : "Edit"} Your Profile</h1>

              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                  info="A unique username for your profile URL."
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Where do you reside?"
                />

                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Talk about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={this.openSocialMediaField}
                    className="btn btn-light">
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
              <button onClick={this.deleteAccount} className="btn btn-block mt-4 btn-danger">Delete My Account</button>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileForm.propTypes = {
  saveProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { saveProfile, getCurrentProfile, clearErrors, deleteAccount })(ProfileForm);
