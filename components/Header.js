import Link from 'next/link'
import { withRouter } from 'next/router'
import { Navbar } from "react-bootstrap";
import LogoutBtn from "./Auth/Logout";
import { useFetchUser } from '../lib/user'


const Header = ({ router: { pathname } }) => {
  const { user} = useFetchUser()

  return (
    <Navbar className="justify-content-between navBar">
      <Navbar.Brand className="navBrand">GraphQL Tutorial App</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end navContainer navButton">
        <div>{user.nickname}</div>
        <LogoutBtn />
      </Navbar.Collapse>
    </Navbar>
  );

}

export default withRouter(Header)
