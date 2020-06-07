import React, { Component } from 'react';
import { Input, Icon, Menu, Dropdown  } from 'semantic-ui-react';
import './styles/navbar.scss';


//options for the dropdown menu
const options = [
    { key: 1, text: 'This is a super long item', value: 1 },
    { key: 2, text: 'Dropdown direction can help', value: 2 },
    { key: 3, text: 'Items are kept within view', value: 3 },
  ]

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
      <Menu icon className='navbar'>
        <Menu.Item
          name='bars'
          active={activeItem === 'bars'}
          onClick={this.props.hideMenu}
        >
          <i class="fas fa-bars"></i>
        </Menu.Item>

        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          <i class="fas fa-home"></i>
        </Menu.Item>

        <Menu.Item>
          <Input className='icon' id='search' icon='search' placeholder='Search...' />
         </Menu.Item>

         <Menu.Item position='right'
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
         >
          <i class="fas fa-plus"></i>
        </Menu.Item>

        <Menu.Item 
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
         >
          <i class="fas fa-cog"></i>
        </Menu.Item>

      </Menu>
         </React.Fragment>
        )
    }
}

export default Navbar;