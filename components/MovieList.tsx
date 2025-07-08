import React from 'react';
import { FlatList } from 'react-native';
import MovieItem from './MovieItem';


interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface Props {
  movies: Movie[];
}

export default function MovieList({ movies }: Props) {
  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MovieItem movie={item} />}
    />
  );
}
