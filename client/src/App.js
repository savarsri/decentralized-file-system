
import React from 'react'
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home'
import UploadPage from './pages/UploadPage';
import GetImage from './pages/GetImage';
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path="/upload" element={<UploadPage/>}></Route>
          <Route path="/get" element={<GetImage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;