import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import styled from "styled-components";
import { useState } from "react";
import { MovieDetail } from "../../types";
import Seo from "../../components/Seo";
import { SERVER_URL } from "../../constants";
function Detail({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [movieDetail, setMovieDetail] = useState<MovieDetail>(data);

  return (
    <MainContainer>
      <Seo title={movieDetail.title} />
      <BackImage
        src={`https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`}
        alt={movieDetail.title}
      />
      <Title>
        {movieDetail.title} ({movieDetail.original_title}){" "}
        {movieDetail.adult ? <AdultBadge>19</AdultBadge> : null}
      </Title>
      <SubTitle>{movieDetail.tagline}</SubTitle>
      <Overview>{movieDetail.overview}</Overview>
      <Runtime>Runtime : {movieDetail.runtime}분</Runtime>
      <Release>Release : {movieDetail.release_date}</Release>
    </MainContainer>
  );
}
export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`${SERVER_URL}/api/movies/${id}`);
  const data: MovieDetail = await res.json();
  return {
    props: {
      data,
    },
  };
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  margin-left: 12px;
  margin-right: 12px;
`;

const BackImage = styled.img``;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
`;

const AdultBadge = styled.div`
  background-color: red;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
`;

const SubTitle = styled.span`
  font-size: 13px;
`;

const Release = styled.p`
  font-weight: bold;
  margin-top: 2px;
`;

const Runtime = styled(Release)``;

const Overview = styled.p`
  padding: 20px 20px 20px 20px;
  border: 3px solid #222222;
  border-radius: 10px;
  font-size: 16px;
`;
