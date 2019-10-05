import React from 'react'

import { mdiToggleSwitchOff, mdiToggleSwitch } from '@mdi/js'
import { Icon } from '@mdi/react'

import './SidebarStyles.scss'

export enum SidebarVisibility {
    HIDDEN = "hidden",
    EXTENDED = "extended",
    DEFAULT = "default"
}

export interface SidebarElement {
    title: string,
    icon: string,
    description: string,
    onclick: () => void,
    noHighlight?: boolean
}

interface SidebarProps {
    className?: string,
    elements: SidebarElement[],
    default_visiblity: SidebarVisibility,
    scrollable?: boolean,
    color?: string,
    accent?: string,
    loading_screen: () => JSX.Element
}

interface SidebarState {
    visibility: SidebarVisibility;
    selected: number;
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {

    public static DEFAULT_CLASS: string = "side-bar"

    public static MODE_SWITCH_TITLE = "Switch sidebar mode"

    public static defaultProps = {
        default_visiblity: SidebarVisibility.DEFAULT,
        className: Sidebar.DEFAULT_CLASS,
        scrollable: true,
        color: "#0885de",
        accent: "#54aff0",
        loading_screen: () => {
            return (
                <div>Loading...</div>
            )
        }
    }

    constructor(props: any) {
        super(props)

        this.state = {
            visibility: this.props.default_visiblity,
            selected: 0
        }
    }

    setVisibility(visibility: SidebarVisibility) {
        this.setState({
            visibility: visibility
        })
    }

    setSelected(selected: number) {
        this.setState({
            selected: selected
        })
    }

    toggleVisibilityMode() {
        const newMode = this.state.visibility === SidebarVisibility.DEFAULT
                                        ? SidebarVisibility.EXTENDED
                                        : SidebarVisibility.DEFAULT;

        this.setVisibility(newMode);
    }

    private handleClick(event: React.MouseEvent, element: SidebarElement, index: number) {
        event.preventDefault();

        if(!element.noHighlight) {
            this.setSelected(index);
        }
        element.onclick();
    }

    private getElementsFromProps(): JSX.Element[] {

        const iconClass = `action-icon ${this.state.visibility}`
        const textClass = `action-title ${this.state.visibility}`

        const elementArray = this.props.elements.map((el, index) => {

            let elemStyle = {
                backgroundColor: this.state.selected === index
                                    ? this.props.accent
                                    : this.props.color
            }

            return (
                <div className='side-bar_element' style={elemStyle} key={`element_${index}`} onClick={(event) => this.handleClick(event, el, index)}>
                    <Icon className={iconClass} path={el.icon} size={3} />
                    <p className={textClass}>{el.title}</p>
                    {/* <span className='action-description'>{el.description}</span> */}
                </div>
            )
        })

        return elementArray
    }
    
    render() : JSX.Element {
        const stateIcon: string = (this.state.visibility === SidebarVisibility.EXTENDED)
                                        ? mdiToggleSwitchOff
                                        : mdiToggleSwitch
        
        let visibility = this.state.visibility.valueOf();

        const sidebarClass = `${this.props.className} ${visibility}`

        const modeSwitchClass = `mode_switch ${visibility}`

        const iconClass = `icon`

        const textClass = `text ${visibility}`

        const sidebarStyle = {
            backgroundColor: this.props.color
        }

        return (
            <div className={sidebarClass} style={sidebarStyle}>
                <div className='elements_container'>
                    {this.getElementsFromProps()}
                </div>

                <div className={modeSwitchClass} onClick={() => this.toggleVisibilityMode()}>
                    <span className={textClass}>{Sidebar.MODE_SWITCH_TITLE}</span>
                    <Icon className={iconClass} path={stateIcon} size={2} />
                </div>
            </div>
        )
    }
}

export default Sidebar