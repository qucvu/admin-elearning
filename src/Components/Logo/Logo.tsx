import styled from "@emotion/styled";
import { Box } from "@mui/material";
import logo from "Assets/logo.png";
type Props = {};

const ImageLogo = styled.img`
  width: 3rem;
`;
const StyledLogo = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Logo = (props: Props) => {
  return (
    <StyledLogo>
      <ImageLogo src={logo} alt="logo e-learning" />
    </StyledLogo>
  );
};

export default Logo;
