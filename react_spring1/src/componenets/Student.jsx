import React, { useState } from 'react'
import Label from './Label'
import Editer from './Editer'


const Student = () => {

    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [succee, setSuccee] = useState(false)
    const [champ, setChamp] = useState(false)
    const [students, setStudents] = useState([])
    const [existData, setExistData] = useState(false)
    const [edit, setEdit] = useState(false)
    const [edit2, setEdit2] = useState(true)

   
   const handlSubmit = (e) => {

      e.preventDefault();
      if(nom.trim() == "" || !prenom || !email){
         setChamp(true)
         setTimeout(() =>{
          setChamp(false)
         },3000)
          return
      }
      const student = {
        email,
        nom,
        prenom
    }
    fetch("http://localhost:8080/student/add", {

       method:"POST",
       headers:{"Content-type" :"application/json"},
       body:JSON.stringify(student)
    }
     
    ).then(() =>{
      console.log("étudiant ajouter avec succée")
      setSuccee(true)
       setNom("")
      setEmail("")
      setPrenom("")
       

      setTimeout(() => {
          setSuccee(false)
      },2000)
     
    })
   
     
   }
   const handlStudent = async (e) =>{
    e.preventDefault()
    try{
      const response = await fetch("http://localhost:8080/student/getStudents",{

            method:"GET",
            "Content-type":"application/json"
      })
      if(!response){
          throw new Error("Erreur lors de la récupération des érudiants")
      }
      const data = await response.json()
      console.log(data)
      setStudents(data)
      setExistData(true)
    }catch(err){
      console.error(err)
    }
   }  
   const handlDelete = async (id) =>{
   //console.log(id)
     await fetch(`http://localhost:8080/student/delete/${id}`, {
    method:"DELETE"
   })
  
   const studentsFilter = students.filter(st =>st.id !==id)
    setExistData(true)
    setStudents(studentsFilter)
    alert("Vous êtes sûr de supprimer ?")
   }

   const handlEdit = () =>{
      setExistData(false)
      setEdit(true)
      setEdit2(false)
   
   }
  return (
<>
{edit2 &&(

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
      onClick={handlSubmit}
    >
      Enregistrer
    </button>

    <button
      className="btn btn-primary hover:bg-amber-100"
      onClick={handlStudent}
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

  {champ && (
    <div className="alert alert-error">
      Tous les champs sont obligatoires
    </div>
  )}
</form>
)
}


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
        <button className='btn btn-xs btn-error m-1.5 absolute right-0 bottom-0' onClick={() => handlDelete(st.id)}>Supprimer</button>
        <button className="btn btn-xs btn-info  bottom-0" onClick={handlEdit}>
  Editer
</button>

      </div>
     
    ))}
  </div>
)} 


{edit && (  
  <div className='items-center'>
  <div className="flex flex-col items-center  bg-white shadow-lg p-6 rounded-xl w-[300px] mt-4 animate-fadeIn">

    <label className="font-semibold mb-1">Nom</label>
    <input 
      className="input input-bordered w-full mb-3" 
      placeholder="Modifier le nom"
    />

    <label className="font-semibold mb-1">Prénom</label>
    <input 
      className="input input-bordered w-full mb-3"
      placeholder="Modifier le prénom"
    />

    <label className="font-semibold mb-1">Email</label>
    <input 
      className="input input-bordered w-full mb-4"
      placeholder="Modifier l'email"
    />

    <button className="btn btn-primary w-[100px] hover:scale-105 transition">
      Sauvegarder
    </button>
  </div>
  </div>
)}



    </>
 
  )
}

export default Student
