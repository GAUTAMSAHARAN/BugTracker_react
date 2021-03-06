import React, { Component } from 'react';
import Navbar from './navbar';
import MenuTab from './menu';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './home';
import Projects from './projects';
import Project from './project';
import Issue from './issue';
import Users from './users';
import GetTokken from './getTokken';
import LogIn from './login';
import Profile from './profile';
import { Container, Button } from 'semantic-ui-react';
import './styles/grid.scss';
import MyPage from './mypage';
import NotFound from './404notfound';


const ROUTES = [
    { path: '/', key: 'ROOT', exact: true, component: GetTokken},
    { path: '/login', key: 'ROOT_TOKKEN', exact: true, component: LogIn},
    {
        path: "/app",
        key: 'APP',
        component: props=>{
            if(!sessionStorage.getItem("token")){
              return <Redirect to={"/"} />
            }
            return <RenderRoutes {...props} />;
        },
        routes: [
            { 
              path: "/app",
              key: 'APP_HOME',
              exact: true, 
              component: Home,
            },
            {
              path: "/app/projects",
              key: 'APP_PROJECTS',
              exact: true,
              component: Projects,
            },
            {
              path: "/app/project",
              key: 'APP_PROJECT',
              exact: true,
              component: Project,
            },
            {
              path: "/app/users",
              key: 'APP_USERS',
              exact: true, 
              component: Users,
            },
            {
                path: "/app/user",
                key: 'APP_USER',
                exact: true, 
                component: Profile,
            },
            {
                path: "/app/issue",
                key: 'APP_ISSUE',
                exact: true, 
                component: Issue,
            },
            {
                path: "/app/mypage",
                key: 'APP_MYPAGE',
                exact: true,
                component: MyPage,
            }
        ]
    }
]
export { ROUTES };


function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    );
  }

// export function RenderRoutes({ routes, hide }) {  
//   return (
//       <Switch>
//         {routes.map((route, i) => {
//           return <RouteWithSubRoutes key={route.key} {...route} />;
//         })}
//         <NotFound hide={hide()} />
//         {/* <Route component={NotFound} /> */}
//       </Switch>
//     );
//   }

class RenderRoutes extends Component{

  render(){
    const { routes } = this.props
    return(
      <React.Fragment>
      <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <NotFound hide={this.props.hideMenu} />
a     </Switch>  
      </React.Fragment>
    )
  }
}

export default RenderRoutes;