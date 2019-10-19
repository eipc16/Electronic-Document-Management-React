import { InputFieldsState, InputFieldState } from '../redux/types';
import rootReducer from '../redux/reducers'

import { createSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { registerInputField } from '../redux/actions';

const getInputFieldByUuid = (fieldsState: InputFieldsState, uuid: string) => {
    return fieldsState.inputFields[uuid]
  }
  
const getInputFieldByUuidSelector = createSelector(
                                                (state: InputFieldsState) => state, 
                                                (state: any, uuid: string) => uuid, 
                                                getInputFieldByUuid)

export const useFieldStateByUUid = (uuid: string) => {
    return useSelector(
        (state: ReturnType<typeof rootReducer>) => 
                getInputFieldByUuidSelector(state.form, uuid)
        )
}

const useRegisterInputField = (props: InputFieldState) => {
    const dispatch = useDispatch()
    dispatch(registerInputField(props))
}

export const useRegisterField = (props: InputFieldState) => {
    //working on some way to add conditional dispatch
    useRegisterInputField(props)
}

export const useBlockWallVisiblity = () => {
    return useSelector((state: ReturnType<typeof rootReducer>) => state.blockWall.visible)
}