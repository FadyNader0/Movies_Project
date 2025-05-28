import { MdOutlineLocalMovies } from "react-icons/md"; 
import { AiTwotoneHeart } from "react-icons/ai"; 
import { AiOutlineHome } from "react-icons/ai"; 
import { useState } from "react";
import Search from "../Search/Search";
import './Nav.css'
import { Link, useLocation } from "react-router-dom";
import Followings from "../followings/followings";
import Logo from "../Logo/Logo";
export default function Nav() {
    const location = useLocation(); 
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

  return (
    <>
          <nav className="navBar fixed top-0 z-100 w-full ">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                  <button type="button" className="side-btn inline-flex items-center" onClick={toggleSidebar}>
                      <svg className="w-6 h-6"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                      </svg>
                  </button>
                  <Link to="/" className="flex ms-2 md:me-24">
                    <Logo />
                  </Link>
                </div>
                <div className="flex items-center test">
                    <div className="flex items-center searchIconNav">
                      <Search />
                    </div>
                </div>
              </div>
            </div>
          </nav>

              

          <aside className={`sidebar ${isOpen ? "open" : ""} w-[200px]  fixed top-0 left-0 z-40  h-screen pt-20 transition-transform -translate-x-full  `} key={location.pathname}>
                  <Link to="/" className="side-logo flex ms-2 md:me-24">
                    <Logo />
                  </Link>
                  <div className="searchIconSide  p-2">
                    <Search />
                  </div>

              <div className="sideLinks h-full px-3 pb-4 overflow-y-auto bg-white ">
                
                  <ul className="pagesLinks space-y-2 font-medium pt-5 ">
                    <li>
                      <span className="p-2 text-gray-400">Pages</span>
                    </li>
                      <li>
                          <Link to="/" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 pageLink ${location.pathname === "/" ? "activelink" : ""}`}>
                          <AiOutlineHome  className="iconNav"/>
                          <span className="ms-3 text-xl">Home</span>
                          </Link>
                      </li>
                      <li>
                          <Link to="/movies-page" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 pageLink ${location.pathname === "/movies-page" ? "activelink" : ""}`}>
                          <MdOutlineLocalMovies className="iconNav"/>
                          <span className="flex-1 ms-3 whitespace-nowrap text-xl">Movies</span>
                          </Link>
                      </li>
                      <li>
                          <Link to="/favorites-page" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 pageLink ${location.pathname === "/favorites-page" ? "activelink" : ""}`}>
                          <AiTwotoneHeart className="iconNav"/>
                          <span className="flex-1 ms-3 whitespace-nowrap text-xl">Favourites</span>
                          </Link>
                      </li>
                  </ul>
                  <ul className="followers space-y-2 font-medium pt-5 ">
                  <li>
                      <span className="p-2 text-gray-400">Followers</span>
                  </li>

                    <li className="rounded-lg overflow-auto h-[450px]">
                      <Followings />
                    </li>
                  </ul>
              </div>
          </aside>

          {isOpen && <div className="backdrop" onClick={toggleSidebar}></div>}   
     </>
      

  );
}
