import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true
    };
  }

  componentDidMount(){
    axios.get('https://filmquarry.herokuapp.com/movies').then(res => {
      this.setState({
        movies:res.data
      });
    }).catch(error => {
      console.log(err);
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {//newuser
    this.setState({
      //user: newuser
      user
    });
  }

  changeReg(regStatus) {
    this.setState({
      registered: regStatus
    });
  }

  render() {
    //Object destruction - same as const movies = this.state.movies;
    const { movies, selectedMovie, user, registered } = this.state;
    
    if (!user && registered) return <LoginView regData={Status => this.changeReg(Status)} loggingIn={user => this.onLoggedIn(user)} />; 

    if (!user && !registered) return <RegistrationView  regData={Status => this.changeReg(Status)}/>; 

    if (movies.length === 0) return <div className="main-view"></div>;
  
    //movieData is the props to pass to the child as data
    
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movieData2={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}