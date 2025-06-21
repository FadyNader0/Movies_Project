import { BsLaptop } from "react-icons/bs"; 
import { BiTv } from "react-icons/bi"; 
import { AiOutlineTablet } from "react-icons/ai"; 
import { AiOutlineMobile } from "react-icons/ai"; 
import './Home.css'
import homeImage from '../../assets/home-image4.jpg'
import  Categories  from "../../components/Home-Catogries/Home-Catogries";
import Faq from '../../components/Faq/Faq'
import Button from "../../components/Button/Button";

export default function Home() {


    return (
        <div className="home-container">
            <div className="movie-grid" style={{ backgroundImage: `url(${homeImage})` }}>
            </div>
            
            <div className="hero-content">
                <h1>The Best Discover Experience</h1>
                <p>Discover your favorite movies and TV shows anytime, anywhere. The ultimate streaming platform for entertainment lovers.</p>
                <Button props={{ name: 'Start Browsing', to: '/movies-page' }} />
            </div>

            <section className="categories-section" data-aos="fade-up">
                <Categories />
            </section>

            <section className="devices-section" data-aos="fade-up">
                <h2>We Provide you discover experience across various devices</h2>
                <div className="devices-grid">
                    <div className="device-card">
                        <i className="device-icon mobile"><AiOutlineMobile /></i>
                        <h3>Smartphones</h3>
                        <p>Watch on your smartphone anytime, anywhere with our mobile app.</p>
                    </div>
                    <div className="device-card">
                        <i className="device-icon tablet"><AiOutlineTablet /></i>
                        <h3>Tablet</h3>
                        <p>Enjoy on your tablet with our optimized tablet experience.</p>
                    </div>
                    <div className="device-card">
                        <i className="device-icon smart-tv"><BiTv /></i>
                        <h3>Smart TV</h3>
                        <p>Stream on your Smart TV for the best viewing experience.</p>
                    </div>
                    <div className="device-card">
                        <i className="device-icon laptop"><BsLaptop /></i>
                        <h3>Laptop</h3>
                        <p>Watch on your laptop with high-quality streaming.</p>
                    </div>
                </div>
            </section>

            <section className="faq-section" data-aos="fade-up">
                    <Faq />
            </section>
        </div>
    );
}
