import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import './styles/menu.scss';


class MenuTab extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            activeItem: 'home'
        }

    }
    
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem } = this.state

        return(
          <React.Fragment>
            <Menu pointing secondary vertical className='side-menu'>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item className='workplace'
               name='WorkPlace'
            />
            <Menu.Item
              name='Projects'
              active={activeItem === 'Projects'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Comments'
              active={activeItem === 'Comments'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='GitHub'
              onClick={this.handleItemClick}
            />
            <Menu.Item className='line'
               name=''
            />
            <Menu.Item
              name='Users'
              active={activeItem === 'Users'}
              onClick={this.handleItemClick}
            />
          </Menu>
          </React.Fragment>
        )
    }
}

export default MenuTab;