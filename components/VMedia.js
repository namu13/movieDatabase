import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const VMedia = ({ id, posterPath, originalTitle, voteAverage }) => {
  return (
    <Movie key={id}>
      <Poster path={posterPath} />
      <Title>
        {originalTitle.slice(0, 12)}
        {originalTitle.length > 13 ? "..." : null}
      </Title>
      <Votes voteAverage={voteAverage} />
    </Movie>
  );
};

export default VMedia;
