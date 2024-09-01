
import React from 'react'
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home'
import Upload from './pages/Upload';
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path="/upload" element={<Upload/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;