import React from 'react';

import styled from "styled-components";

export const DepartmentNode  = styled.div`
  position: absolute;
  padding: 30px;
  max-width: 250px;
  text-wrap: normal;
  word-wrap: break-word;
  height: min-content;
  background: ${props => props.color};
  color: white;
  border-radius: 10px;
`;