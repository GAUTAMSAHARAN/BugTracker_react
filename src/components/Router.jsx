import React, { Component } from 'react';
import Navbar from './navbar';
import MenuTab from './menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/grid.scss';
import RenderRoutes, {ROUTES} from "./paths";
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
            <div className='component'>
            <RenderRoutes hideMenu={this.hideMenu} routes={ROUTES} />
            </div>
            </div>
            </BrowserRouter>
        )
    }
}

export default Router;


