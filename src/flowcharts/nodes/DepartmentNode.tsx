import React from 'react';

import styled from "styled-components";

export const DepartmentNode  = styled.div`
  position: absolute;
  padding: 30px;
  width: 150px;
  background: ${props => props.color};
  color: white;
  border-radius: 10px;
`;