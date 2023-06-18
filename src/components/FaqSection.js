import React, { useState } from 'react';
import '../styles/FaqSection.css'

const FaqSection = ({ faqs }) => {
  const [selectedFaq, setSelectedFaq] = useState(null);

  const handleFaqClick = (index) => {
    if (selectedFaq === index) {
      setSelectedFaq(null);
    } else {
      setSelectedFaq(index);
    }
  };

  return (
      <div className="faq-section">
        {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div
                  className={`faq-question ${selectedFaq === index ? 'active' : ''}`}
                  onClick={() => handleFaqClick(index)}
              >
                {faq.question}
              </div>
              {selectedFaq === index && <p className="faq-answer">{faq.answer}</p>}
            </div>
        ))}
      </div>
  );
};

export default FaqSection;