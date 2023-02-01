import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from "../MainMenu/MainMenu";
import Home from '../Home/Home';
import Schedules from '../Schedules/Schedules';
import Meals from '../Meals/Meals';
import Dishes from '../Dishes/Dishes';
import Ingredients from '../Ingredients/Ingredients';
import Settings from '../Settings/Settings';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './MyRecipeApp.css';

function MyRecipeApp() {
    return (
        <div className="myRecipeApp">
            <BrowserRouter>
                <div className="menuContent">
                    <MainMenu />
                </div>
                <div className="pageContent">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/schedules" element={<Schedules />} />
                        <Route path="/meals" element={<Meals />} />
                        <Route path="/dishes" element={<Dishes />} />
                        <Route path="/ingredients" element={<Ingredients />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default MyRecipeApp;