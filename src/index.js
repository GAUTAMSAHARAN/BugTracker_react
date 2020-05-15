import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import MenuTab from './components/menu';
// import Home from './components/home'; 
import Navbar from './components/navbar';
import Projects from './components/project';

ReactDOM.render(
  <React.StrictMode>
  <Navbar />
  <MenuTab />
  <Projects />  
  </React.StrictMode>,
  document.getElementById('root')
);


