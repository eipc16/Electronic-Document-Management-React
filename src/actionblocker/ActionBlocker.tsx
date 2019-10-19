import React from 'react'

import rootReducer from '../redux/reducers/'
import { useSelector } from 'react-redux'

import './ActionBlocker.scss'
import { useBlockWallVisiblity } from '../utils/ReduxUtils'

export const ActionBlocker: React.FC = () => {

    const visibility = useBlockWallVisiblity()

    const blockClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    }

    return (
        <div className={`action-blocker ${visibility ? 'visible' : ''}`} onClick={(event) => blockClick(event)}/>
    )
}