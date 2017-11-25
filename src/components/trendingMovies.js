import React from 'react';
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';

export class TrendingMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: {},
      movies: []
    }
    this.getTrendingMovies = this.getTrendingMovies.bind(this);
    this.getMovieById = this.getMovieById.bind(this);
    this.onMovieClick = this.onMovieClick.bind(this)
  }
  componentDidMount() {
    
    //this.getTrendingMovies();
  }
  render () {
    return (
      <Entity>
        {this.props.movies.map(this.displayMovie.bind(this))}
      </Entity>
    );
  }
  
  onMovieClick(movie) {
    console.log(movie.target.attributes.movieid.value);
    this.getMovieById(movie.target.attributes.movieid.value);
  }
  
  displayMovie(movie, i) {
    if(i > 10) {
      return;
    }
    let x = -9 + i;
    x = x + (i);
    let y = 2;
  
    //let z = -0.50 + )_
    let rotation = '0' + '1' + (i - 30);
    let pos = x + ' ' + y + ' -6.50 ';
    let posterPath = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path;
    let material = {
      shader: 'flat',
      src : posterPath
  };

    return (
    //   <Entity key={i} onClick={this.onMovieClick}>
    //   <a-image sound="on: click; src: #click-sound" src-fit rotation={rotation} geometry="primitive: plane; height: 3; width: 2"
    //   material="shader: flat; src: ${posterPath};" position={pos}  src={posterPath}></a-image>
    //  </Entity>
    <Entity>
      <Entity text={{value: this.state.currentMovie.title}}
          width="12" 
          position="0 0.9 -2">
      </Entity>
      <Entity text={{value: this.state.currentMovie.overview}}
          width="12"  
          position="0 0.7 -2">
      </Entity>
      <Entity sound="on: click; src: #click-sound" key={i} movieId={movie.id}
      events={{click: this.onMovieClick}} 
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
      console.log(data);
    })
    .catch(function(error) {
      console.log(`Error: ${error.message}`);
    });
  }
}
