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
      formLink = <Link to="/">Sign Up</Link>;

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

          <div className="errors">ERRORS: {this.props.errors} </div>

          {formLink}
        </fieldset>

      );

    } else {
      formHeader = 'Sign Up';
      formLink = <Link to="/login">Log In</Link>;
      content = (
        <fieldset className="login-form-fieldset">
          <form onSubmit= { this.handleSubmit } className="login-form">
            <label>Username
              <input
                type="text"
                value= {this.state.username}
                placeholder="Type Username Here"
                onChange= {this.update('username')}
              />
            </label>
            <br/>

            <label>Email
              <input
                type="text"
                value={this.state.email}
                placeholder="Type Email Here"
                onChange= {this.update('email')}
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

          <div className="errors">ERRORS: {this.props.errors} </div>

          {formLink}
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
