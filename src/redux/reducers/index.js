import { combineReducers } from 'redux'
import inputFieldReducer from './inputFieldReducer'
import blockWallReducer from './blockWallReducer'

export default combineReducers({
    fields: inputFieldReducer,
    blockWall: blockWallReducer
})