import styled from "styled-components";

const Page = ({ children, ...props }) => {
  return <PageContaner {...props}>{children}</PageContaner>;
};

const PageContaner = styled.section`
  height: calc(100vh - 60px);
`;

export default Page;
