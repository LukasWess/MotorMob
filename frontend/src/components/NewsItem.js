import React from 'react';
import '../styles/NewsItem.css';
import { images } from '../assets/images';

function NewsItem({ title, excerpt, date, source, imageUrl }) {
  return (
    <article className="news-item">
      <div className="news-image" style={{backgroundImage: `url(${imageUrl || images.news.placeholder})`}}></div>
      <h3 className="news-title">{title}</h3>
      <p className="news-excerpt">{excerpt}</p>
      <div className="news-meta">
        <span className="news-date">{date}</span>
        <span className="news-source">{source}</span>
      </div>
    </article>
  );
}

export default NewsItem;
