const initialState = {
  name: 'ben',
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

    case 'SUCCESS':
      console.log("success response", action.response)
      return { ...state }

    case 'ERROR':
      console.log("error response", action.error)
      return { ...state }

    default:
      return state
  }
}

export default rootReducer
