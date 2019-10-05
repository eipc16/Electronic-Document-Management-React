import React from 'react';

import { mdiToggleSwitchOff, mdiToggleSwitch } from '@mdi/js';
import { Icon } from '@mdi/react';

import './Sidebar.scss';

export enum SidebarVisibility {
  HIDDEN = 'hidden',
  EXTENDED = 'extended',
  DEFAULT = 'default'
}

export interface SidebarElement {
  title: string;
  icon: string;
  description: string;
  onClick: () => void;
  noHighlight?: boolean;
}

interface SidebarProps {
  className?: string;
  elements: SidebarElement[];
  defaultVisibility: SidebarVisibility;
  scrollable?: boolean;
  color?: string;
  accent?: string;
  loadingScreen: () => JSX.Element;
}

interface SidebarState {
  visibility: SidebarVisibility;
  selected: number;
}

class CustomSidebar extends React.Component<SidebarProps, SidebarState> {
  public static DEFAULT_CLASS = 'side-bar';

  public static MODE_SWITCH_TITLE = 'Switch sidebar mode';

  public static defaultProps = {
    defaultVisibility: SidebarVisibility.DEFAULT,
    className: CustomSidebar.DEFAULT_CLASS,
    scrollable: true,
    color: '#0885de',
    accent: '#54aff0',
    loadingScreen: (): JSX.Element => {
      return <div>Loading...</div>;
    }
  };

  constructor(props: SidebarProps) {
    super(props);

    this.state = {
      visibility: this.props.defaultVisibility,
      selected: 0
    };
  }

  setVisibility(visibility: SidebarVisibility) {
    this.setState({
      visibility: visibility
    });
  }

  setSelected(selected: number) {
    this.setState({
      selected: selected
    });
  }

  toggleVisibilityMode() {
    const newMode =
      this.state.visibility === SidebarVisibility.DEFAULT
        ? SidebarVisibility.EXTENDED
        : SidebarVisibility.DEFAULT;

    this.setVisibility(newMode);
  }

  private handleClick(
    event: React.MouseEvent,
    element: SidebarElement,
    index: number
  ) {
    event.preventDefault();

    if (!element.noHighlight) {
      this.setSelected(index);
    }
    element.onClick();
  }

  private blockClick(event: React.MouseEvent) {
    event.stopPropagation();
  }

  private getElementsFromProps(): JSX.Element[] {
    const iconClass = `action-icon ${this.state.visibility}`;
    const textClass = `action-title ${this.state.visibility}`;
    
    const elementArray = this.props.elements.map((el, index) => {
      const elemStyle = {
        backgroundColor:
          this.state.selected === index ? this.props.accent : this.props.color
      };

      return (
        <div
          className="side-bar_element"
          style={elemStyle}
          key={`element_${index}`}
          onClick={event => this.handleClick(event, el, index)}
        >
          <Icon className={iconClass} path={el.icon} size={3} />
          <p className={textClass}>{el.title}</p>
          {/* <span className='action-description'>{el.description}</span> */}
        </div>
      );
    });

    return elementArray;
  }

  render(): JSX.Element {
    const stateIcon: string =
      this.state.visibility === SidebarVisibility.EXTENDED
        ? mdiToggleSwitchOff
        : mdiToggleSwitch;

    const visibility = this.state.visibility.valueOf();

    const sidebarStyle = {
      backgroundColor: this.props.color
    };

    return (
      <div>
        <div className={`action-blocker ${visibility}`} onClick={(event) => this.blockClick(event)}/>
        <div className="sidebar-top-container">
          <div className={`${this.props.className} ${visibility}`} style={sidebarStyle}>
          <div className="elements_container">{this.getElementsFromProps()}</div>
          <div
            className={`mode_switch ${visibility}`}
            onClick={() => this.toggleVisibilityMode()}
          >
            <span className={`text ${visibility}`}>{CustomSidebar.MODE_SWITCH_TITLE}</span>
            <Icon className={`icon`} path={stateIcon} size={2} />
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomSidebar;
