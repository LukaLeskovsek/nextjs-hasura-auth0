import Header from '../components/Header'
import Login from "../components/Auth/Login";
import TodoPrivateWrapper from "../components/Todo/TodoPrivateWrapper";
import TodoPublicWrapper from "../components/Todo/TodoPublicWrapper";
import OnlineUsersWrapper from "../components/OnlineUsers/OnlineUsersWrapper";
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'
import { Button } from 'lucid-ui';

const IndexPage = () => { 
  const { user, loading} = useFetchUser()
  if(loading) {
    return <div>Loading ...</div>
  }

  if (!loading && !user) {
    return <Login />
  }
  return(
    <div>
      <Header />
      <Button kind="primary">This is a test LUCID Button</Button>
      <div className="row container-fluid p-left-right-0 m-left-right-0">
        <div className="row col-md-9 p-left-right-0 m-left-right-0">
          <div className="col-md-6 sliderMenu p-30">
            <TodoPrivateWrapper />
          </div>
          <div className="col-md-6 sliderMenu p-30 bg-gray border-right">
            <TodoPublicWrapper />
          </div>
        </div>
        <div className="col-md-3 p-left-right-0">
          <div className="col-md-12 sliderMenu p-30 bg-gray">
            {/* <OnlineUsersWrapper /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withApollo()(IndexPage)