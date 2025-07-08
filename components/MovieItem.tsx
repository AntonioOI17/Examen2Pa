import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Props {
  movie: {
    title: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
  };
}

export default function MovieItem({ movie }: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
        }}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text>Año: {movie.release_date?.slice(0, 4)}</Text>
        <Text>Rating: {movie.vote_average}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 100,
    height: 150,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
