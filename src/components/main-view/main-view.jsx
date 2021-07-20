import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

class MainView extends React.Component {
    constructor() {
        super(); 
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
        };
    }

  componentDidMount(){
    axios
    .get("https://manpreet-movieapi.herokuapp.com/movies")
    .then((response) => {
      this.setState({
        movies: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
   /* When a movie is clicked, this function is involed and updates the state of the selectedMovie property to that movie*/
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie,
        });
    }
   /*When a user logs in, this function updates the user property in state to that particular user */
   onLoggedIn(user) {
     this.setState({
       user,
     });
   }

   onRegister(register) {
     this.setState({
       register,
     });
   }

    render() {
        const {movies, selectedMovie, user } = this.state;

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        //if (!user)
        //return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

=======
        //if (!user)return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
        if (!newRegistration)
        return <RegistrationView onRegister={(newRegistration) => this.onRegister(newRegistration)} />;
>>>>>>> Stashed changes
=======
        //if (!user)return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
        if (!newRegistration)
        return <RegistrationView onRegister={(newRegistration) => this.onRegister(newRegistration)} />;
>>>>>>> Stashed changes
=======
        //if (!user)return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
        if (!newRegistration)
        return <RegistrationView onRegister={(newRegistration) => this.onRegister(newRegistration)} />;
>>>>>>> Stashed changes
        if (movies.length === 0) return <div className="main-view" />;
        
        return (
          <Container>
          <div className="main-view">
          {selectedMovie 
          ? (
            <Row className="justify-content-md-center">
             <Col md={8}>
               <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
             </Col>
            </Row>
          )
          : movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
            ))
          }
        </div>
        </Container>
        );
    }
};
export default MainView;