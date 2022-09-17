import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import axios from "axios";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { View } from "react-native";
import { FlatList } from "react-native";

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

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
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
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
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
              data={trending}
              horizontal
              keyExtractor={(item) => item.id + ""}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
              renderItem={({ item }) => (
                <VMedia
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
            />
          </ListContainer>
          <CommingSoonTitle>Comming Soon</CommingSoonTitle>
        </>
      }
      data={upcoming}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          releaseDate={item.release_date}
          overview={item.overview}
        />
      )}
    />
  );
};

export default Movies;
