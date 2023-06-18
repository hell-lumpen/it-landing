import React from 'react';
import vk from '../static/img/vk.png';
import mail from '../static/img/gmail.png';
import telegram from '../static/img/telegram.png';

function Footer() {
  return (
      <footer>
        <p>© {new Date().getFullYear()} IT-центр МАИ. Все права защищены.</p>
        <div className="social-media-icons" style={socialMediaIconsStyles}>
          <a href="https://vk.com/itmai" style={iconLinkStyles} target="_blank" rel="noopener noreferrer">
            <img src={vk} alt="VK" height={30} width={30} style={iconStyles} />
          </a>
          <a href="https://t.me/itcmai" style={iconLinkStyles} target="_blank" rel="noopener noreferrer">
            <img src={telegram} alt="Telegram" height={30} width={30} style={iconStyles} />
          </a>
          <a href="mailto:itcentrmai@gmail.com" style={iconLinkStyles} target="_blank" rel="noopener noreferrer">
            <img src={mail} alt="Email" height={30} width={30} style={iconStyles} />
          </a>
        </div>
      </footer>
  );
}

const socialMediaIconsStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
};

const iconLinkStyles = {
  marginRight: '10px',
};

const iconStyles = {
  marginRight: '5px',
};

export default Footer;