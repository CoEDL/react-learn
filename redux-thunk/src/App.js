import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateName, incrementSomething, asyncAction } from './redux/actions'

class App extends Component {
  // when the component mounts, trigger the asynchronous action
  componentDidMount = () => {
    this.props.asyncAction()
  }
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
  asyncAction: () => {
    dispatch(asyncAction()).then(() => { console.log("done") })
  },
  updateName: name => {
    dispatch(updateName(name))
  },
  incrementSomething: () => {
    dispatch(incrementSomething())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
