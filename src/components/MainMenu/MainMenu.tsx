import { Link } from 'react-router-dom';
import './MainMenu.css';

function MainMenu() {
    return (
        <div className="mainMenu">
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/schedules">Расписания</Link></li>
                <li><Link to="/meals">Приёмы пищи</Link></li>
                <li><Link to="/dishes">Блюда</Link></li>
                <li><Link to="/ingredients">Ингридиенты</Link></li>
                <li><Link to="/settings">Настройки</Link></li>
            </ul>
        </div>
    );
}

export default MainMenu;