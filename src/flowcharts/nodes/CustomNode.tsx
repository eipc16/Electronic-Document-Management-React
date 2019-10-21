import React from 'react'
import { INodeDefaultProps } from '@mrblenny/react-flow-chart'
import styled from 'styled-components'

const DarkBox = styled.div`
  position: absolute;
  padding: 30px;
  background: #3e3e3e;
  color: white;
  border-radius: 10px;
`

const Circle = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d30000;
  color: white;
  border-radius: 50%;`


function CustomNode({ node, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) {
      if (node.type === 'output-only') {
        return (
          <DarkBox ref={ref} {...otherProps}>{children}</DarkBox>
        )
      } else {
        return (
          <Circle ref={ref} {...otherProps}>{children}</Circle>
        )
      }
}

export default React.forwardRef(CustomNode)