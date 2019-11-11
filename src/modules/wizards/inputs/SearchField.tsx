import React, { useState } from 'react'
import AsyncSelect from 'react-select/async';
import {connect} from 'react-redux'

import { InputFieldState } from '../../../redux/types/index';

import './styles/InputFields.scss';
import { ReduxStore } from "../../../utils/ReduxUtils";
import {SearchFieldProps, SearchOption, SearchOptionGroup} from "./FieldInterfaces";
import {services} from "../../../context";

type ComponentProps = SearchFieldProps & { fieldData?: InputFieldState }

const DropdownSearchField: React.FC<ComponentProps> = (props: ComponentProps) => {
    const [labelClass, setLabelClass] = useState('field-label');

    if(!props.fieldData) {
        return null;
    }

    const { uuid, label, value, name, options, controllerUrl, formUuid, isVisible, isRequired, optionsUrl } = props.fieldData;

    const setSelected = (selected: SearchOption) => {
        if(props.onUpdate) {
            props.onUpdate(selected);
        }

        if(controllerUrl) {
            services.wizardService.updateFieldValue(uuid, selected, formUuid);
        } else {
            services.wizardService.updateFieldValue(uuid, selected);
        }
    };

    const inputChangeHandler = (searchText: string) =>
        new Promise(resolve => {
            if(optionsUrl) {
                resolve(
                    services.wizardService.fetchSearchBoxOptionsStateless(optionsUrl, searchText)
                );
            }
        });

    const className=`input-container dropdown-search ${!isVisible ? 'hidden' : ''}`;

    return (
        <div className={className} key={name}>
            <label htmlFor="search-box" className={labelClass}>{label}</label>
            <AsyncSelect
                label={label + isRequired ? " *" : ""}
                name='search-box'
                cacheOptions={true}
                loadOptions={inputChangeHandler}
                defaultOptions={true}
                value={value as SearchOption}
                onMenuOpen={() => setLabelClass('field-label selected')}
                onMenuClose={() => setLabelClass('field-label')}
                onChange={(e) => setSelected(e as SearchOption)}
                // onInputChange={inputChangeHandler}
                options={options}
                styles={{
                    menuList: provided => ({ ...provided, textAlign: 'left', maxHeight: '30vh', overflowY: 'scroll'})
                }}
            />
        </div>
    )
};

const mapStateToProps = (store: ReduxStore, ownProps: SearchFieldProps) => {
    return {
        fieldData: store.inputFields[ownProps.uuid],
        ...ownProps
    }
};

export default connect(mapStateToProps, null)(DropdownSearchField);