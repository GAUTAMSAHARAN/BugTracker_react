import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import './styles/menu.scss';
import { Link } from 'react-router-dom';


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

            <Link to='/app/'>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            </Link>

            <Menu.Item className='workplace'
               name='WorkPlace'
            />
 
            <Link to='/app/projects'>
            <Menu.Item 
              name='Projects'
              active={activeItem === 'Projects'}
              onClick={this.handleItemClick}
            />
            </Link>
 
            <Link to='/app/mypage'>
            <Menu.Item 
              name='MyPage'
              active={activeItem === 'MyPage'}
              onClick={this.handleItemClick}
            />
            </Link>

            <Menu.Item
              name='GitHub'
              onClick={this.handleItemClick}
            />

            <Menu.Item className='line'
               name=''
            />
 
            <Link to='/app/users'>
            <Menu.Item
              name='Users'
              active={activeItem === 'Users'}
              onClick={this.handleItemClick}
            />
            </Link>

          </Menu>
          </React.Fragment>
        )
    }
}

export default MenuTab;