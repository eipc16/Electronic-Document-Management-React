import inputFieldReducer from './InputFieldReducer'
import blockWallReducer from './blockWallReducer'
import formReducer from './FormReducer'
import flowChartReducer from './FlowChartReducer'
import documentsReducer from './DocumentsReducer'

const combinedReducers = (state = {}, action) => {
    return {
        inputFields: inputFieldReducer(state.inputFields, action),
        form: formReducer(state.form, action, state.inputFields),
        blockWall: blockWallReducer(state.blockWall, action),
        flowChart: flowChartReducer(state.flowChart, action),
        documents: documentsReducer(state.documents, action)
    }
}

export default combinedReducers