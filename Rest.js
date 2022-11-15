import {useEffect, useState} from "react";
import axios from "axios";

function RestExample() {
    const base = 'http://localhost:5000'
    const config = require('./config/keys')
    const url = 'http://localhost:5000/user/test'; //config.mongoURL
    const urlJSON = 'https://jsonplaceholder.typicode.com/users';
    const [login, setLogin] = useState([]);
    const urlUser = base + '/user'

  useEffect(() => {
    axios.get(url).then(res => {
      setLogin(res.data.login);
    })
  }, [])

  return (<div className="App">
    <h1>List of Logins</h1>
    <div>
      <ul>
        {login.map(c => <li key={c}>{c}</li>)}
      </ul>
    </div>
  </div>);
};

export default RestExample;