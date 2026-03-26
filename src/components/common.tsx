import { css } from 'styled-components'

export const button = css`
  box-shadow: none;
  text-decoration: none;
  color: #5b4a8a;
  text-shadow: none;
  width: max-content;
  font-weight: 600;
  font-size: 0.72rem;
  white-space: nowrap;
  line-height: 1;
  padding: 0.3rem 0.7rem;
  background: #f0ecf9;
  border-radius: 999px;
  border: 1.5px solid #ddd4f0;
  background-image: none;
  transition: all 0.2s ease;
  &:hover {
    background: #e0d6f6;
    color: #3d2b6b;
    border-color: #c4b5e3;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(91, 74, 138, 0.15);
  }
`
