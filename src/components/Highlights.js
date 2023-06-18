import React from 'react';
import '../styles/Highlights.css';

const Highlights = ({ data }) => {
  const getTileCount = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
      return 1; // Show 1 tile per row on screens up to 480px wide
    } else {
      return 2;
    }
  };

  const tileCount = getTileCount();

  const handleHighlightClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
      <div className="highlights-container">
        {data.map(({ title, description, link }, index) => (
            <div
                key={index}
                className={`highlight ${tileCount === 1 ? 'single' : 'double'}`}
                onClick={() => handleHighlightClick(link)}
                style={link ? { cursor: 'pointer' } : null}
            >
              <div className="highlight-content">
                <h2 className="highlight-title">{title}</h2>
                <p className="highlight-description">{description}</p>
              </div>
            </div>
        ))}
      </div>
  );
};

export default Highlights;