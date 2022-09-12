import { Box } from "@mui/material";
import { RootState } from "configStore";
import { SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import Placeholder200x150 from "Assets/200x150.jpg";

const DetailImg = () => {
  const { courseInfo, srcPreview } = useSelector(
    (state: RootState) => state.course
  );

  return (
    <Box>
      {srcPreview ? (
        <img src={srcPreview} alt={srcPreview} width="100%" />
      ) : (
        <img
          src={courseInfo?.hinhAnh}
          alt={courseInfo?.hinhAnh}
          width="100%"
          onError={(error: SyntheticEvent<HTMLImageElement, Event>) =>
            (error.currentTarget.src = Placeholder200x150)
          }
        />
      )}
    </Box>
  );
};

export default DetailImg;
