import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import axios from "axios";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import { RefreshControl } from "react-native";

const API_KEY = "d4ec0d7faffb5984587ec0dd913c184d";
const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

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

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
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

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    setTrending(data.results);
  };
  const getUpcoming = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    setUpcoming(data.results);
  };
  const getNowPlaying = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    setNowPlaying(data.results);
  };
  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Swiper
        horizontal
        loop
        // autoplay
        // autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{
          marginBottom: 30,
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 12)}
                {movie.original_title.length > 13 ? "..." : null}
              </Title>
              {movie.vote_average ? (
                <Votes>⭐️ {movie.vote_average.toFixed(1)}/10</Votes>
              ) : (
                "comming soon"
              )}
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <CommingSoonTitle>Comming Soon</CommingSoonTitle>
      {upcoming.map((movie) => (
        <Hmovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
            <Overview>
              {movie.overview !== "" && movie.overview.length > 80
                ? `${movie.overview.slice(0, 140)}...`
                : movie.overview}
            </Overview>
          </HColumn>
        </Hmovie>
      ))}
    </Container>
  );
};

export default Movies;
