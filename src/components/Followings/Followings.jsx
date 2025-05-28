import { MdCancel } from "react-icons/md"; 
import './followings.css'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import AddStorage from '../Add-Delete-Localsorage/Add-Delete-Localsorage';
export default function Followings() {
    const [followings, setFollowings] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const storedFollowings = localStorage.getItem('following') || '[]';
        setFollowings(JSON.parse(storedFollowings));
    }, [refresh]);



    return (
        <div className="followers-page">
            <h2 className="page-title">Following</h2>
            <div className="followers-container">
                {followings.length === 0 ? (
                    <div className="empty-state">
                        <p>You are not following anyone yet</p>
                    </div>
                ) : (
                    <div className="followers-grid">
                        {followings.map((follower) => (

                            <div 
                                key={follower.id} 
                                className="follower-card"
                            >

                                <div className="follower-image">
                                <Link to="/movies-page"  state={{ actorName: follower.name }}>
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w185${follower.profile_path}`}
                                        alt={follower.name}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/185x185?text=No+Image';
                                        }}
                                    />
                                </Link>
                                <a href="#">

                                    <p className="unfllow-btn"  
                                    onClick={() => {
                                        AddStorage('following', follower);
                                        setRefresh(refresh + 1);
                                    }}
                                    ><MdCancel className="x"/></p>
                                </a>
                                </div>
                                <div className="follower-info">
                                    <h3>{follower.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
