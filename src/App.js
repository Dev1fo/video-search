import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import SearchBar from "./components/search-bar";
import VideoList from "./containers/video-list";
import VideoDetail from "./components/video-detail";
import axios from "axios";
import Video from "./components/video";
import "bootstrap/dist/css/bootstrap.min.css";
const API_KEY = "api_key=53d5cbd7b06f7b3d5ecc57c4d2b2a261";
const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const SEARCH_URL = "search/movie?language=fr&include_adult=false";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: {}, currentMovie: {} };
  }
  componentWillMount() {
    this.initMovies();
  }

  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(
      function(response) {
        this.setState(
          {
            movieList: response.data.results.slice(1, 6),
            currentMovie: response.data.results[0]
          },
          function(response) {
            this.applyVideoTocurrentMovie();
          }
        );
      }.bind(this)
    );
  }

  applyVideoTocurrentMovie() {
    // console.log("msg", this.state.currentMovie);

    // ?: ça permet de faire la distinction dans l'url
    // &: Permet de faire la distinction entre les parametres
    axios
      .get(
        `${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`
      )

      .then(
        function(response) {
          if (
            response.data.videos.results[0] &&
            response.data.videos.results[0].key
          ) {
            const youtubeKey = response.data.videos.results[0].key;
            console.log("youtubekey", youtubeKey);
            let newCurrentMovieState = this.state.currentMovie;
            newCurrentMovieState.videoId = youtubeKey;
            this.setState({ currentMovie: newCurrentMovieState });
            console.log("rep", this.state.currentMovie);
          }
        }.bind(this)
      );
  }

  onClickListItem(movie) {
    this.setState({ currentMovie: movie }, () => {
      this.applyVideoTocurrentMovie();
      this.setRecommandation();
    });
  }
  onClickSearch(searchText) {
    if (searchText) {
      axios
        .get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
        .then(
          function(response) {
            // console.log("reponse: ", response);
            // console.log("repp", response.data.results[0].id);
            if (response.data && response.data.results[0]) {
              if (response.data.results[0].id !== this.state.currentMovie.id) {
                this.setState(
                  { currentMovie: response.data.results[0] },
                  () => {
                    this.applyVideoTocurrentMovie();
                    this.setRecommandation();
                  }
                );
              }
            }
          }.bind(this)
        );
    }
  }
  setRecommandation() {
    axios
      .get(
        `${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`
      )
      .then(
        function(response) {
          this.setState({
            movieList: response.data.results.slice(0, 5)
          });
        }.bind(this)
      )
      .catch(function(response) {
        console.log("response de l'api en cas d'erreur: ", response);
      });
  }
  render() {
    // console.log("movies", this.state.movies);
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return (
          <VideoList
            movieList={this.state.movieList}
            callback={this.onClickListItem.bind(this)}
          />
        );
      }
    };

    return (
      <div>
        <div className="search_bar">
          <SearchBar callback={this.onClickSearch.bind(this)} />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
            {/* pour appeler une methode */}
          </div>

          <div className="col-md-4">{renderVideoList()}</div>
        </div>
      </div>
    );
  }
}

export default App;
