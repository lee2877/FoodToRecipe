import React, { Component } from 'react';
import fire from '../config/Fire';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div>
        <Navbar>
          <Link to="/">
            <p className="title">Food2Recipe</p>
          </Link>
          <Link to="/profile">
            <button className={"btn", "btn-profile"}>Profile</button>
          </Link>
          <div className="logout">
            <button className="btn-logout" onClick={this.logout} >Logout</button>
          </div>
        </Navbar>

      </div>
    )
  }
}
export default Navigation;