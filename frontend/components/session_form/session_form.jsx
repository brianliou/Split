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

  componentDidMount() {
    this.props.clearErrors();
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
    const loginErrors = this.props.errors.map((el, idx) => {
      return (
        <li key={`${idx}`}>{el}</li>
      );

    });
    if(this.props.formType === 'login') {
      formHeader = 'Login';
      content = (
        <div className="login-form-background">
          <fieldset className="login-form-page">
            <form onSubmit= { this.handleSubmit }>
              <label>
                <input
                  type="text"
                  value= {this.state.username}
                  placeholder="Username"
                  onChange= {this.update('username')}
                />
              </label>
              <br/>

              <label>
                <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.update('password')}
                />
              </label>

              <br/>
              <input type="submit" className="login-page-button" value={formHeader}></input>

              <div className="sign-up-login"><Link to="/">Sign Up</Link></div>

            </form>

            <ul className="form-errors">{loginErrors} </ul>
          </fieldset>
        </div>

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

          <ul className="form-errors">{loginErrors}</ul>
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
