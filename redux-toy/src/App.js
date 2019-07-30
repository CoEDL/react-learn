import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateName, incrementSomething } from './redux/actions'

class App extends Component {

  nameHandler = () => {
      this.props.updateName('thud')
  }

  incrementHandler = () => {
      this.props.incrementSomething()
  }
  render = () => {
    return (
      <div>{this.props.name}</div>
    )
  }
}
const mapStateToProps = state => {
  return {
    name: state.name,
    incrementingThing: state.incrementingThing
  }
}
const mapDispatchToProps = dispatch => ({
  updateName: name => {
    dispatch(updateName(name))
  },
  incrementSomething: () => {
    dispatch(incrementSomething())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
