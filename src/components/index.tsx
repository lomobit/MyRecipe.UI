import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from "./mainMenu";
import Home from './home';
import Dishes from './dishes';
import Ingredients from './ingredients';
import Settings from './settings';
import NotFoundPage from './notFound';
import './index.css';
import Events from "./schedules";

function MyRecipeApp() {
    return (
        <BrowserRouter>
            <div className="myRecipeApp">
                <div className="menuContent">
                    <MainMenu />
                </div>
                <div className="pageContent">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/dishes" element={<Dishes />} />
                        <Route path="/ingredients" element={<Ingredients />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default MyRecipeApp;