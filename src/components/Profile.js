import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

export default function Profile() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     uid: '123',
  //     username: 'test',
  //     email: 'test@fake.com',
  //     name: 'test name',
  //     fav_rec: [1, 2, 3],
  //     fav_food: ['apple', 'orange', 'lemon']
  //   }
  // }

  const [uid, setUid] = useState('123');
  const [username, setUsername] = useState('test');
  const [email, setEmail] = useState('test@fakeemail.com');
  const [name, setName] = useState('test name');
  const [fav_rec, setFav_rec] = useState([1,2,3]);
  const [fav_food, setFav_food] = useState(['apple','orange','lemon']);



    return (
      <div>
        <Navbar>
          <p className="title">Food2Recipe</p>
          <button type="button" class="btn-profile">Profile</button>
          <div className="logout">
            <button className="btn-logout" onClick={this.logout} >Logout</button>
          </div>
        </Navbar>

      </div>
    )

}