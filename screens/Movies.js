import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";

const API_KEY = "d4ec0d7faffb5984587ec0dd913c184d";
const Container = styled.ScrollView``;
const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR
    `)
    ).json();
    setNowPlaying(results);
    setLoading(false);
    console.log(results);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
            />
            <BlurView intensity={100} style={StyleSheet.absoluteFill}>
              <Text>{movie.original_title}</Text>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
