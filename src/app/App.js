import React, {useState, useEffect} from 'react';
import './assets/styles/App.scss';
import Content from "./Content.js";
import LoadingScreen from "../components/reusable/LoadingScreen";
import Login from "../pages/Login";
import Register from "../pages/Register";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userFromLS = localStorage.getItem('userData');
        if (userFromLS === null) {
            setIsLoading(false);
        } else {
            setUserData('token');
            setIsLoading(false);
        }
    }, []);

    const renderItem = () => {
        if (isLoading) return <LoadingScreen/>;
        else if (!userData) return <Register/>;
        return <Content isSignIned={userData !== null} />;
    }
    return (
        <div className="App">
            {renderItem()}
        </div>
    );
};

export default App;
