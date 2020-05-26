import React, { Component } from 'react';
import Navbar from './navbar';
import MenuTab from './menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home';
import Projects from './projects';
import Project from './project';
import Issue from './issue';
import Users from './users';
import GetTokken from './getTokken';
import LogIn from './login';
import Profile from './profile';
import { Container } from 'semantic-ui-react';
import './styles/grid.scss';


class Router extends Component{
    render(){
        return(
            <BrowserRouter>
            <div className='grid'>
            <Navbar />
            <MenuTab />
            <Switch>
                <Route path='/home'component={Home} />
                <Route exact path='/projects' component={Projects} />
                <Route exact path='/users' component={Users} />
                <Route exact path='/user/' component={Profile} />
                <Route exact path='/project/' component={Project} />
                <Route exact path='/issue/' component={Issue} />
                <Route exact path='/getTokken' component={GetTokken}  />
                <Route path='/login/' component={LogIn} />
            </Switch>
            </div>
            </BrowserRouter>
        )
    }
}

export default Router;