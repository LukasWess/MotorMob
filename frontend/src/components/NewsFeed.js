import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsItem from './NewsItem';
import { motorsportService } from '../services/api';
import '../styles/NewsFeed.css';

function NewsFeed() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        
        // Try to get data from API
        try {
          const data = await motorsportService.getLatestNews(3);
          setNewsItems(data);
          setLoading(false);
          return;
        } catch (apiError) {
          console.log('API not available, using mock data', apiError);
          // If API fails, fall back to mock data
        }
        
        // Mock data as fallback
        setTimeout(() => {
          setNewsItems([
            {
              id: 1,
              title: 'Hamilton Secures Pole Position at Monaco',
              excerpt: 'In a stunning qualifying session, Lewis Hamilton claimed his 110th career pole position...',
              date: 'May 11, 2025',
              source: 'MotorMob News',
              imageUrl: '/assets/news-placeholder.jpg'
            },
            {
              id: 2,
              title: 'New Regulations Announced for 2026 Season',
              excerpt: 'The FIA has released details of the new power unit regulations set to transform racing...',
              date: 'May 10, 2025',
              source: 'MotorMob News',
              imageUrl: '/assets/news-placeholder.jpg'
            }
          ]);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news');
        setLoading(false);
      }
    };
    
    fetchNews();
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
