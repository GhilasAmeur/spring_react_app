import { useEffect, useState } from "react";
import Label from "./Label";

const Student = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [succee, setSuccee] = useState(false);
  const [champObligatoire, setChampObligatoire] = useState(false);
  const [students, setStudents] = useState([]);
  const [existData, setExistData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [edit2, setEdit2] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  // const token = localStorage.getItem("access-token")
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("access-token"));
  }, []);

  const handlAddStudent = (e) => {
    e.preventDefault();
    if (nom.trim() == "" || !prenom || !email) {
      setChampObligatoire(true);
      setTimeout(() => {
        setChampObligatoire(false);
      }, 3000);
      return;
    }
    // const student = { email,nom,prenom}

    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        nom,
        prenom,
      }),
    }).then(() => {
      console.log("étudiant ajouter avec succée");
      setSuccee(true);
      setNom("");
      setEmail("");
      setPrenom("");

      setTimeout(() => {
        setSuccee(false);
      }, 2000);
    });
  };

  const handlgetAllStudents = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/student/getStudents",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(token);

      if (!response) {
        throw new Error("Erreur lors de la récupération des érudiants");
      }
      const data = await response.json();
      console.log(data);
      setStudents(data);
      setExistData(true);
    } catch (err) {
      alert("Erreur de get students", err);
    }
  };

  const handlDelete = async (id) => {
    //console.log(id)
    await fetch(`http://localhost:8080/student/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token} `
      },
    });
    const studentsFilter = students.filter((st) => st.id !== id);
    setExistData(true);
    setStudents(studentsFilter);
    alert("Vous êtes sûr de supprimer ?");
  };
  ///////////////////////
  const handlEdit = async (id) => {
    setExistData(false);
    setEdit(true);
    setEdit2(false);

    try {
      const response = await fetch(
        `http://localhost:8080/student/getById/${id}`,
        {
          method:"GET",
          headers :{
            "Content-type":"application/json",
            Authorization : `Bearer ${token}`
          }
        }

      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP :${response.status}`);
      }
      const data = await response.json();

      setNom(data.nom);
      setPrenom(data.prenom);
      setEmail(data.email);
      setCurrentId(data.id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRetour = () => {
    setEdit2(true);
    setEdit(false);
    // setExistData(true)
    setNom("");
    setPrenom("");
    setEmail("");
  };

  const handleUpdate = async (id) => {
    const student = {
      nom,
      prenom,
      email,
    };
    const response = await fetch(`http://localhost:8080/student/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error(`Ereeur HTTP : ${response.status}`);
    }
    alert("Etudiant modifier avec succès");
    //je recharger ma liste des etudaints : avec celui modifier
    const studentsUpdate = students.map((st) =>
      st.id === id ? { ...st, nom, prenom, email } : st
    );

    setStudents(studentsUpdate);
    handleRetour();
  };

  /////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {edit2 && (
        <form className="flex flex-col w-full max-w-md mx-auto bg-white shadow-md p-6 rounded-lg gap-4">
          {/* Champs */}

          <div className="flex flex-col gap-4 w-full">
            <Label
              label="Nom"
              value={nom}
              placeholder="Entrez votre nom"
              onChange={(e) => setNom(e.target.value)}
            />

            <Label
              label="Prénom"
              value={prenom}
              placeholder="Entrez votre prénom"
              onChange={(e) => setPrenom(e.target.value)}
            />

            <Label
              label="Email"
              value={email}
              placeholder="Entrez votre email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-start gap-2 mt-2">
            <button
              className="btn btn-active hover:bg-amber-100"
              onClick={handlAddStudent}
            >
              Enregistrer
            </button>

            <button
              className="btn btn-primary hover:bg-amber-100"
              onClick={handlgetAllStudents}
            >
              Voir la liste
            </button>
          </div>

          {/* Messages */}
          {succee && (
            <div className="alert alert-success">
              Étudiant ajouté avec succès
            </div>
          )}

          {champObligatoire && (
            <div className="alert alert-error">
              Tous les champs sont obligatoires
            </div>
          )}
        </form>
      )}

      {/* Affichage des étudiants */}
      {existData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 ">
          {students.map((st) => (
            <div
              key={st.id}
              className="p-4 bg-white shadow rounded-lg border relative"
            >
              <h3 className="font-bold text-lg">{st.nom}</h3>
              <p className="text-gray-600">{st.prenom}</p>
              <p className="text-gray-500 text-sm">{st.email}</p>
              <button
                className="btn btn-xs btn-error m-1.5 absolute right-0 bottom-0"
                onClick={() => handlDelete(st.id)}
              >
                Supprimer
              </button>
              <button
                className="btn btn-xs btn-info  bottom-0"
                onClick={() => handlEdit(st.id)}
              >
                Editer
              </button>
            </div>
          ))}
        </div>
      )}

      {edit && (
        <div className="items-center">
          <div className="flex flex-col items-center  bg-white shadow-lg p-6 rounded-xl w-[300px] mt-4 animate-fadeIn">
            <label className="font-semibold mb-1">Nom</label>
            <input
              className="input input-bordered w-full mb-3"
              placeholder="Modifier le nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />

            <label className="font-semibold mb-1">Prénom</label>
            <input
              className="input input-bordered w-full mb-3"
              placeholder="Modifier le prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />

            <label className="font-semibold mb-1">Email</label>
            <input
              className="input input-bordered w-full mb-4"
              placeholder="Modifier l'email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="btn btn-primary w-[100px] hover:scale-105 transition pb-1"
              onClick={(e) => {
                e.preventDefault();
                handleUpdate(currentId);
              }}
            >
              Sauvegarder
            </button>
            <button
              className="btn btn-active w-[100px] hover:scale-105 transition"
              onClick={handleRetour}
            >
              Retour
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Student;
