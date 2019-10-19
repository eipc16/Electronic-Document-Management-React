import { combineReducers } from 'redux'

import inputFieldReducer from './InputFieldReducer'
import blockWallReducer from './blockWallReducer'
import formReducer from './FormReducer'

// export default combineReducers({
//     inputFields: inputFieldReducer,
//     blockWall: blockWallReducer,
//     form: formReducer
// })

const combinedReducers = (state = {}, action) => {
    return {
        inputFields: inputFieldReducer(state.inputFields, action),
        formReducer: formReducer(state.form, action, state.inputFields),
        blockWall: blockWallReducer(state.blockWall, action)
    }
}

export default combinedReducers