import React from 'react';
import './App.css';
import axios from 'axios';
import Navagation from './Navagation';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Form from './Form'
import Patients from './Patients'
import Doctors from './Doctors';
import Schedule from './Schedule';
import Appointments from './Appointments';
import Home from './Home';
import Header from './Header';
// const databaseUrl = process.env.HEROKU_DB_URL || 'http://localhost:3000'
// const databaseUrl = 'https://scheduler-api-backend.herokuapp.com'

const databaseUrl = 'https://scheduler-api-backend.herokuapp.com'
//const databaseUrl = process.env.NODE_ENV === 'production' ? herokuBackendUrl : 'http://localhost:3000'



class App extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = () => {
    axios({
      url: `${databaseUrl}/api/users`,
      // url: 'https://project3-backend-test.herokuapp.com/api/users',
      method: 'get'
    })
      .then(users => {
        console.log(users)
        this.setState({ users })
      })
  }

  render() {
    console.log(this.state.users)
    console.log("Rendered")
    return (
      <Router>       
        <body>
            {/* <header className="App">
                <h1>Medical app</h1>
            </header> */}
            <main>
              <aside>
                <navigation>
                  <Navagation/>
                </navigation>
              </aside>
              <div id="mainContentWrapper">
                    <div>
                        <Route exact path="/" component={() => <Home/>}/>
                        <Route path="/doctors" component={() => < Doctors/> }/>
                        <Route path="/patients" component={() => < Patients/> }/>
                        <Route path="/schedule" component={() => < Schedule/> }/>
                        <Route path="/appointments" component={() => < Appointments/> }/>
                        <Route path="/doctorModal" component={() => < Appointments/> }/>
                    </div>
              </div>
            </main>
            {/* <footer>
              <h1>FOOTER</h1>
            </footer> */}
          </body>
        </Router> 
    );
  }
}

export default App;
