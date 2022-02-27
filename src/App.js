import React from "react";
import "./styles.css";
import SearchForm from "./Component/SearchForm";
import img from "../../public/joke-image.jpg";

// import { useState } from "react";

// export default function App({ version }) {
//   const [joke, setJoke] = useState("");

//   const tellAJoke = async () => {
//     const res = await fetch("https://icanhazdadjoke.com/", {
//       method: "GET",
//       headers: {
//         Accept: "application/json"
//       }
//     });
//     const dadJoke = await res.json();

//     setJoke(dadJoke.joke);

//     console.log(dadJoke.joke);
//   };
//   return (
//     <>
//       <button onClick={tellAJoke}> Tell me a joke </button>
//       <p>{joke}</p>
//     </>
//   );
// }

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: "",
      jokes: [],
      isFetchingJoke: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    //this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
  }

  componentDidMount() {
    this.searchJokes();
  }

  // onSearchChange(event) {
  //   this.setState({ searchTerm: event.target.value });
  // }

  onSearchChange(value) {
    this.setState({ searchTerm: value });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.searchJokes();
  }

  showJokes() {
    return (
      <ul>
        {this.state.jokes.map((joke) => (
          <li key={joke.id}> {joke.joke} </li>
        ))}
      </ul>
    );
  }

  async searchJokes(limit = 5) {
    console.log("Getting jokes");
    this.setState({ isFetchingJoke: true });
    const res = await fetch(
      `https://icanhazdadjoke.com/search?term=${this.state.searchTerm}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    );
    const json = await res.json();
    const dadjokes = await json.results;

    this.setState({
      jokes: [...dadjokes],
      isFetchingJoke: false
    });
  }

  render() {
    return (
      <div className="App">
        <img src={img} alt="joke image" />
        <SearchForm
          onFormSubmit={this.searchJokes}
          onSearchChange={this.onSearchChange}
          onSingleSearchClick={() => this.searchJokes(1)}
          isLoading={this.state.isFetchingJoke}
        />
        <p>{this.showJokes()} </p>
        <p> {this.state.isFetchingJoke && "Loading Joke"} </p>
        {/* <p> search term : {this.state.searchTerm} </p> */}
      </div>
    );
  }
}

export default App;
