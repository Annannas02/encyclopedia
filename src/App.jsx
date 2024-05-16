import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import {HomePage} from "./components/HomePage.jsx"
import {AnimalComponent} from "./components/AnimalComponent.jsx";
import React, {useState} from "react";
import Sun from "./components/sun.jsx";
import Moon from "./components/moon.jsx";

function App() {
    const [userTheme, setUserTheme] = useState(localStorage.getItem("user-theme") || 'dark');
    document.documentElement.className = userTheme;

    const setTheme = (theme) => {
        localStorage.setItem("user-theme", theme);
        setUserTheme(theme)
        document.documentElement.className = theme;
    }

    const toggleTheme = () => {
        const activeTheme = localStorage.getItem("user-theme");
        console.log(activeTheme)
        if (activeTheme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
    return (
        <div>
            <Link to={"/encyclopedia/"}><h1>
                Encyclopedia
            </h1></Link>
            <div className={"theme"} onClick={toggleTheme}>
                {userTheme === "light" ?
                    <Sun/> :
                    <Moon/>}
            </div>
            <Routes>
                <Route path={"/encyclopedia/"} element={<HomePage/>}/>
                <Route path={"encyclopedia/animal/:name"} element={<AnimalComponent/>}/>
            </Routes>
        </div>
    )
}

export default App
