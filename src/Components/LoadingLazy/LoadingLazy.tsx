import styled from "@emotion/styled";
import { Box, CircularProgress } from "@mui/material";

const StyledBox = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingLazy = () => {
  return (
    <StyledBox>
      <CircularProgress size={60} />
    </StyledBox>
  );
};

export default LoadingLazy;
