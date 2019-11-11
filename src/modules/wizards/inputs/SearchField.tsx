import React, { useState } from 'react'
import Select from 'react-select';
import { useDispatch } from 'react-redux'

import {setFieldValue} from '../../../redux/actions/index'
import { InputFieldState } from '../../../redux/types/index';

import './InputFields.scss';
import { Validator } from '../validators/Validator';
import {useFieldStateByUUid, useRegisterField} from "../../../utils/ReduxUtils";

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
  const [labelClass, setLabelClass] = useState('field-label');

  const getOptionsValue = () => {
      if(props.options instanceof String) {
          return [];
      } else {
          return props.options;
      }
    }

  useRegisterField({
        uuid: props.uuid,
        formUuid: props.formUuid,
        name: props.name,
        type: props.type,
        label: props.label,
        value: props.defaultValue,
        isValid: true,
        errors: [],
        options: getOptionsValue()
  });

  const setSelected = (selected: SearchOption) => {
      dispatch(setFieldValue(uuid, selected))
  };

  const fieldState: InputFieldState = useFieldStateByUUid(props.uuid);
  
  if(!fieldState) {
    return null
  }

  const {uuid, label, value, options, name} = fieldState;

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
            styles={{
                menuList: provided => ({ ...provided, textAlign: 'left', maxHeight: '30vh', overflowY: 'scroll'})
            }}
          />
        </div>
  )
};

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