import React, {Component} from 'react';

class UserForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const profilePhoto = event.target.profilePhoto.value;
    this.props.onSubmitUser({name, profilePhoto});
  }
  render () {
    const {defaultName, defaultProfilePhoto} = this.props;
    const {handleSubmit} = this;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>name</label>
          <input
            type='text'
            name='name'
            defaultValue={defaultName} />
        </div>
        <div>
          <label>profile photo URL</label>
          <input
            type='text'
            name='profilePhoto'
            defaultValue={defaultProfilePhoto} />
        </div>
        <div>
          <button type='submit'>submit</button>
        </div>
      </form>
    );
  }
}

export default UserForm;
