import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import Router from './components/Router';
import pagination from './components/pagination';


ReactDOM.render(
  <React.StrictMode>
  <Router /> 
  {/* <pagination /> */}
  </React.StrictMode>,
  document.getElementById('root')
);


