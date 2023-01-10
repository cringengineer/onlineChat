import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./Components/Main/Main";
import Chat from "./Components/Chat/Chat";




const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='/Chat' element={<Chat/>} />
        </Routes>
    );
};

export default App;


