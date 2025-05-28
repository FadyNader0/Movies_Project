import './Button.css'
import { Link } from 'react-router-dom';


export default function Button({props}) {
    

    return (
        <Link to={props.to} className="cta-button">{props.name}</Link>

    );
}