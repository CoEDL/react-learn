import React from 'react'
import axios from 'axios';

class App extends React.Component {

  state = {
    items: []
  }

  componentDidMount() {
    const url = 'http://jsonplaceholder.typicode.com/users/'
    axios.get(url)
      .then(response => {
        // APIs give response data back in different formats,
        // check what the format is by looking at the console log
        console.log(response)
        this.setState({ items: response.data })
      })
  }

  render() {
    return (
      <ul>
        {
          // map will loop over item in items
          this.state.items.map(item => {
            return (
              <li className="item" key={item.name}>
                  {item.name}
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default App;
