import React, { Component } from 'react'

class CommentEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      return this.setState({ errors: this.props.errors })
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.updateComment(this.props.postId, {text : this.state.text})
    this.setState({ text: '', errors: {}})
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const errors = {}
    return (
      <div style={{display: 'none'}} >
        <form onSubmit={this.onSubmit}>
          <input
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            error={errors.text}
            className="comment-input pl-2 text-muted rounded-left"
            placeholder="Add a comment"
          />
          <div className="col-4 col-sm-2 p-0">
            <button type="submit" style={{width: "100%", height: "30px"}} className=" pt-0 pb-0 btn-br-0 btn-info rounded-right">Submit</button>
          </div>
        </form>
      </div>

    )
  }
}

export default CommentEditForm;
