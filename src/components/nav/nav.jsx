import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import PropTypes from 'prop-types';

import './nav.scss';

export class Navigation extends React.Component {

render() {
  const { onSignOut, history, user } = this.props;

  return (
    <>
      <Navbar className="font-weight-bold" fixed="top" expand="lg" bg="info" variant="dark">
        <Navbar.Brand><span className="navsize1">Film Quarry</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
          <Nav className="navsize2">
            <Nav.Link className="text-white mx-2" onClick={() => { history.push(`/movies`); }}>
              <span className="hover ani">Movies</span>
            </Nav.Link>

            {/* <Nav.Link className="text-white mx-2" href="#"><span className="hover ani">My Favs</span></Nav.Link> */}

            <Nav.Link className="text-white mx-2" onClick={() => { history.push(`/users/${user}`); }}>
              <span className="hover ani">{`${user}`}</span>
            </Nav.Link>
            
            <Nav.Link className="text-white mx-2" onClick={() => { onSignOut(null); history.push('/'); }}><span className="hover ani">Sign Out</span></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="margin"></div>
      </>
    );
  }
}

Navigation.propTypes = {
  onSignOut: PropTypes.func.isRequired
};