import React from 'react';
import { Link } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      email: "",
      password:""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.props.router.push('/dashboard'));
  }

  update(input_type) {
    return (
      event => this.setState({ [input_type]: event.target.value })
    );
  }



  render() {
    let formHeader;
    let formLink;
    let content;
    if(this.props.formType === 'login') {
      formHeader = 'Log In';
      content = (
        <fieldset className="login-form-fieldset">
          <h2>{formHeader}</h2>
          <form onSubmit= { this.handleSubmit }>
            <label>Username
              <input
                type="text"
                value= {this.state.username}
                placeholder="Type Username Here"
                onChange= {this.update('username')}
              />
            </label>
            <br/>

            <label>Password
              <input
                type="password"
                placeholder="Type Password Here"
                value={this.state.password}
                onChange={this.update('password')}
              />
            </label>

            <br/>
            <input type="submit" value={formHeader}></input>

          </form>

          <div className="form-errors">{this.props.errors} </div>
        </fieldset>

      );

    } else {
      formHeader = 'Sign Up For Split';
      content = (
        <fieldset className="login-form-fieldset">
          <form onSubmit= { this.handleSubmit } className="login-form">
            <label>
              <input
                type="text"
                value= {this.state.username}
                placeholder="Pick a username"
                onChange= {this.update('username')}
              />
            </label>
            <br/>

            <label>
              <input
                type="text"
                value={this.state.email}
                placeholder="Your email address"
                onChange= {this.update('email')}
              />
            </label>

            <br/>

            <label>
              <input
                type="password"
                placeholder="Create a password"
                value={this.state.password}
                onChange={this.update('password')}
              />
            </label>

            <br/>
            <input type="submit" className="homepage-signup" value={formHeader}></input>

          </form>

          <div className="form-errors">{this.props.errors}</div>
        </fieldset>

      );
    }


    return (
      <div>
        {content}
      </div>

    );
  }
}

export default SessionForm;
