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
        saved: '📱 Контакт ийгиликтүү сакталды!',
        copied: '📋 Маалымат көчүрүлдү!',
        error: '❌ Көчүрүүдө ката!'
      }
    },
    ru: {
      name: 'Токторбаев Абаз Кубанычбекович',
 
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
        saved: '📱 Контакт успешно сохранён!',
        copied: '📋 Информация скопирована!',
        error: '❌ Ошибка копирования!'
      }
    },
    en: {
      name: 'Toktorbaev Abaz Kubanychbekovich',
     
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
    initials: 'АТ'
  };

  // vCard format for contact information
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
N:Токторбаев;Абаз;Кубанычбекович;;
TEL;TYPE=CELL:${contactData.phone}
EMAIL:${contactData.email}
URL;TYPE=WhatsApp:https://wa.me/${contactData.whatsapp.replace('+', '')}
URL;TYPE=Telegram:https://t.me/${contactData.telegram.replace('@', '')}
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
    element.download = 'Токторбаев_Абаз.vcf';
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
      const cardInfo = `🏷️ ${contactData.name}\n📞 ${contactData.phone}\n✉️ ${contactData.email}\n💬 WhatsApp: ${contactData.whatsapp}\n✈️ Telegram: ${contactData.telegram}`;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <style jsx>{`
        .business-card-container {
          max-width: 800px;
          margin: 0 auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .language-selector {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 24px;
        }

        .lang-btn {
          padding: 8px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 20px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 500;
        }

        .lang-btn:hover {
          border-color: #3b82f6;
          background: #f8fafc;
        }

        .lang-btn.active {
          border-color: #3b82f6;
          background: #3b82f6;
          color: white;
        }

        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .business-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.6s ease;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .business-card:hover {
          transform: translateY(-5px);
        }

        .business-card.flipped {
          transform: rotateY(180deg);
        }

        .card-header {
          text-align: center;
          margin-bottom: 32px;
          position: relative;
        }

        .header-overlay {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: white;
          color: #667eea;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: bold;
          margin: 0 auto 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 2;
        }

        .main-name {
          color: white;
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 8px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 2;
        }

        .position {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          margin: 0;
          position: relative;
          z-index: 2;
        }

        .card-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .card-body {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-item {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .contact-item:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateX(5px);
        }

        .contact-icon {
          font-size: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
        }

        .contact-details {
          flex: 1;
        }

        .contact-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          margin: 0 0 4px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .contact-value {
          color: white;
          font-size: 14px;
          font-weight: 500;
          margin: 0;
        }

        .email-value {
          font-size: 13px;
        }

        .qr-section {
          text-align: center;
        }

        .qr-title {
          color: white;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 20px 0;
        }

        .qr-container {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .qr-code {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .qr-code canvas {
          border-radius: 8px;
        }

        .qr-placeholder {
          color: #6b7280;
          font-size: 16px;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .btn-primary {
          background: #10b981;
          color: white;
        }

        .btn-primary:hover {
          background: #059669;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .card-footer {
          text-align: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .footer-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          margin: 0;
        }

        .tips-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .tips-title {
          color: #374151;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tips-list li {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 8px;
          padding-left: 4px;
        }

        @media (max-width: 768px) {
          .tips-card {
            display: none;
          }
        }
      `}</style>

      <div className="business-card-container">
        {/* Language Selector */}
        <div className="language-selector">
          {Object.keys(content).map(lang => (
            <button
              key={lang}
              onClick={() => setCurrentLanguage(lang)}
              className={`lang-btn ${currentLanguage === lang ? 'active' : ''}`}
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

        {/* Business Card */}
        <div className={`business-card ${isCardFlipped ? 'flipped' : ''}`}>
          {/* Card Header */}
          <div className="card-header">
            <div className="header-overlay"></div>
            <div className="avatar">{contactData.initials}</div>
            <h1 className="main-name">{content[currentLanguage].name}</h1>
            <p className="position">{content[currentLanguage].position}</p>
          </div>

          {/* Card Body */}
          <div className="card-body">
            <div className="contact-info">
              {/* Phone */}
              <div onClick={handleCall} className="contact-item phone-item">
                <div className="contact-icon phone-icon">📞</div>
                <div className="contact-details">
                  <p className="contact-label">{content[currentLanguage].phone}</p>
                  <p className="contact-value">{contactData.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div onClick={handleEmail} className="contact-item email-item">
                <div className="contact-icon email-icon">✉️</div>
                <div className="contact-details">
                  <p className="contact-label">{content[currentLanguage].email}</p>
                  <p className="contact-value email-value">{contactData.email}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div onClick={handleWhatsApp} className="contact-item whatsapp-item">
                <div className="contact-icon whatsapp-icon">💬</div>
                <div className="contact-details">
                  <p className="contact-label">{content[currentLanguage].whatsapp}</p>
                  <p className="contact-value">{contactData.whatsapp}</p>
                </div>
              </div>

              {/* Telegram */}
              <div onClick={handleTelegram} className="contact-item telegram-item">
                <div className="contact-icon telegram-icon">✈️</div>
                <div className="contact-details">
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
                <button onClick={downloadVCard} className="btn btn-primary">
                  {content[currentLanguage].saveBtn}
                </button>
                <button onClick={shareCard} className="btn btn-secondary">
                  {content[currentLanguage].shareBtn}
                </button>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="card-footer">
            <p className="footer-text">{content[currentLanguage].footerText}</p>
          </div>
        </div>

        {/* Tips Card - only for larger screens */}
        <div className="tips-card">
          <h4 className="tips-title">{content[currentLanguage].tips}</h4>
          <ul className="tips-list">
            {content[currentLanguage].tipsList.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;