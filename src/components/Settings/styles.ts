import { css } from '@emotion/core';

export const containerStyle = css`
  margin: 10px;
`;

export const formContainerStyle = css`
  display: flex;
  flex-direction: row;
  & > div {
    flex: 1;
  }
  & > div:nth-of-type(even) {
    margin-left: 5px;
  }
  & > div:nth-of-type(odd) {
    margin-right: 5px;
  }
`;

export const actionsContainerStyle = css`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
