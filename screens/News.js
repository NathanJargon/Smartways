import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  RefreshControl,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import axios from 'axios';

function News() {
  const [news, setNews] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true); 
      const response = await axios.get(
        'https://newsapi.org/v2/everything',
        {
          params: {
            q: 'carbon footprint emissions',
            apiKey: '6d604f0b42614d0fabf0388461d91f6d',
          },
        }
      );

      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error.message);
    } finally {
      setRefreshing(false);
      setLoading(false); 
    }
  };

  const openArticleUrl = (url) => {
    Linking.openURL(url);
  };

  const formatDateString = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  return (
    <ImageBackground source={require('../assets/newsbg.png')} style={styles.backgroundImage}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
      <Text style={styles.header}>Latest News on Carbon Footprints and Emissions</Text>

      {isLoading ? (
        // Display a loading indicator while data is being fetched
        <ActivityIndicator size="large" color="#4caf50" style={{ marginTop: 20 }} />
      ) : (
        news.map((article, index) => (
          <TouchableOpacity
            key={index}
            style={styles.articleContainer}
            onPress={() => openArticleUrl(article.url)}
          >
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleDescription}>{article.description}</Text>
            <Text style={styles.articleDate}>{formatDateString(article.publishedAt)}</Text>
            <Text style={styles.articleSource}>{article.source.name}</Text>
          </TouchableOpacity>
        ))
      )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  articleContainer: {
    marginBottom: 20,
    backgroundColor: '#eafce3', 
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  articleDate: {
    fontSize: 12,
    color: '#4caf50',
    marginBottom: 4,
  },
  articleSource: {
    fontSize: 12,
    color: '#4caf50', 
  },
});

export default News;
