import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Users, Instagram, Languages } from 'lucide-react';
import './BusinessCard.scss'; // SCSS файлын импорттоо

export default function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [language, setLanguage] = useState('kyrgyz'); // kyrgyz, russian, english

  const translations = {
    kyrgyz: {
      name: "Токторбаев Абаз",
      position: "ООСО Футмастер",
      location: "г Москва",
      flipHint: "Тескерисин көрүү үчүн басыңыз",
      contactChannels: "Байланыш каналдары",
      backHint: "Кайра көрүү үчүн басыңыз",
      bottomHint: "Визиткада басып, аны буруңуз"
    },
    russian: {
      name: "Токторбаев Абаз",
      position: "ООСО Футмастер",
      location: "г Москва",
      flipHint: "Нажмите, чтобы перевернуть",
      contactChannels: "Каналы связи",
      backHint: "Нажмите, чтобы вернуться",
      bottomHint: "Нажмите на визитку, чтобы перевернуть"
    },
    english: {
      name: "Toktorbaev Abaz",
      position: "LLC Footmaster",
      location: "Moscow",
      flipHint: "Click to flip",
      contactChannels: "Contact Channels",
      backHint: "Click to return",
      bottomHint: "Click on the card to flip it"
    }
  };

  const currentTranslation = translations[language];

  const cycleLanguage = (e) => {
    e.stopPropagation();
    const languages = ['kyrgyz', 'russian', 'english'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const getLanguageFlag = () => {
    switch(language) {
      case 'kyrgyz': return '🇰🇬';
      case 'russian': return '🇷🇺';
      case 'english': return '🇺🇸';
      default: return '🇰🇬';
    }
  };

  return (
    <div className="card-container">
      {/* Language Switcher */}
      <div className="language-switcher">
        <button onClick={cycleLanguage}>
          <Languages size={18} />
          <span>{getLanguageFlag()}</span>
          <span>{language === 'kyrgyz' ? 'КЫР' : language === 'russian' ? 'РУС' : 'ENG'}</span>
        </button>
      </div>

      <div className="card" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Front Side */}
          <div className="card-front">
            <h1>{currentTranslation.name}</h1>
            <p>{currentTranslation.position}</p>
            <div>
              <div>
                <Mail size={16} /> <span>abaztoktorbaev89@gmail.com</span>
              </div>
              <div>
                <Phone size={16} /> <span>+7 977 323 04 49</span>
              </div>
              <div>
                <MapPin size={16} /> <span>{currentTranslation.location}</span>
              </div>
            </div>
            <p>{currentTranslation.flipHint}</p>
          </div>

          {/* Back Side */}
          <div className="card-back">
            <h2>{currentTranslation.contactChannels}</h2>
            <div>
              <a href="https://t.me/abaztoktorbaev">
                <MessageCircle size={20} /> Telegram
              </a>
              <a href="https://wa.me/79773230449">
                <Phone size={20} /> WhatsApp
              </a>
              <a href="#">
                <Users size={20} /> Microsoft Teams
              </a>
              <a href="https://instagram.com/abaz_toktorbaev">
                <Instagram size={20} /> Instagram
              </a>
            </div>
            <p>{currentTranslation.backHint}</p>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <div className="helper-text">
        <p>{currentTranslation.bottomHint}</p>
      </div>
    </div>
  );
}