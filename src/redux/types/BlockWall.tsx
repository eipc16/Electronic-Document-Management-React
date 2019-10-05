export const TOGGLE_BLOCKWALL = 'TOGGLE_BLOCKWALL'
export const SWITCH_BLOCKWALL = 'SWITCH_BLOCKWALL'

export interface BlockWallState {
    visible: boolean;
}

interface ToggleBlockWall {
    type: typeof TOGGLE_BLOCKWALL;
}

interface SwitchBlockWall {
    type: typeof SWITCH_BLOCKWALL;
    visible: boolean;
}

export type BlockWallTypes = ToggleBlockWall | SwitchBlockWall