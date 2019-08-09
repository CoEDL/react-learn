import React from 'react'

class Name extends React.Component {

  state = {
    name: "hi"
  }

  componentDidMount() {
    this.setState({ name: "hi " + this.props.firstName })
  }

  render() {
    return <p>{this.state.name}</p>
  }
}
export default Name
