import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 

  const handleConnect = async (e) => {
    e.preventDefault();
    // const user = {username, password}
    if (!username.trim() || password.trim() == "") {
      alert("Tout les champs sont obligatoires");
      return;
    }
    // console.log(user)

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw new Error("authentification impossible");
      }
      const data = await res.json();
      console.log(data)
       //console.log(localStorage);
      const token = data["access-token"];
     
      localStorage.setItem("access-token", token); //ma variable access-token stock mon token
      navigate("/student")
     
     

      // localStorage.setItem("access-token", data.token)
    } catch (err) {
      alert("Erreur de connexion", err.message);
    }
  };
  return (

    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm ">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>

        <form className="">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleConnect}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
