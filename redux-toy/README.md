# Redux toy app

Redux is a one-way flow of data. Actions are dispatched to the reducer, which returns a new state. The state is made available to the app components by the store.

## To run this app

1. Download or `git clone` the parent `react-learn` repository.
2. Get into this `redux-toy` directory
3. Run `yarn start`


## How to build this into a new app.
Make three files
src/redux/actions.js
src/redux/reducer.js
src/redux/store.js


In actions.js, export the actions that the reducer will respond to. They have an action.type and optional other properties, ag action.payload or action.id

```
export const changeName = name => {
  return { type: 'CHANGE_NAME', name }
}
```


The reducer takes the current state, and depending on the action.type that it receives, will return a new state.

```
const initialState={name:'bar'}
const rootReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'CHANGE_NAME':
			const newValue = action.name
			return {...state, name: newValue}
		default:
			return state
	}
}
export default rootReducer
```

In store.js, create the store. If you have a large app, you can combineReducers into a single one for easy management. (This file doesn't need React imported.)

```
import { createStore } from 'redux'
import rootReducer from './reducer'
const store = createStore(
  rootReducer
)
export default store
```


In the app index.js, wrap the App component in a Provider, and pass in the store.
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```


Now, your components can access the state through this mechanism of mapping state to props. Here's an example of using a state value in the UI.

```
import React, { Component } from 'react';
import { connect } from 'react-redux'
class App extends Component {
  render = () => <div>{this.props.name}</div>
}
const mapStateToProps = state => {
  return {
    name: state.name
  }
}
export default connect(mapStateToProps)(App)
```


To dispatch an action from your component to update redux state, use a similar technique, mapDispatchToProps. Import the action from actinos.js, then add mapDispatchToProps into the connect() and then

```
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeName } from './redux/actions'

class App extends Component {

	nameHandler = () => {
		const {changeName } = this.props
		changeName('thud')
	}
  render = () => {
    return (
    <div>
      <button onClick={this.nameHandler}>change</button>
      {this.props.name}
    </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    name: state.name
  }
}
const mapDispatchToProps = dispatch => ({
  changeName: value => {
    dispatch(changeName(value))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
```



