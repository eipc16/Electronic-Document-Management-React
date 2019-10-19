import { InputFieldsState, InputFieldState, FormState } from '../redux/types';
import rootReducer from '../redux/reducers'

import { createSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { registerInputField, setCurrentForm } from '../redux/actions';
import { FormProps, InputField } from '../wizards/Wizard';

const getInputFieldByUuid = (fieldsState: InputFieldsState, uuid: string) => {
    return fieldsState[uuid]
}
  
const getInputFieldByUuidSelector = createSelector(
                                                (state: InputFieldsState) => state, 
                                                (state: any, uuid: string) => uuid, 
                                                getInputFieldByUuid)

export const useFieldStateByUUid = (uuid: string) => {
    return useSelector(
        (state: ReturnType<typeof rootReducer>) => 
                getInputFieldByUuidSelector(state.inputFields, uuid)
        )
}

const useRegisterInputField = (props: InputFieldState) => {
    const dispatch = useDispatch()
    dispatch(registerInputField(props))
}

const transformFieldsToNames = (fields: InputField[]) => {
    return fields.map(field => field.name)
}

export const useRegisterCurrentForm = (props: FormProps) => {
    const dispatch = useDispatch()
    dispatch(setCurrentForm({
        uuid: props.uuid,
        title: props.title,
        visible: false,
        endpoint: props.endpoint,
        fields: transformFieldsToNames(props.fields)
    }))
}

export const useRegisterField = (props: InputFieldState) => {
    //working on some way to add conditional dispatch
    useRegisterInputField(props)
}

export const useBlockWallVisiblity = () => {
    return useSelector((state: ReturnType<typeof rootReducer>) => state.blockWall.visible)
}