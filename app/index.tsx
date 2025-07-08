import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import axios from 'axios';

const API_KEY = 'cb1d3857dca56f795d2525071f570c91';

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Recibimos también exact para búsqueda exacta
  const fetchMovies = async (query: string, exact: boolean) => {
    if (!query.trim()) return;

    setLoading(true);
    setNoResults(false);

    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
        },
      });

      let results = res.data.results;
      if (exact) {
        results = results.filter(
          (movie: any) => movie.title.toLowerCase() === query.toLowerCase()
        );
      }

      setMovies(results);
      if (results.length === 0) setNoResults(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🎬 Movie Finder</Text>
        </View>

        {/* Pasamos fetchMovies con exact */}
        <SearchBar onSearch={fetchMovies} placeholder="Busca una película..." />

        <View style={styles.content}>
          {loading && <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />}
          {!loading && noResults && (
            <Text style={styles.noResultsText}>😞 No encontramos películas con ese título</Text>
          )}
          {!loading && !noResults && <MovieList movies={movies} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  loader: {
    marginTop: 30,
  },
  noResultsText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
});
