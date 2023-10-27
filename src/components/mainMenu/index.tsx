import { Link } from 'react-router-dom';
import './index.css';

function MainMenu() {
    return (
        <div className="mainMenu">
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/events">События</Link></li>
                <li><Link to="/dishes">Блюда</Link></li>
                <li><Link to="/ingredients">Ингридиенты</Link></li>
                <li><Link to="/settings">Настройки</Link></li>
            </ul>
        </div>
    );
}

export default MainMenu;