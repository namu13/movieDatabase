import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import axios from "axios";
import { BlurView } from "@react-native-community/blur";
import { makeImgPath } from "../utils";
import { useColorScheme } from "react-native";

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

const BgImg = styled.Image`
  background-color: teal;
`;

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

const Poster = styled.Image`
  width: 80px;
  height: 140px;
  border-radius: 5px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );

    setNowPlaying(data.results);
    setLoading(false);
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
        horizontal
        loop
        // autoplay
        // autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
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
                <Poster
                  source={{ uri: makeImgPath(movie.poster_path) }}
                ></Poster>
                <Column>
                  <Title numberOfLines={2}>{movie.original_title}</Title>
                  {movie.vote_average > 0 ? (
                    <Votes>⭐️{movie.vote_average}/10</Votes>
                  ) : null}
                  <Overview numberOfLines={3}>{movie.overview}</Overview>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
