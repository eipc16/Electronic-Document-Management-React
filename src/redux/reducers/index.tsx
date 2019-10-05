import { combineReducers } from 'redux'
import formReducer from './inputFieldReducer'
import blockWallReducer from './blockWallReducer'

export default combineReducers({
    formReducer,
    blockWallReducer
})