import React, { useState } from 'react';

const RestaurantAd = () => {
  const [currentLanguage, setCurrentLanguage] = useState('kg'); // kg, ru, en

  // Multilingual content
  const content = {
    kg: {
      restaurantDescription: `🔥 ТАКОЛЕНД - бул мексикалык тамак-аштын эң сонун жери Москвада! 🔥

🌟 Эмне үчүн биз?

🌶️ Таза мексикалык рецепттер боюнча даярдалган тамактар
🥑 Жаңы авокадо, чили жана ароматтуу курч-буурчтар  
🌮 Классикалык такос, буритто, начос жана дагы көптөгөн тамактар

👨‍🍳 Тажрыйбалуу ашпозчулар жана сыпайы кызматкерлер

📍 Дарек: Москва шаары
⏰ Ачык күн сайын: 10:00 - 03:00`
    },
    ru: {
      restaurantDescription: `🔥 ТАКОЛЕНД - Лучший мексиканский ресторан в Москве! 🔥

🌟 Почему именно мы?

🌶️ Аутентичные мексиканские блюда по традиционным рецептам
🥑 Свежие авокадо, перцы чили и ароматные специи
🌮 Классические тако, буррито, начос и многое другое

👨‍🍳 Опытные повара и дружелюбный персонал

📍 Адрес: г. Москва
⏰ Работаем ежедневно: 10:00 - 03:00`
    },
    en: {
      restaurantDescription: `🔥 TACOLAND - The Best Mexican Restaurant in Moscow! 🔥

🌟 Why Choose Us?

🌶️ Authentic Mexican dishes made with traditional recipes
🥑 Fresh avocados, chili peppers and aromatic spices
🌮 Classic tacos, burritos, nachos and much more

👨‍🍳 Experienced chefs and friendly staff

📍 Address: Moscow, Russia
⏰ Open daily: 10:00 - 03:00`
    }
  };

  const restaurantName = {
    kg: 'Таколенд',
    ru: 'Таколенд', 
    en: 'Tacoland'
  };

  // Language flags
  const flags = {
    kg: '🇰🇬',
    ru: '🇷🇺',
    en: '🇺🇸'
  };

  return (
    <div className="restaurant-app">
      <div className="container">
        {/* Language Selector */}
        <div className="language-selector">
          {Object.keys(content).map(lang => (
            <button
              key={lang}
              onClick={() => setCurrentLanguage(lang)}
              className={`language-btn ${currentLanguage === lang ? 'active' : ''}`}
            >
              {flags[lang]} {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Restaurant Advertisement */}
        <div className="restaurant-card">
          <div className="restaurant-header">
            <div className="restaurant-emoji">🌮</div>
            <h2 className="restaurant-name">
              {restaurantName[currentLanguage]}
            </h2>
            <div className="restaurant-divider"></div>
          </div>
          
          <div className="restaurant-description">
            <pre className="description-text">
              {content[currentLanguage].restaurantDescription}
            </pre>
          </div>
        </div>
      </div>

      <style jsx>{`
        .restaurant-app {
          min-height: 100vh;
          background: linear-gradient(135deg, #fff7ed, #fef2f2, #fffbeb);
          padding: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
        }

        .language-selector {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .language-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          border: 2px solid #d1d5db;
          background: white;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          font-size: 1rem;
        }

        .language-btn:hover {
          border-color: #f87171;
          background: #fef2f2;
          transform: translateY(-2px);
        }

        .language-btn.active {
          border-color: #ef4444;
          background: #ef4444;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        }

        .restaurant-card {
          background: white;
          border-radius: 2rem;
          padding: 3rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid #fed7aa;
          transition: all 0.3s ease;
        }

        .restaurant-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
        }

        .restaurant-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .restaurant-emoji {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .restaurant-name {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #dc2626, #ea580c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .restaurant-divider {
          width: 8rem;
          height: 0.25rem;
          background: linear-gradient(to right, #ef4444, #f97316);
          margin: 0 auto;
          border-radius: 9999px;
        }

        .restaurant-description {
          background: linear-gradient(135deg, #fff7ed, #fef2f2);
          border-radius: 1.5rem;
          padding: 2rem;
          border: 2px solid #fed7aa;
        }

        .description-text {
          color: #374151;
          line-height: 1.8;
          white-space: pre-wrap;
          font-family: inherit;
          font-size: 1.1rem;
          margin: 0;
          text-align: left;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0.5rem;
          }
          
          .restaurant-card {
            padding: 2rem;
          }
          
          .restaurant-name {
            font-size: 2rem;
          }
          
          .restaurant-emoji {
            font-size: 3rem;
          }
          
          .description-text {
            font-size: 1rem;
          }
          
          .language-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RestaurantAd;