import styled from "styled-components";

const Page = ({ children }) => {
  return <PageContaner>{children}</PageContaner>;
};

const PageContaner = styled.section`
  background-color: var(--pink);
  height: 100vh;
`;

export default Page;
