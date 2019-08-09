import React from 'react';
import './App.css';

class App extends React.Component {

  state = {name: "me"}

  handleChange = (event) => {
    this.setState({name: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input type="text" onChange={this.handleChange} />
          <p>{this.state.name}</p>
        </header>
      </div>
    )
  }
}

export default App;
