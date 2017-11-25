import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {TrendingMovies} from './components/trendingMovies';
class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {movies: []};
  }

  componentDidMount() {
    this.getTrendingMovies();
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
    })
    .catch(function(error) {
      console.log(`Error: ${error.message}`);
    });
  }

  getPopularMovies() {
    const key = '9b9a948adcd48830cf78d970886b6f71';
    let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key='+key;
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

  render () {
    return (
      <Scene inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js">
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
        </a-assets>
        <TrendingMovies movies={this.state.movies}/>
        
        <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        {/* <Entity text={{value: 'Popular Movies'}}
          events={{click: this.getPopularMovies.bind(this)}} 
          width="10"  
          position="-1 0.8 -2">
        </Entity>

        <Entity color="blue" primitive="a-plane" 
        events={{click: this.getTrendingMovies.bind(this)}} 
        width="1"  position="1 0.8 -2">
          <a-text width="3" value="Trending Movies"></a-text>
        </Entity>
         */}
        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" 
          animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}
          event-set__1={{_event: 'mouseenter', color: 'springgreen'}}
          event-set__2={{_event: 'mouseleave', color: 'black'}}          
         />
          
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
