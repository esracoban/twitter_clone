import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Auth from "./pages/Auth"
import Feed from "./pages/Feed"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";


function App() {
  
  const navigate = useNavigate();

  useEffect (() => {
    onAuthStateChanged(auth, (user) =>{
      if(user) {
        navigate('/feed');
      }
      else{
        navigate('/');
      }
    });
  }, []);
  

  return (
    <>
     
     <Routes>
      <Route path="/" element={<Auth/>}/>
      <Route path="/feed" element={<Feed/>}/>
     </Routes>
     
    </>
  )
}

export default App
