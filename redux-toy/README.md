# Redux toy app

Redux is way of handling data globally in your app, and provides a safe way design state-based apps. Redux enforces a one-way flow of data (TODO more on that).

Actions are dispatched to the reducer, which returns a new state. The state is made available to the app components by the store.

## To run this app

1. Download or `git clone` the parent `react-learn` repository.
2. Get into this `redux-toy` directory
3. Run `yarn install` to install the dependencies that the app uses
4. Run `yarn start` to start the app, and launch in a browser


## How to include Redux into a new app.

To add Redux state to an existing app, here are the steps to set up the actions, reducer and store, and wire them up to the interface.

Make a `redux` folder in the app's `src` folder, and make three files in there:

```
├── App.js
├── index.css
├── index.js
└── redux
    ├── actions.js
    ├── reducer.js
    └── store.js

```

### Actions

In `actions.js`, we create actions that the reducer will "hear". Each action has a `type` and optionally other properties, e.g. a data payload or id. These actions may be triggered by things like click handlers in the user interface. Each action gets "exported" so that the interface can import, and trigger them.

```jsx
export const changeName = name => {
  return { type: 'CHANGE_NAME', name:name }
}
```

Javascript Pro Tip: Instead of writing properties and values like `name:name` you can just use `name` where the labels are the same (using Javascript ES6). Spot the differnce of the code above with the code below. For more information, see this article about [property value shorthand](https://alligator.io/js/object-property-shorthand-es6/).

```jsx
export const changeName = name => {
  return { type: 'CHANGE_NAME', name }
}
```

### Reducer

`Reducer.js` uses the current state, and depending on the type of action that it receives, will do stuff to the app's data and return a new state. Note that we do stuff to data and return a new state, we don't change the state directly. We can define default values for things for when the state is initially created.

More Fancy Javascript alert! The use of `...state` here is called [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), it's a handy way to populate a new object with the properties of another.

```jsx
const initialState={name:'ben'}

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

### Store

Our `store.js` file is used to create the store. If you have a large app, you can combine reducers into a single one for easy management of large or complex data. More on that in a future demo.

```jsx
import { createStore } from 'redux'
import rootReducer from './reducer'
const store = createStore(
  rootReducer
)
export default store
```

### Telling the app about the store

Now we've created the things than can trigger changes in the app state, we need to set up the mechanism by which the app can access them. This is done in the app's `index.js` file, by wrapping the `App` component in a `Provider` component, and "passing in" the store as a property.

```jsx
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

### Hooking up to the user interface

#### State to Props

Now, your user interface can access the state through this mechanism of mapping state to the component's props, by `connecting` the `mapStateToProps` function to the component.

In this example, state has a "name" value, which is mapped from state to the component props in the `mapStateToProps` function. This enables the App component to access the value using the `this.props.name` notation when it is rendered.

```jsx
import React, { Component } from 'react';
import { connect } from 'react-redux'
class App extends Component {
  render = () =>{
    return (
      <div>{this.props.name}</div>
    )
  }
}
const mapStateToProps = state => {
  return {
    name: state.name
  }
}
export default connect(mapStateToProps)(App)
```



#### Dispatching actions

To allow a component to update redux state, we use the same technique to connect `mapDispatchToProps` to the component. Just like we referred to the state values that were mapped to `this.props`, we refer to the connected action functions as `this.props.actionName`. These can be called by a handler function, which in turn triggers or dispatches the action itself.

 Import the action from `actions.js`, add `mapDispatchToProps` into the component's connect() function and then use the actions as `this.props.actionName` in an event handler.

```jsx
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeName } from './redux/actions'

class App extends Component {

	nameHandler = () => {
		this.props.changeName('thud')
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

# Further reading

Some of the jargon
> https://medium.com/@holtkam2/react-redux-understanding-components-containers-actions-and-reducers-a2f9287bfb92

For a comparison of React's Context API and Redux, see
> https://frontarm.com/james-k-nelson/when-context-replaces-redux/