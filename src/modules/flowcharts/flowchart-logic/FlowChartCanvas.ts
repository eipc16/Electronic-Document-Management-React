import styled from "styled-components";
import {ICanvasOuterDefaultProps} from "@mrblenny/react-flow-chart/src";

export const CanvasOuterCustom = styled.div<ICanvasOuterDefaultProps>`
      position: relative;
      background-size: 10px 10px;
      background-color: darkgrey;
      background-image:
        linear-gradient(90deg,hsla(0,0%,100%,.1) 1px,transparent 0),
        linear-gradient(180deg,hsla(0,0%,100%,.1) 1px,transparent 0);
      height: 'inherit';
      width: 'inherit';
      max-width: 'inherit';
      max-height: 'inherit';
      overflow: hidden;
      cursor: pointer;
      
      & > div::before {
        background-color: lightgrey;
        opacity: 0.5;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        content: '';
        position: absolute;
      }
`;