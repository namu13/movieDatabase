import styled from "styled-components/native";

const Vote = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const Votes = ({ voteAverage }) => {
  return voteAverage ? (
    <Vote>⭐️ {voteAverage.toFixed(1)}/10</Vote>
  ) : (
    "comming soon"
  );
};

export default Votes;
