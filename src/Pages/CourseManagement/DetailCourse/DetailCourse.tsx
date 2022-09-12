import { Container, Grid } from "@mui/material";
import LoadingLazy from "Components/LoadingLazy/LoadingLazy";
import { AppDispatch, RootState } from "configStore";
import { Title } from "Pages/AddCourse/AddCourse";
import { useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategories, getCourseInfo } from "Slices/courseSLice";
import DetailContent from "./DetailContent";
import DetailImg from "./DetailImg";

const DetailCourse = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { courseInfo, isCourseInfoLoading } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(getCategories());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (courseId) dispatch(getCourseInfo(courseId));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  if (isCourseInfoLoading) {
    return <LoadingLazy />;
  }

  return (
    <Container>
      <Title>Chi tiết khóa học {courseInfo?.tenKhoaHoc}</Title>
      <Grid container>
        <Grid item xs={6} md={3} sx={{ mx: { xs: "auto", md: "none" }, mt: 2 }}>
          <DetailImg />
        </Grid>
        <Grid item xs={12} md={9}>
          <DetailContent />;
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailCourse;
