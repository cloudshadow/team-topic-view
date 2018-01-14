import React, { PropTypes } from 'react';
import './login.scss';
import logo from '../../assets/images/cloudshadow-logo.png';

export default class LoginComponent extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      username:'',
      password:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleLogin() {
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 login-container">
            <img src={logo}/>
            <div className="form-group">
              <input id="username" type="text" className="form-control" value={this.state.username} onChange={this.handleChange} placeholder="username" required/>
              <input id="password" type="password" className="form-control" value={this.state.password} onChange={this.handleChange} placeholder="password" required/>
              <button className="form-control" onClick={this.handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  login: PropTypes.func.isRequired,
};