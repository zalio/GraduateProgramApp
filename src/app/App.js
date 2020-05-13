import React, {useState, useEffect} from 'react';
import './assets/styles/App.scss';
import Content from "./Content.js";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        
    }, []);

  return (
    <div className="App">
      <Content />
    </div>
  );
}

export default App;
