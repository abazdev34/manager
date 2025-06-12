import React, { useState, useEffect, useRef } from 'react';

const BusinessCard = () => {
  const [notification, setNotification] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const qrRef = useRef(null);

  // Contact data
  const contactData = {
    name: 'Токторбаев Абаз Кубанычбекович',
    nameKg: 'Токторбаев Абаз Кубанычбекович',
    phone: '+79773230449',
    email: 'abaztoktorbaev89@gmail.com',
    initials: 'АТ'
  };

  // vCard format for contact information
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
N:Токторбаев;Абаз;Кубанычбекович;;
TEL;TYPE=CELL:${contactData.phone}
EMAIL:${contactData.email}
END:VCARD`;

  // Function to generate a simple QR code
  const generateQRCode = () => {
    if (!qrRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    // Simulating a QR code
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#fff';

    // Randomly generating QR code pattern
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(i * 10, j * 10, 10, 10);
        }
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
  const handleCall = () => {
    window.open(`tel:${contactData.phone}`, '_self');
    showNotification('📞 Телефон чалынууда...');
  };

  // Function to handle email
  const handleEmail = () => {
    window.open(`mailto:${contactData.email}`, '_self');
    showNotification('✉️ Email программасы ачылууда...');
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
    showNotification('📱 Контакт ийгиликтүү сакталды!');
  };

  // Function to share the card
  const shareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Токторбаев Абаз - Контакт',
          text: 'Токторбаев Абаз Кубанычбековичтин контакттык маалыматтары',
          url: window.location.href
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    } else {
      const cardInfo = `🏷️ ${contactData.name}\n📞 ${contactData.phone}\n✉️ ${contactData.email}`;
      try {
        await navigator.clipboard.writeText(cardInfo);
        showNotification('📋 Маалымат көчүрүлдү!');
      } catch (err) {
        showNotification('❌ Көчүрүүдө ката!');
      }
    }
  };

  return (
    <>
      <div className="business-card-container">
        {/* Notification */}
        {notification && (
          <div className="notification">
            {notification}
          </div>
        )}

        {/* Business Card */}
        <div 
          className={`business-card ${isCardFlipped ? 'flipped' : ''}`}
          onClick={() => setIsCardFlipped(!isCardFlipped)}
        >
          {/* Card Header */}
          <div className="card-header">
            <div className="header-overlay"></div>
            <div className="avatar">{contactData.initials}</div>
            <h1 className="main-name">{contactData.name}</h1>
            <p className="kyrgyz-name">{contactData.nameKg}</p>
          </div>

          {/* Card Body */}
          <div className="card-body">
            <div className="contact-info">
              {/* Phone */}
              <div onClick={handleCall} className="contact-item phone-item">
                <div className="contact-icon phone-icon">📞</div>
                <div className="contact-details">
                  <p className="contact-label">Телефон</p>
                  <p className="contact-value">{contactData.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div onClick={handleEmail} className="contact-item email-item">
                <div className="contact-icon email-icon">✉️</div>
                <div className="contact-details">
                  <p className="contact-label">Электрондук почта</p>
                  <p className="contact-value email-value">{contactData.email}</p>
                </div>
              </div>
            </div>

            {/* QR Section */}
            <div className="qr-section">
              <h3 className="qr-title">📱 QR код менен контакт сактоо</h3>
              <div className="qr-container">
                <div ref={qrRef} className="qr-code">
                  <span className="qr-placeholder">QR Code</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button onClick={downloadVCard} className="btn btn-primary">💾 Сактоо</button>
                <button onClick={shareCard} className="btn btn-secondary">📤 Бөлүшүү</button>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="card-footer">
            <p className="footer-text">🌟 QR кодду телефонуңуз менен сканерлеңиз</p>
          </div>
        </div>

        {/* Tips Card - only for larger screens */}
        <div className="tips-card">
          <h4 className="tips-title">💡 Кеңештер:</h4>
          <ul className="tips-list">
            <li>• Картаны басып көрүңүз</li>
            <li>• QR кодду сканерлеңиз</li>
            <li>• Контактка түздөн-түз кошуңуз</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        // SCSS Variables
        $primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        $secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        $success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        $warning-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        
        $shadow-light: 0 4px 6px rgba(0, 0, 0, 0.1);
        $shadow-medium: 0 10px 25px rgba(0, 0, 0, 0.15);
        $shadow-heavy: 0 20px 40px rgba(0, 0, 0, 0.2);
        
        $border-radius: 16px;
        $border-radius-large: 24px;
        $transition-fast: 0.2s ease;
        $transition-medium: 0.3s ease;
        $transition-slow: 0.5s ease;

        // Main styles
        .business-card-container {
          min-height: 100vh;
          background: $primary-gradient;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
          
          @media (max-width: 768px) {
            padding: 0.5rem;
            align-items: flex-start;
            padding-top: 2rem;
          }
        }

        // Notification styles
        .notification {
          position: fixed;
          top: 1rem;
          right: 1rem;
          background: $warning-gradient;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: $border-radius;
          font-weight: 600;
          z-index: 1000;
          box-shadow: $shadow-medium;
          animation: slideInRight 0.3s ease, pulse 2s infinite;
          
          @media (max-width: 768px) {
            top: 0.5rem;
            right: 0.5rem;
            left: 0.5rem;
            text-align: center;
            font-size: 0.9rem;
            padding: 0.6rem 1rem;
          }
        }

        // Business card styles
        .business-card {
          background: white;
          border-radius: $border-radius-large;
          box-shadow: $shadow-heavy;
          overflow: hidden;
          max-width: 400px;
          width: 100%;
          transform: scale(1);
          transition: all $transition-medium;
          cursor: pointer;
          
          &:hover {
            transform: scale(1.02);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          }
          
          &.flipped {
            transform: rotateY(180deg) scale(1.02);
          }
          
          @media (max-width: 768px) {
            max-width: 100%;
            border-radius: $border-radius;
            
            &:hover {
              transform: scale(1.01);
            }
            
            &.flipped {
              transform: rotateY(180deg) scale(1.01);
            }
          }
        }

        // Card header styles
        .card-header {
          background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
          color: white;
          padding: 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          
          @media (max-width: 768px) {
            padding: 1.5rem 1rem;
          }
          
          .header-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
            transform: skewY(-12deg);
          }
        }

        // Avatar styles
        .avatar {
          width: 5rem;
          height: 5rem;
          background: $secondary-gradient;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
          box-shadow: $shadow-medium;
          animation: bounce 2s infinite;
          
          @media (max-width: 768px) {
            width: 4rem;
            height: 4rem;
            font-size: 1.25rem;
            margin-bottom: 0.75rem;
          }
        }

        // Name styles
        .main-name {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
          position: relative;
          z-index: 10;
          
          @media (max-width: 768px) {
            font-size: 1.1rem;
            line-height: 1.3;
          }
        }

        .kyrgyz-name {
          color: rgba(147, 197, 253, 0.9);
          position: relative;
          z-index: 10;
          font-size: 0.9rem;
          
          @media (max-width: 768px) {
            font-size: 0.85rem;
          }
        }

        // Card body styles
        .card-body {
          padding: 1.5rem;
          
          @media (max-width: 768px) {
            padding: 1rem;
          }
        }

        // Contact info styles
        .contact-info {
          margin-bottom: 1.5rem;
          
          @media (max-width: 768px) {
            margin-bottom: 1rem;
          }
        }

        .contact-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: #f8fafc;
          border-radius: $border-radius;
          margin-bottom: 0.75rem;
          cursor: pointer;
          transition: all $transition-fast;
          
          &:hover {
            background: #f1f5f9;
            transform: translateY(-2px);
            box-shadow: $shadow-light;
          }
          
          &:last-child {
            margin-bottom: 0;
          }
          
          @media (max-width: 768px) {
            padding: 0.75rem;
            margin-bottom: 0.5rem;
          }
        }

        .contact-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.125rem;
          margin-right: 1rem;
          transition: transform $transition-fast;
          
          .contact-item:hover & {
            transform: scale(1.1);
          }
          
          @media (max-width: 768px) {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1rem;
            margin-right: 0.75rem;
          }
        }

        .phone-icon {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .email-icon {
          background: linear-gradient(135deg, #ef4444 0%, #fbbf24 100%);
          color: white;
        }

        .contact-details {
          flex: 1;
          min-width: 0;
        }

        .contact-label {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .contact-value {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          
          @media (max-width: 768px) {
            font-size: 1rem;
          }
        }

        .email-value {
          word-break: break-all;
          font-size: 0.875rem;
          
          @media (max-width: 768px) {
            font-size: 0.8rem;
          }
        }

        // QR section styles
        .qr-section {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: $border-radius-large;
          padding: 1.5rem;
          text-align: center;
          
          @media (max-width: 768px) {
            padding: 1rem;
            border-radius: $border-radius;
          }
        }

        .qr-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
          
          @media (max-width: 768px) {
            font-size: 1rem;
            margin-bottom: 0.75rem;
          }
        }

        .qr-container {
          background: white;
          padding: 1rem;
          border-radius: $border-radius;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
          display: inline-block;
          margin-bottom: 1rem;
          
          @media (max-width: 768px) {
            padding: 0.75rem;
            margin-bottom: 0.75rem;
          }
        }

        .qr-code {
          width: 8rem;
          height: 8rem;
          background: #e5e7eb;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          canvas {
            border-radius: 8px;
            max-width: 100%;
            max-height: 100%;
          }
          
          @media (max-width: 768px) {
            width: 6rem;
            height: 6rem;
          }
        }

        .qr-placeholder {
          color: #9ca3af;
          font-size: 0.875rem;
          
          @media (max-width: 768px) {
            font-size: 0.75rem;
          }
        }

        // Action buttons styles
        .action-buttons {
          display: flex;
          gap: 0.75rem;
          
          @media (max-width: 768px) {
            gap: 0.5rem;
            flex-direction: column;
          }
        }

        .btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all $transition-fast;
          font-size: 0.875rem;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: $shadow-medium;
          }
          
          &:active {
            transform: translateY(0);
          }
          
          @media (max-width: 768px) {
            padding: 0.875rem 1rem;
            font-size: 0.9rem;
          }
        }

        .btn-primary {
          background: $success-gradient;
          color: white;
          
          &:hover {
            box-shadow: 0 10px 25px rgba(79, 172, 254, 0.3);
          }
        }

        .btn-secondary {
          background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
          color: white;
          
          &:hover {
            box-shadow: 0 10px 25px rgba(107, 114, 128, 0.3);
          }
        }

        // Card footer styles
        .card-footer {
          background: #f8fafc;
          padding: 1rem 1.5rem;
          text-align: center;
          
          @media (max-width: 768px) {
            padding: 0.75rem 1rem;
          }
        }

        .footer-text {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0;
          
          @media (max-width: 768px) {
            font-size: 0.7rem;
          }
        }

        // Tips card styles
        .tips-card {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 1rem;
          border-radius: 12px;
          max-width: 16rem;
          
          @media (max-width: 768px) {
            display: none;
          }
        }

        .tips-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .tips-list {
          font-size: 0.8rem;
          margin: 0;
          padding-left: 0;
          list-style: none;
          
          li {
            margin-bottom: 0.25rem;
            
            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        // Animations
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -10px, 0);
          }
          70% {
            transform: translate3d(0, -5px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }

        // Additional responsive styles
        @media (max-width: 480px) {
          .business-card-container {
            padding: 0.25rem;
            padding-top: 1rem;
          }
          
          .card-header {
            padding: 1rem 0.75rem;
          }
          
          .main-name {
            font-size: 1rem;
            line-height: 1.2;
          }
          
          .contact-item {
            padding: 0.6rem;
          }
          
          .contact-icon {
            width: 2.25rem;
            height: 2.25rem;
            margin-right: 0.6rem;
          }
          
          .contact-value {
            font-size: 0.9rem;
          }
          
          .email-value {
            font-size: 0.75rem;
          }
          
          .qr-code {
            width: 5rem;
            height: 5rem;
          }
        }

        // Landscape orientation for mobile
        @media (max-width: 768px) and (orientation: landscape) {
          .business-card-container {
            padding-top: 0.5rem;
            align-items: center;
          }
          
          .avatar {
            width: 3.5rem;
            height: 3.5rem;
            font-size: 1.1rem;
          }
          
          .card-header {
            padding: 1rem;
          }
        }

        // High screens
        @media (min-height: 900px) {
          .business-card-container {
            align-items: center;
          }
        }

        // Very small screens
        @media (max-width: 320px) {
          .main-name {
            font-size: 0.9rem;
          }
          
          .kyrgyz-name {
            font-size: 0.8rem;
          }
          
          .contact-value {
            font-size: 0.85rem;
          }
          
          .email-value {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </>
  );
};

export default BusinessCard;