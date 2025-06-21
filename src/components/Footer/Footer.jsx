import './Footer.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo'

export default function Footer() {
    return (
        <footer className="footer" data-aos="fade-up">
            <div className="footer-content">
                <div className="footer-brand">
                    <Logo />
                    <p className="footer-email">fadyn940@gmail.com</p>
                </div>
                
                <div className="footer-nav">
                    <Link to="/">Home</Link>
                    <Link to="/movies-page">Movies</Link>
                    <Link to="/favorites-page">Favorites</Link>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p className="copyright">© 2024 Fady Nader. All rights reserved.</p>
            </div>
        </footer>
    );
}