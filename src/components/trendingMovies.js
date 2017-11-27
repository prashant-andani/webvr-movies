import React from 'react';
import 'aframe';
import 'aframe-animation-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';

export class TrendingMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: {},
      movies: [],
      genres: ''
    }
    this.getTrendingMovies = this.getTrendingMovies.bind(this);
    this.getMovieById = this.getMovieById.bind(this);
    this.onMovieClick = this.onMovieClick.bind(this)
  }
  componentDidMount() {
  }
  render () {
    return (
      <Entity>
        {this.props.movies.map(this.displayMovie.bind(this))}
        <Entity 
          material="color: #ffffff" 
          text={{value: this.state.currentMovie.title, height: 0 , width: 3}}
          position="0.5 0.9 -2">
        </Entity>

        <Entity 
          material="color: #ffffff"  
          text={{value: this.state.currentMovie.tagline, height: 0, width: 3}}
          position="0 0.5 -2">
        </Entity> 

        <Entity 
          material="color: #ffffff"  
          text={{value: this.state.genres, height: 2, width: 2}}
          position="0 0.7 -2">
        </Entity>
      </Entity>
    );
  }
  
  onMovieClick(movie) {
    this.getMovieById(movie.target.attributes.movieid.value);
  }
  
  displayMovie(movie, i) {
    if(i > 10) {
      return;
    }
    let x = -9 + i;
    x = x + (i);
    let y = 2;
    let rotation = '0' + '1' + (i - 20);
    let pos = x + ' ' + y + ' -6.50 ';
    let posterPath = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path;
    let material = {
      shader: 'flat',
      src : posterPath
    };

    return (
      <Entity geometry="primitive: plane; width: 6; height: 2" 
      material="color: white" height="1" width="5">
        
        <Entity sound="on: click; src: #click-sound" key={i} movieId={movie.id}
        events={{click: this.onMovieClick}} 
          rotation="0 0 0"
          event-set__1={{_event: 'mousedown', scale: '1 1 1'}}
          event-set__2={{_event: 'mouseup', scale: '1.2 1.2 1'}}
          event-set__3={{_event: 'mouseenter', scale: '1.2 1.2 1'}}
          event-set__4={{_event: 'mouseleave', scale: '1 1 1'}}
          position={pos} material={material}
          geometry={{primitive: 'plane', height: 3, width: 2}} />
      </Entity>
    )
  }

  getTrendingMovies() {
    const key = '9b9a948adcd48830cf78d970886b6f71';
    let url = 'https://api.themoviedb.org/3/movie/popular?api_key='+key;
    fetch(url) .then(response => {
      if (response.ok) {
        return Promise.resolve(response);
      }
      else {
        return Promise.reject(new Error('Failed to load')); 
      }
    })
    .then(response => response.json()) // parse response as JSON
    .then(data => {
      // success
      this.setState({movies: data.results});
      console.log(data);
    })
    .catch(function(error) {
      console.log(`Error: ${error.message}`);
    });
  }

  getMovieById(movieId) {
    const key = '9b9a948adcd48830cf78d970886b6f71';
    let url = 'https://api.themoviedb.org/3/movie/'+ movieId + 'popular?api_key='+key;
    fetch(url) .then(response => {
      if (response.ok) {
        return Promise.resolve(response);
      }
      else {
        return Promise.reject(new Error('Failed to load')); 
      }
    })
    .then(response => response.json()) // parse response as JSON
    .then(data => {
      // success
      this.setState({currentMovie: data});
      console.log();
      data.genres.map((genre, i) =>{
        if(!this.state.genres) {
          this.setState({genres: genre.name + ', '});
        }
        let comma = '';
        if(i < data.genres.length -1) {
          comma = ', '
        }
        this.setState({genres: this.state.genres + genre.name + comma});
      })
      console.log(this.state.genres);
    })
    .catch(function(error) {
      console.log(`Error: ${error.message}`);
    });
  }
}
