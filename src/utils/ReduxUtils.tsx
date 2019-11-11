import { InputFieldsState } from '../redux/types';
import rootReducer from '../redux/reducers'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

const getInputFieldByUuidSelector = createSelector(
    (state: InputFieldsState) => state,
    (state: any, uuid: string) => uuid,
    (fieldsState: InputFieldsState, uuid: string) => fieldsState[uuid]);

export type ReduxStore = ReturnType<typeof rootReducer>;

export const useFieldStateByUUid = (uuid: string) => {
    return useSelector(
        (state: ReduxStore) =>
                getInputFieldByUuidSelector(state.inputFields, uuid)
        )
};