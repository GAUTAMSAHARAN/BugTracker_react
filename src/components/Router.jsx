import React, { Component } from 'react';
import Navbar from './navbar';
import MenuTab from './menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/grid.scss';
import ROUTES, { RenderRoutes } from "./routes";
import pagination from './pagination';

class Router extends Component{
     
    constructor(props){
        super(props)
        this.state={
            on: true,
        }
        this.hideMenu = this.hideMenu.bind(this)
    }

    hideMenu(){
        this.setState({
            on: this.state.on ? false : true,
        })
        console.log('hello')
    }

    render(){
        return(
            <BrowserRouter>
            <div className='grid'>
            <Navbar hideMenu={this.hideMenu} />
            <div style={{display: this.state.on ? 'block' : 'none'}} >
            <MenuTab />
            </div>
            {/* <Switch>
                <Route path='/home'component={Home} />
                <Route exact path='/projects' component={Projects} />
                <Route exact path='/users' component={Users} />
                <Route exact path='/user/' component={Profile} />
                <Route exact path='/project/' component={Project} />
                <Route exact path='/issue/' component={Issue} />
                <Route exact path='/getTokken' component={GetTokken}  />
                <Route path='/login/' component={LogIn} />
                <Route path='/mypage/' component={MyPage} />
            </Switch> */}
            <div className='component'>
            {/* <pagination /> */}
            <RenderRoutes routes={ROUTES} />
            </div>
            </div>
            </BrowserRouter>
        )
    }
}

export default Router;