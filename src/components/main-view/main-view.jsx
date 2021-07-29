import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { RegistrationView } from '../registration-view/registration-view';
import { Navigation } from '../nav/nav';
import {Row, Col, NavbarBrand, Container, Button} from 'react-bootstrap';

export class MainView extends React.Component {
    constructor() {
        super(); 
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
        };
    }

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }
   /* When a movie is clicked, this function is involed and updates the state of the selectedMovie property to that movie*/
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie,
        });
    }
   /*When a user logs in, this function updates the user property in state to that particular user */
   onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

   onRegister(register) {
     this.setState({
       register,
     });
   }


   
   getMovies(token) {
    axios.get('https://manpreet-movieapi.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  

  render() {
    const { movies, user } = this.state;
    console.log (movies,user)

    if (!user) return <Row>
    <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    </Col>
  </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Container>
            <Navigation bg="dark" variant="dark" fixed="top">
              <NavbarBrand>Welcome to MyFlix!</NavbarBrand>
              <ul>
                <Link to={`/`}>
                  <Button variant="link" className="navbar-link text-light">Movies</Button>
                </Link >
                <Link to={`/users/${user}`}>
                  <Button variant="link" className="navbar-link text-light">Profile</Button>
                </Link>
                <Link to={`/`}>
                  <Button variant="link" className="navbar-link text-light" onClick={() => this.onLoggedOut()}>Logout</Button>
                </Link >
              </ul>
            </Navigation >
          </Container>

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return  Movies.map (movie) = MovieCard.movie(movie) ;
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/users/:userId" render={() => {
            if (!user) return
            return <Col>
              <ProfileView onLoggedIn={user => this.onLoggedIn(user)}
                movies={movies} user={user}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

export default MainView;