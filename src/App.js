import React from "react";
import "./styles.css";
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
      jokes: [],
      isFetchingJoke: false
    };

    this.tellAJoke = this.tellAJoke.bind(this);
  }

  componentDidMount() {
    this.searchJokes();
  }

  tellAJoke = async () => {
    this.searchJokes();
  };

  async searchJokes() {
    this.setState({ isFetchingJoke: true });
    const res = await fetch("https://icanhazdadjoke.com/search", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    const json = await res.json();
    const dadjokes = await json.results;
    console.log(dadjokes[0].joke);

    this.setState({
      ...dadjokes,
      isFetchingJoke: false
    });
  }

  render() {
    return (
      <>
        <form>
          <input type="text" placeholder="Enter Search term..." />
          <button>Search</button>

          <button onClick={this.tellAJoke} disabled={this.state.isFetchingJoke}>
            Tell me a joke
          </button>
        </form>
        <p>{this.state.jokes} </p>
        <p> {this.state.isFetchingJoke && "Loading Joke"} </p>
      </>
    );
  }
}

export default App;
