import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Create from './components/Create/Create';
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route path='/create' component={Create} />
        <Route path='/detail/:id'> 
          <Detail />
        </Route>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
