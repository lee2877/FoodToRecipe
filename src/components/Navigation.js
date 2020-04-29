import React, { Component } from 'react';
import fire from '../config/Fire';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Title from '../Title.png'

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
            <img src={Title} alt="Food2Recipe" className="title"/>
          </Link>
          <Link to="/profile">
            <button className="btn-profile">Profile</button>
          </Link>
          <Link to ="/Ranking">
            <button className="btn-profile">Ranking</button>
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