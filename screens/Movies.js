import React from "react";
import { Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";

const API_KEY =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=d4ec0d7faffb5984587ec0dd913c184d&language=en-US&page=1&region=KR";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;
const View = styled.View`
  flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const getNowPlaying = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR
    `);
  };
  return (
    <Container>
      <Swiper
        loop
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        <View style={{ backgroundColor: "teal" }}></View>
        <View style={{ backgroundColor: "tomato" }}></View>
        <View style={{ backgroundColor: "teal" }}></View>
        <View style={{ backgroundColor: "tomato" }}></View>
      </Swiper>
    </Container>
  );
};

export default Movies;
