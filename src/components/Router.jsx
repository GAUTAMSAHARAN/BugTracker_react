import React, { Component } from 'react';
import Navbar from './navbar';
import MenuTab from './menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home';
import Projects from './projects';
import Project from './project';
import Issue from './issue';
import Users from './users';

class Router extends Component{
    render(){
        return(
            <BrowserRouter>
            <Navbar />
            <MenuTab />
            <Switch>
                <Route exact path='/'component={Home} />
                <Route exact path='/projects' component={Projects} />
                <Route exact path='/users' component={Users} />
                <Route exact path='/projects/:projectId' component={Project} />
                <Route exact path='/issues/:issueId' component={Issue} />
            </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;