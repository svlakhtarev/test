import React, {Component, lazy, Suspense} from 'react'
import {Link, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/appReducer'
import Preloader from './components/common/Preloader'
import {NavMenu} from './components/Nav/Nav'
import {AppStateType} from './redux/reduxStore'
import {UsersPage} from './components/Users/UsersContainer'
import {Login} from './components/Login/Login'
import {Header} from './components/Header/Header'
import 'antd/dist/antd.css'
import {Layout} from 'antd'

const ChatPage = lazy(() => import('./pages/Chat/ChatPage'))
const ProfileContainer = lazy(
  () => import('./components/Profile/ProfileContainer')
)
const DialogsContainer = lazy(
  () => import('./components/Dialogs/DialogsContainer')
)

const {Content, Footer, Sider} = Layout

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      <Layout>
        <Header/>
        <Content style={{padding: '0 50px'}}>
          {/*<Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>*/}
          <Layout className="site-layout-background" style={{padding: '24px 0'}}>
            <Sider className="site-layout-background" width={200}>
              <NavMenu/>
            </Sider>
            <Content style={{padding: '0 24px', minHeight: 280}}>
              <Suspense fallback={<Preloader/>}>
                <Switch>
                  <Route path='/' exact>
                    <Redirect to='/profile'/>
                  </Route>
                  <Route path="/profile/:userID?"
                         render={() => <ProfileContainer/>}/>
                  <Route path="/dialogs"
                         render={() => <DialogsContainer/>}/>
                  <Route path="/users"
                         render={() => <UsersPage pageTitle={'Users'}/>}/>
                  <Route path="/login"
                         render={() => <Login/>}/>
                  <Route path="/chat"
                         render={() => <ChatPage/>}/>
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>Learning project by <Link
          to={'https://social-network.samuraijs.com'}>IT-Incubator</Link>. Create by <Link
          to={'https://github.com/svlakhtarev'}>Serj Lakhtarev</Link>.</Footer>
      </Layout>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    {initializeApp})
)(App)
