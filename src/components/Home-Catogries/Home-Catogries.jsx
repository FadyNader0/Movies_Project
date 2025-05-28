import './Home-Catogries.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import catogry_image from '../../assets/home-image3.jpg'


export default function HomeCatogries() {
  const [Genres, setGenres] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTI4NWNkMDBkNzQ1MmNiNDkzNDY0NjAzNTE1NmI5YyIsIm5iZiI6MTc0NTg4MDIwNi42ODcsInN1YiI6IjY4MTAwNDhlNWE5Yjc4ZDI3MjgxNzNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hF1Y7JR5jBANGzeoO1kGD0dhvVG_Y-w8s1vsMCEsEW0', 
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list', options)
      .then(res => res.json())
      .then(data => {
        setGenres(data.genres);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

        

    return (
        <div className="categories-container">
            <h2 className="categories-title">Explore our wide variety of categories</h2>
            <Swiper
                modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
                effect="coverflow"
                grabCursor={true}
                // centeredSlides={true}
                spaceBetween={30}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    668: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}                
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                
                className="mySwiper"
            >
                {Genres.map((Genre) => (
                    <SwiperSlide>
                        <div className="catgory-card">
                            <div className="catgory-image">
                                <img src={catogry_image} alt="" />
                            </div>
                            <div className="catgory-content">
                                <h3>{Genre.name}</h3>
                                <Link
                                  to="/movies-page"
                                  state={{ GgenreId: Genre.id }}  
                                  className="watch-btn"
                                >
                                  Discover Now
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}