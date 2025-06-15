// src/components/Footer.jsx


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>📞 Байланыш</h3>
                        <a href="tel:+79773230449">+7 (977) 323-04-49</a>
                        <a href="mailto:abaztoktorbaev89@gmail.com">abaztoktorbaev89@gmail.com</a>
                    </div>
                    <div className="footer-section">
                        <h3>👤 Жөнүндө</h3>
                        <p>Токторбаев Абаз Кубанычбекович</p>
                        <p>Овощилер сатуучусу</p>
                    </div>
                    <div className="footer-section">
                        <h3>🕒 Иш убактысы</h3>
                        <p>Дүйшөмбүдөн жекшенбиге</p>
                        <p>08:00 - 20:00</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;