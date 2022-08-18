import styled from "@emotion/styled";
import Logo from "Components/Logo/Logo";
import { Link, Outlet } from "react-router-dom";

const Template = styled.div`
  background-image: url("https://elearningindustry.com/wp-content/uploads/2019/10/visual-design-tips-for-elearning-professionals.jpg");
  /* padding: 2rem; */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkLogo = styled(Link)`
  position: absolute;
  top: 1rem;
  left: 1.3rem;
`;

const LoginTemplate = () => {
  return (
    <Template>
      <LinkLogo to="/">
        <Logo />
      </LinkLogo>
      <Outlet />
    </Template>
  );
};

export default LoginTemplate;
