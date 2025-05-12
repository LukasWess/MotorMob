import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsItem from './NewsItem';
import { mockNews } from '../data/mockData';
import '../styles/NewsFeed.css';

function NewsFeed() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading delay for better UX
    setTimeout(() => {
      try {
        // Use mock data
        setNewsItems(mockNews.slice(0, 3));
        setLoading(false);
      } catch (error) {
        setError('Failed to load news. Please try again later.');
        setLoading(false);
      }
    }, 500);
  }, []);

  return (
    <section className="news-feed dashboard-card">
      <h2 className="section-title">Latest News</h2>
      
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="error-message">
          {error}
        </div>
      ) : (
        <>
          <div className="news-list">
            {newsItems.map(item => (
              <NewsItem 
                key={item.id}
                title={item.title}
                excerpt={item.excerpt}
                date={item.date}
                source={item.source}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
          <Link to="/news" className="view-all-link">View all news</Link>
        </>
      )}
    </section>
  );
}

export default NewsFeed;
