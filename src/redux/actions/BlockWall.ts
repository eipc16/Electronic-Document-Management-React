import { 
    TOGGLE_BLOCKWALL, 
    SWITCH_BLOCKWALL,
    BlockWallTypes 
} from '../types/'

export function toggleBlockWall(): BlockWallTypes {
    return {
        type: TOGGLE_BLOCKWALL
    }
} 

export function switchBlockWall(display: boolean): BlockWallTypes {
    return {
        type: SWITCH_BLOCKWALL,
        visible: display
    }
}