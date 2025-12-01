import { useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Student from "./Student";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App2() {
  // je supprimer la Navbar que quand je suis sur /login
  const location = useLocation();
  console.log(location.pathname);
  const login = location.pathname == "/";
  const [token, setToken] = useState("")
  
useEffect(() => {
    setToken(localStorage.getItem("access-token")) ;
},[])
 

  if(!token){

   return <Navigate to= "/" />
  }

  return (
    <>
      {!login && <Navbar />}
      <Routes>
        <Route path="/student" element={<Student />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App2;
