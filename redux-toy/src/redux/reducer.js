const initialState = {
  name: 'initial value',
  incrementingThing: 0
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      const newValue = action.name
      return { ...state, name: newValue }

    case 'INCREMENT_SOMETHING':
      const i = state.incrementingThing + 1
      return { ...state, incrementingThing: i }

    default:
      return state
  }
}

export default rootReducer
