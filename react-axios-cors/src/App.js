import React from 'react'
import axios from 'axios';

class App extends React.Component {

  state = {
    items: [],
    key: 'YOUR_KEY_HERE',
    zone: 'book',
    query: 'sharks'
  }

  componentDidMount() {
    // compile our query to suit the API
    // docs: https://help.nla.gov.au/trove/building-with-trove/api-version-2-technical-guide#anchor-1
    const url = '/result?key=' + this.state.key + '&zone=' + this.state.zone + '&q=' + this.state.query
    // const url = '/result?key=YOUR_KEY_HERE&zone=book&q=shark'

    console.log(url)
    // this is an alternative way of joining strings and variables, aka template strings or template literals
    // const url = `/result?key=${this.state.key}&zone=${this.state.zone}&q=${this.state.query}`

    axios.get(url)
      .then(response => {
        // APIs give response data back in different formats,
        // check what the format is by looking at the console log
        console.log(response)
        const items = response.data.response.zone[0].records.work
        this.setState({ items: items })
      })
  }

  render() {
    return (
      <ul>
        {
          // map will loop over item in items
          this.state.items.map(item => {
            return (
              <li className="item" key={item.title}>
                  {item.title}
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default App;
