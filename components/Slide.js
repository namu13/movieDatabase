import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { useColorScheme } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

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

const Votes = styled(Overview)`
  margin-top: 5px;
  font-size: 12px;
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
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType={isDark ? "dark" : "light"}
        blurAmount={10}
        blurRadius={10}
        downsampleFactor={10}
        overlayColor
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title numberOfLines={2}>{originalTitle}</Title>
            {voteAverage > 0 ? <Votes>⭐️{voteAverage}/10</Votes> : null}
            <Overview numberOfLines={3}>{overview}</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
