import { css } from 'styled-components'

export const button = css`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  text-shadow: none;
  width: max-content;

  font-weight: 700;
  font-size: 0.66rem;
  white-space: nowrap;
  border: 3px solid #28242f;
  line-height: 1.8;
  padding: 0.1rem 0.5rem 0.05rem;
  background-image: none;
  &:hover {
    background-image: linear-gradient(
      to right top,
      #1d437f,
      #605e97,
      #937caf,
      #c09ec7,
      #eac2e0
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    box-decoration-break: clone;
    border-color: #fff;
  }
`
