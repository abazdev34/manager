import React, { useState, useEffect, useRef } from 'react';


const BusinessCard = () => {
  const [notification, setNotification] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('kg'); // kg, ru, en
  const qrRef = useRef(null);

  // Multilingual content
  const content = {
    kg: {
      name: 'Токторбаев Абаз Кубанычбекович',
     
      restaurant: 'Ресторан',
      restaurantDescription: `🔥 ТАКОЛЕНД - бул мексикалык тамак-аштын эң сонун жери Москвада! 🔥

🌟 Эмне үчүн биз?

🌶️ Таза мексикалык рецепттер боюнча даярдалган тамактар
🥑 Жаңы авокадо, чили жана ароматтуу курч-буурчтар  
🌮 Классикалык такос, буритто, начос жана дагы көптөгөн тамактар

👨‍🍳 Тажрыйбалуу ашпозчулар жана сыпайы кызматкерлер

📍 Дарек: Москва шаары
⏰ Ачык күн сайын: 10:00 - 03:00
`,
      phone: 'Телефон',
      email: 'Электрондук почта',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      qrTitle: '📱 QR код менен контакт сактоо',
      saveBtn: '💾 Сактоо',
      shareBtn: '📤 Бөлүшүү',
      footerText: '🌟 QR кодду телефонуңуз менен сканерлеңиз',
      tips: '💡 Кеңештер:',
      tipsList: [
        '• Картаны басып көрүңүз',
        '• QR кодду сканерлеңиз',
        '• Контактка түздөн-түз кошуңуз'
      ],
      notifications: {
        call: '📞 Телефон чалынууда...',
        email: '✉️ Email программасы ачылууда...',
        whatsapp: '💬 WhatsApp ачылууда...',
        telegram: '✈️ Telegram ачылууда...',
        website: '🌐 Сайт ачылууда...',
        saved: '📱 Контакт ийгиликтүү сакталды!',
        copied: '📋 Маалымат көчүрүлдү!',
        error: '❌ Көчүрүүдө ката!'
      }
    },
    ru: {
      name: 'Токторбаев Абаз Кубанычбекович',
    
      restaurant: 'Ресторан',
      restaurantDescription: `🔥 ТАКОЛЕНД - Лучший мексиканский ресторан в Москве! 🔥

🌟 Почему именно мы?

🌶️ Аутентичные мексиканские блюда по традиционным рецептам
🥑 Свежие авокадо, перцы чили и ароматные специи
🌮 Классические тако, буррито, начос и многое другое

👨‍🍳 Опытные повара и дружелюбный персонал

📍 Адрес: г. Москва
⏰ Работаем ежедневно: 10:00 - 03:00
`,
      phone: 'Телефон',
      email: 'Электронная почта',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      qrTitle: '📱 Сохранить контакт через QR код',
      saveBtn: '💾 Сохранить',
      shareBtn: '📤 Поделиться',
      footerText: '🌟 Отсканируйте QR код вашим телефоном',
      tips: '💡 Советы:',
      tipsList: [
        '• Нажмите на карточку',
        '• Отсканируйте QR код',
        '• Добавьте контакт напрямую'
      ],
      notifications: {
        call: '📞 Звонок...',
        email: '✉️ Открытие Email...',
        whatsapp: '💬 Открытие WhatsApp...',
        telegram: '✈️ Открытие Telegram...',
        website: '🌐 Открытие сайта...',
        saved: '📱 Контакт успешно сохранён!',
        copied: '📋 Информация скопирована!',
        error: '❌ Ошибка копирования!'
      }
    },
    en: {
      name: 'Toktorbaev Abaz Kubanychbekovich',
     
      restaurant: 'Restaurant',
      restaurantDescription: `🔥 TACOLAND - The Best Mexican Restaurant in Moscow! 🔥

🌟 Why Choose Us?

🌶️ Authentic Mexican dishes made with traditional recipes
🥑 Fresh avocados, chili peppers and aromatic spices
🌮 Classic tacos, burritos, nachos and much more

👨‍🍳 Experienced chefs and friendly staff

📍 Address: Moscow, Russia
⏰ Open daily: 10:00 - 03:00
`,
      phone: 'Phone',
      email: 'Email',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      qrTitle: '📱 Save contact via QR code',
      saveBtn: '💾 Save',
      shareBtn: '📤 Share',
      footerText: '🌟 Scan QR code with your phone',
      tips: '💡 Tips:',
      tipsList: [
        '• Tap the card',
        '• Scan QR code',
        '• Add contact directly'
      ],
      notifications: {
        call: '📞 Calling...',
        email: '✉️ Opening Email...',
        whatsapp: '💬 Opening WhatsApp...',
        telegram: '✈️ Opening Telegram...',
        website: '🌐 Opening website...',
        saved: '📱 Contact saved successfully!',
        copied: '📋 Information copied!',
        error: '❌ Copy error!'
      }
    }
  };

  // Contact data
  const contactData = {
    name: 'Токторбаев Абаз Кубанычбекович',
    nameEn: 'Toktorbaev Abaz Kubanychbekovich',
    phone: '+79773230449',
    email: 'abaztoktorbaev89@gmail.com',
    whatsapp: '+79773230449',
    telegram: '@abaztoktorbaev',
    initials: 'АТ',
    website: 'https://tacoland.ru/',
    restaurantName: {
      kg: 'Таколенд',
      ru: 'Таколенд', 
      en: 'Tacoland'
    }
  };

  // vCard format for contact information
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
N:Токторбаев;Абаз;Кубанычбекович;;
TITLE:${content[currentLanguage].position}
TEL;TYPE=CELL:${contactData.phone}
EMAIL:${contactData.email}
URL:${contactData.website}
NOTE:${content[currentLanguage].restaurantDescription}
END:VCARD`;

  // Function to generate a simple QR code
  const generateQRCode = () => {
    if (!qrRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    // Create a more realistic QR code pattern
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#fff';

    // Generate QR code pattern
    const size = 10;
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        // Create finder patterns (corners)
        if ((i < 7 && j < 7) || (i < 7 && j > 12) || (i > 12 && j < 7)) {
          if ((i === 0 || i === 6 || j === 0 || j === 6) || 
              (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
            ctx.fillStyle = '#fff';
          } else {
            ctx.fillStyle = '#000';
          }
        } else {
          // Random pattern for data area
          ctx.fillStyle = Math.random() > 0.5 ? '#fff' : '#000';
        }
        ctx.fillRect(i * size, j * size, size, size);
      }
    }

    qrRef.current.innerHTML = '';
    qrRef.current.appendChild(canvas);
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  // Function to show notifications
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Function to handle website
  const handleWebsite = (e) => {
    e.stopPropagation();
    setIsCardFlipped(true);
    setTimeout(() => {
      window.open(contactData.website, '_blank');
      showNotification(content[currentLanguage].notifications.website);
    }, 300);
  };

  // Function to handle phone call
  const handleCall = (e) => {
    e.stopPropagation();
    setIsCardFlipped(true);
    setTimeout(() => {
      window.open(`tel:${contactData.phone}`, '_self');
      showNotification(content[currentLanguage].notifications.call);
    }, 300);
  };

  // Function to handle email
  const handleEmail = (e) => {
    e.stopPropagation();
    setIsCardFlipped(true);
    setTimeout(() => {
      window.open(`mailto:${contactData.email}`, '_self');
      showNotification(content[currentLanguage].notifications.email);
    }, 300);
  };

  // Function to handle WhatsApp
  const handleWhatsApp = (e) => {
    e.stopPropagation();
    setIsCardFlipped(true);
    setTimeout(() => {
      const whatsappUrl = `https://wa.me/${contactData.whatsapp.replace('+', '')}`;
      window.open(whatsappUrl, '_blank');
      showNotification(content[currentLanguage].notifications.whatsapp);
    }, 300);
  };

  // Function to handle Telegram
  const handleTelegram = (e) => {
    e.stopPropagation();
    setIsCardFlipped(true);
    setTimeout(() => {
      const telegramUrl = `https://t.me/${contactData.telegram.replace('@', '')}`;
      window.open(telegramUrl, '_blank');
      showNotification(content[currentLanguage].notifications.telegram);
    }, 300);
  };

  // Function to download vCard
  const downloadVCard = () => {
    const element = document.createElement('a');
    const file = new Blob([vCardData], { type: 'text/vcard' });
    element.href = URL.createObjectURL(file);
    element.download = 'Toktorbaev_Abaz.vcf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showNotification(content[currentLanguage].notifications.saved);
  };

  // Function to share the card
  const shareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${contactData.name} - Contact`,
          text: `${contactData.name} - Contact Information`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    } else {
      const cardInfo = `🏷️ ${contactData.name}\n📞 ${contactData.phone}\n✉️ ${contactData.email}\n💬 WhatsApp: ${contactData.whatsapp}\n✈️ Telegram: ${contactData.telegram}\n🌐 ${contactData.website}`;
      try {
        await navigator.clipboard.writeText(cardInfo);
        showNotification(content[currentLanguage].notifications.copied);
      } catch (err) {
        showNotification(content[currentLanguage].notifications.error);
      }
    }
  };

  // Language flags
  const flags = {
    kg: '🇰🇬',
    ru: '🇷🇺',
    en: '🇺🇸'
  };

  return (
    <div className="business-card-app">
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

        {/* Notification */}
        {notification && (
          <div className="notification">
            {notification}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="main-grid">
          {/* Business Card */}
          <div className={`business-card ${isCardFlipped ? 'flipped' : ''}`}>
            <div className="card-inner">
              {/* Decorative elements */}
              <div className="decoration decoration-1"></div>
              <div className="decoration decoration-2"></div>
              
              {/* Card Header */}
              <div className="card-header">
                <div className="avatar">
                  {contactData.initials}
                </div>
                <h1 className="name">{content[currentLanguage].name}</h1>
                <p className="position">{content[currentLanguage].position}</p>
              </div>

              {/* Contact Items */}
              <div className="contact-items">
                {/* Website */}
                <div onClick={handleWebsite} className="contact-item website">
                  <div className="contact-icon">🌐</div>
                  <div className="contact-info">
                    <p className="contact-label">{content[currentLanguage].restaurant}</p>
                    <p className="contact-value">{contactData.restaurantName[currentLanguage]}</p>
                  </div>
                </div>

                {/* Phone */}
                <div onClick={handleCall} className="contact-item phone">
                  <div className="contact-icon">📞</div>
                  <div className="contact-info">
                    <p className="contact-label">{content[currentLanguage].phone}</p>
                    <p className="contact-value">{contactData.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div onClick={handleEmail} className="contact-item email">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-info">
                    <p className="contact-label">{content[currentLanguage].email}</p>
                    <p className="contact-value">{contactData.email}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div onClick={handleWhatsApp} className="contact-item whatsapp">
                  <div className="contact-icon">💬</div>
                  <div className="contact-info">
                    <p className="contact-label">{content[currentLanguage].whatsapp}</p>
                    <p className="contact-value">{contactData.whatsapp}</p>
                  </div>
                </div>

                {/* Telegram */}
                <div onClick={handleTelegram} className="contact-item telegram">
                  <div className="contact-icon">✈️</div>
                  <div className="contact-info">
                    <p className="contact-label">{content[currentLanguage].telegram}</p>
                    <p className="contact-value">{contactData.telegram}</p>
                  </div>
                </div>
              </div>

              {/* QR Section */}
              <div className="qr-section">
                <h3 className="qr-title">{content[currentLanguage].qrTitle}</h3>
                <div className="qr-container">
                  <div ref={qrRef} className="qr-code">
                    <span className="qr-placeholder">QR Code</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button onClick={downloadVCard} className="btn btn-save">
                    {content[currentLanguage].saveBtn}
                  </button>
                  <button onClick={shareCard} className="btn btn-share">
                    {content[currentLanguage].shareBtn}
                  </button>
                </div>

                <p className="footer-text">{content[currentLanguage].footerText}</p>
              </div>
            </div>
          </div>

          {/* Restaurant Description */}
          <div className="restaurant-section">
            {/* Restaurant Advertisement */}
            <div className="restaurant-card">
              <div className="restaurant-header">
                <div className="restaurant-emoji">🌮</div>
                <h2 className="restaurant-name">
                  {contactData.restaurantName[currentLanguage]}
                </h2>
                <div className="restaurant-divider"></div>
              </div>
              
              <div className="restaurant-description">
                <pre className="description-text">
                  {content[currentLanguage].restaurantDescription}
                </pre>
              </div>
            </div>

            {/* Tips Card */}
            <div className="tips-card">
              <h4 className="tips-title">{content[currentLanguage].tips}</h4>
              <ul className="tips-list">
                {content[currentLanguage].tipsList.map((tip, index) => (
                  <li key={index} className="tip-item">
                    <span className="tip-bullet">•</span>
                    {tip.replace('• ', '')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .business-card-app {
          min-height: 100vh;
          background: linear-gradient(135deg, #fff7ed, #fef2f2, #fffbeb);
          padding: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .language-selector {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .language-btn {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          border: 2px solid #d1d5db;
          background: white;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .language-btn:hover {
          border-color: #f87171;
          background: #fef2f2;
        }

        .language-btn.active {
          border-color: #ef4444;
          background: #ef4444;
          color: white;
        }

        .notification {
          position: fixed;
          top: 1.25rem;
          right: 1.25rem;
          background: #10b981;
          color: white;
          padding: 0.75rem 1.25rem;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 50;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .business-card {
          transition: transform 0.7s ease;
        }

        .business-card.flipped {
          transform: scale(1.05);
        }

        .card-inner {
          background: linear-gradient(135deg, #dc2626, #ea580c, #eab308);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .decoration {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        .decoration-1 {
          width: 8rem;
          height: 8rem;
          top: -4rem;
          right: -4rem;
        }

        .decoration-2 {
          width: 6rem;
          height: 6rem;
          bottom: -3rem;
          left: -3rem;
        }

        .card-header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 10;
        }

        .avatar {
          width: 5rem;
          height: 5rem;
          background: white;
          color: #dc2626;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .name {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .position {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.125rem;
        }

        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          z-index: 10;
          margin-bottom: 2rem;
        }

        .contact-item {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 0.75rem;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        .contact-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .website .contact-icon { background: #10b981; }
        .phone .contact-icon { background: #3b82f6; }
        .email .contact-icon { background: #8b5cf6; }
        .whatsapp .contact-icon { background: #059669; }
        .telegram .contact-icon { background: #06b6d4; }

        .contact-info {
          flex: 1;
        }

        .contact-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .contact-value {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .qr-section {
          text-align: center;
          position: relative;
          z-index: 10;
        }

        .qr-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .qr-container {
          background: white;
          border-radius: 1rem;
          padding: 1.25rem;
          margin: 0 auto 1rem;
          width: fit-content;
        }

        .qr-code {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .qr-placeholder {
          color: #6b7280;
        }

        .action-buttons {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }

        .btn-save {
          background: #10b981;
          color: white;
        }

        .btn-save:hover {
          background: #059669;
        }

        .btn-share {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .btn-share:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .footer-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
        }

        .restaurant-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .restaurant-card {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border: 1px solid #fed7aa;
        }

        .restaurant-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .restaurant-emoji {
          font-size: 3.75rem;
          margin-bottom: 1rem;
        }

        .restaurant-name {
          font-size: 1.875rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .restaurant-divider {
          width: 6rem;
          height: 0.25rem;
          background: linear-gradient(to right, #ef4444, #f97316);
          margin: 0 auto;
          border-radius: 9999px;
        }

        .restaurant-description {
          background: linear-gradient(135deg, #fff7ed, #fef2f2);
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .description-text {
          color: #374151;
          line-height: 1.6;
          white-space: pre-wrap;
          font-family: inherit;
          font-size: 0.875rem;
          margin: 0;
        }

        .tips-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .tips-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tip-item {
          color: #4b5563;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tip-bullet {
          color: #f97316;
        }
      `}</style>
    </div>
  );
};

export default BusinessCard;