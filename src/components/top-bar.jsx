import styled from "styled-components";
import Logo from "./logo";

const Topbar = ({ children }) => (
  <Toolbar>
    {" "}
    <Logo color={"var(--dark)"} />
    {children}
  </Toolbar>
);
const Toolbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px;
  color: var(--light);
  border-bottom: solid 2px var(--dark);
  box-sizing: border-box;
`;

export default Topbar;
