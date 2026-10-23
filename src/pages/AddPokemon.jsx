import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

function AddPokemon() {
    const [nom, setNom] = useState("");                 // Champs du formulaire
    const [element, setElement] = useState("");
    const [image, setImage] = useState("");
    const [poids, setPoids] = useState("");
    const [taille, setTaille] = useState("");
    const [isLoading, setIsLoading] = useState(false);  // État pour gérer l'envoi
    const [erreur, setErreur] = useState(null);         // État pour gérer les erreurs
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();                             // Empêche le rechargement de la page
        setIsLoading(true);
        setErreur(null);
        api.post("/pokemon", { nom, element, image, poids: Number(poids), taille: Number(taille) })
            .then(() => {
                setIsLoading(false);
                navigate("/");                          // Retour à l'accueil après l'ajout
            })
            .catch(() => {
                setErreur("Erreur lors de l'ajout du pokémon");
                setIsLoading(false);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Ajouter un pokémon</h1>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required /><br />
            <input type="text" value={element} onChange={(e) => setElement(e.target.value)} placeholder="Élément" required /><br />
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="URL de l'image" /><br />
            <input type="number" value={poids} onChange={(e) => setPoids(e.target.value)} placeholder="Poids (kg)" min="0" step="0.1" /><br />
            <input type="number" value={taille} onChange={(e) => setTaille(e.target.value)} placeholder="Taille (m)" min="0" step="0.1" /><br />
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Ajout en cours..." : "Ajouter"}
            </button>

            {erreur && <p style={{ color: "red" }}>{erreur}</p>}
        </form>
    );
}

export default AddPokemon;
