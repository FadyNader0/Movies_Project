import { AiFillCloseCircle } from "react-icons/ai"; 
import './search.css';
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [isActive, setIsActive] = useState(false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
   

    const openSearch = () => setIsActive(true);

    const closeSearch = (e) => {
        e.stopPropagation();
        setIsActive(false);
    };

    const handleSearch = (e) => {
        e.stopPropagation();
        const query = searchInputRef.current.value.trim();
        if (query) {
            navigate(`/movies-page?query=${encodeURIComponent(query)}`);
            searchInputRef.current.value = ""; 
            setIsActive(false);
        }
    };

    return (
        <div
            className={`${isActive ? 'active' : ''} search-comp  p-5 overflow-hidden w-[50px] h-[50px]  shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex items-center duration-300`}
            onClick={openSearch}
        >
            <div className="flex items-center justify-center fill-white search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 24" width={22} height={22}>
                    <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
                </svg>
            </div>
            <div
                className="flex items-center justify-center fill-white cursor-pointer search-link"
                onClick={handleSearch}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 24" width={22} height={22}>
                    <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
                </svg>
            </div>

            {isActive && (
                <div className="input flex items-center ml-2">
                    <input
                        type="text"
                        className="outline-none text-[20px] bg-transparent text-white font-normal px-4 w-full"
                        placeholder="Search Movie..."
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        ref={searchInputRef}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                    />
                    <button onClick={closeSearch}>
                        <AiFillCloseCircle className="cancel-icon text-white text-xl ml-2" />
                    </button>
                </div>
            )}
        </div>
    );
}
