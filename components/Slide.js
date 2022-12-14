import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { BlurView } from "@react-native-community/blur";
import { makeImgPath } from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 20px;
`;

const Slide = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
        blurRadius={4}
      />
      {/* <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={10}
        blurRadius={10}
        downsampleFactor={10}
        overlayColor="dark"
      > */}
      <Wrapper>
        <Poster path={posterPath} />
        <Column>
          <Title numberOfLines={2}>{originalTitle}</Title>
          <Votes voteAverage={voteAverage} />
          <Overview numberOfLines={3}>{overview}</Overview>
        </Column>
      </Wrapper>
      {/* </BlurView> */}
    </View>
  );
};

export default Slide;
