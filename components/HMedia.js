import styled from "styled-components/native";
import Poster from "./Poster";

const Title = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Hmovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;

const HColumn = styled.View`
  margin-left: 50px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin: 10px 0;
`;

const HMedia = ({ id, posterPath, originalTitle, releaseDate, overview }) => {
  return (
    <Hmovie key={id}>
      <Poster path={posterPath} />
      <HColumn>
        <Title>{originalTitle}</Title>
        <Release>
          {new Date(releaseDate).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Release>
        <Overview>
          {overview !== "" && overview.length > 80
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
      </HColumn>
    </Hmovie>
  );
};

export default HMedia;
