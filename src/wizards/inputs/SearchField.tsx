import React, { useState } from 'react'
import Select from 'react-select';
import { useDispatch } from 'react-redux'

import {setFieldValue, setFieldValidationResults, registerInputField} from '../../redux/actions'
import { InputFieldState } from '../../redux/types';

import './InputFields.scss';
import { useFieldStateByUUid, useRegisterField } from '../../utils/ReduxUtils';
import { Validator } from '../validators/Validator';

export interface SearchOption {
    label: string;
    value: string;
}

export interface SearchOptionGroup {
  label: string;
  options: SearchOption[];
}

interface SearchFieldProps {
    label: string;
    uuid: string;
    formUuid: string;
    name: string;
    validator: Validator | undefined;
    type: string;
    defaultValue: SearchOption | null;
    required: boolean;
    options: SearchOptionGroup[] | SearchOption[];
  }

const DropdownSearchField: React.FC<SearchFieldProps> = props => {
  const dispatch = useDispatch()
  const [labelClass, setLabelClass] = useState('field-label')

  useRegisterField({
        uuid: props.uuid,
        formUuid: props.formUuid,
        name: props.name,
        type: props.type,
        label: props.label,
        value: props.defaultValue,
        isValid: true,
        errors: [],
        options: props.options
  })

  const setSelected = (selected: SearchOption) => {
      dispatch(setFieldValue(uuid, selected))
  }

  const fieldState: InputFieldState = useFieldStateByUUid(props.uuid)
  
  if(!fieldState) {
    return null
  }

  const {uuid, label, value, options, name} = fieldState

  return (
        <div className="input-container dropdown-search" key={name}>
          <label htmlFor="search-box" className={labelClass}>{label}</label>
          <Select
            label={label}
            name='search-box'
            value={value as SearchOption}
            onMenuOpen={() => setLabelClass('field-label selected')}
            onMenuClose={() => setLabelClass('field-label')}
            onChange={(e) => setSelected(e as SearchOption)}
            options={options}
          />
        </div>
  )
}

export const getSearchBoxComponent = (props: SearchFieldProps) => {
  return (
    <DropdownSearchField 
        key={props.uuid}
        uuid={props.uuid}
        formUuid={props.formUuid}
        name={props.name}
        type={props.type}
        label={props.label}
        defaultValue={props.defaultValue}
        options={props.options}
        required={props.required}
        validator={props.validator}
    />
  )
}