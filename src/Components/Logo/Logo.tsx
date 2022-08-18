import styled from "@emotion/styled";
import { Box } from "@mui/material";
type Props = {};

const ImageLogo = styled.img`
  width: 7rem;
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
      <ImageLogo
        src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
        alt="logo e-learning"
      />
    </StyledLogo>
  );
};

export default Logo;
