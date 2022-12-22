import styled from "styled-components";

const Topbar = ({ children }) => <Toolbar>{children}</Toolbar>;
const Toolbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px;
  background-color: var(--pink);
  color: var(--pink);
`;

export default Topbar;
