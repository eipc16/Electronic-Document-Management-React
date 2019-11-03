export const PRIMARY_MIN_SIZE = 30;
export const SECONDARY_MIN_SIZE = 6;

export const PRIMARY_MAX_SIZE = 100 - SECONDARY_MIN_SIZE;
export const SECONDARY_MAX_SIZE = 100 - PRIMARY_MIN_SIZE;

export const SPLITTER_SIZE_ERROR_THRESHOLD = 0.8;

export const SPLITTER_MAX_SECONDARY_ACTION = "max-secondary";
export const SPLITTER_MIN_SECONDARY_ACTION = "min-secondary";

export type ChangeSplitProportionsAction = (typeof SPLITTER_MAX_SECONDARY_ACTION) | (typeof SPLITTER_MIN_SECONDARY_ACTION);

export function setSplitterChangeTransition(transition: boolean,
                                           callback?: (primary: HTMLDivElement, secondary: HTMLDivElement) => void) {
    const splitterItems = document.getElementsByClassName('layout-pane');
    const primary = splitterItems[0] as HTMLDivElement;
    const secondary = splitterItems[1] as HTMLDivElement;

    if(primary && secondary) {

        if(transition) {
            primary.classList.remove('slider');
            secondary.classList.remove('slider');
        } else {
            primary.classList.add('slider');
            secondary.classList.add('slider');
        }

        if(callback) {
            callback(primary, secondary)
        }
    }
}

export async function hideSecondaryPane(callback: () => void) {
    setSplitterChangeTransition(true, (primary, secondary) => {
        primary.style.height = `100$`;
        secondary.style.height = '0%';
    });

    document.addEventListener("transitionend", callback, { once: true});
}

export function changeSplitterState(type: ChangeSplitProportionsAction) {
    setSplitterChangeTransition(true, (primary, secondary) => {
        switch(type) {
            case SPLITTER_MAX_SECONDARY_ACTION:
                primary.style.height = `${PRIMARY_MIN_SIZE}%`;
                secondary.style.height = `${SECONDARY_MAX_SIZE}%`;
                break;
            case SPLITTER_MIN_SECONDARY_ACTION:
                primary.style.height = `${PRIMARY_MAX_SIZE}%`;
                secondary.style.height = `${SECONDARY_MIN_SIZE}%`;
                break;
        }
    });
}