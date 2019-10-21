import { combineReducers } from 'redux'

import inputFieldReducer from './InputFieldReducer'
import blockWallReducer from './blockWallReducer'
import formReducer from './FormReducer'
import flowChartReducer from './FlowChartReducer'

// export default combineReducers({
//     inputFields: inputFieldReducer,
//     blockWall: blockWallReducer,
//     form: formReducer
// })

const combinedReducers = (state = {}, action) => {
    return {
        inputFields: inputFieldReducer(state.inputFields, action),
        form: formReducer(state.form, action, state.inputFields),
        blockWall: blockWallReducer(state.blockWall, action),
        flowChart: flowChartReducer(state.flowChart, action)
    }
}

export default combinedReducers