import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import './styles/navbar.scss';

class Navbar extends Component {

    constructor(props){
        super(props);

        this.state={
            activeItem: 'browser'
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem } = this.state
        return(
         <React.Fragment>
             <Menu className='navbar'>
              <Menu.Item
                name='browse'
                active={activeItem === 'browse'}
                onClick={this.handleItemClick}
              >
                Browse
              </Menu.Item>
      
              <Menu.Item
                name='submit'
                active={activeItem === 'submit'}
                onClick={this.handleItemClick}
              >
                Submit
              </Menu.Item>
      
              <Menu.Menu position='right'>
                <Menu.Item
                  name='signup'
                  active={activeItem === 'signup'}
                  onClick={this.handleItemClick}
                >
                  Sign Up
                </Menu.Item>
      
                <Menu.Item
                  name='help'
                  active={activeItem === 'help'}
                  onClick={this.handleItemClick}
                >
                  Help
                </Menu.Item>
              </Menu.Menu>
            </Menu>
         </React.Fragment>
        )
    }
}

export default Navbar;