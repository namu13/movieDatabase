import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Image = styled.Image`
  width: 90px;
  height: 140px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({ path }) => (
  <Image source={{ uri: makeImgPath(path) }}></Image>
);

export default Poster;
