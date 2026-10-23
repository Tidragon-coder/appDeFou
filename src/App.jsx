import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router";
import Pokemon from "./components/Pokemon";
import Home from "./pages/Home";
import PokeDetails from "./pages/PokeDetails";

function App() {
    const [pokemons, setPokemons] = useState([]);       // État pour stocker la liste des pokémons
    const [isLoading, setIsLoading] = useState(true);   // État pour gérer le chargement
    const [erreur, setErreur] = useState(null);         // État pour gérer les erreurs

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50")     // Appel à PokeAPI
            .then((res) => {
                if (!res.ok) throw new Error("Erreur serveur");
                return res.json();                              // Récupérer le JSON de la réponse
            })
            .then((data) =>
                // La liste ne contient que nom + url : on récupère le détail de chaque pokémon
                Promise.all(data.results.map((p) => fetch(p.url).then((res) => res.json())))
            )
            .then((details) => {
                console.log(details);
                setPokemons(details.map((p) => ({
                    id: p.id,
                    nom: p.name,
                    element: p.types[0].type.name,
                    image: p.sprites.front_default,
                })));                                           // Stocker la liste des pokémons dans le state
                setIsLoading(false);                            // Fin du chargement
            })
            .catch((err) => {
                setErreur(err.message);                         // Gérer l'erreur
                setIsLoading(false);
            });
    }, []); // [] pour exécuter l'effet une seule fois au montage

    return (
        <div>
            {/* Menu de navigation */}
            <nav>
                <Link to="/">Accueil</Link> | <Link to="/poke/1">Détails (pokémon 1)</Link>
            </nav>

            {/* Routes principales */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/poke/:id" element={<PokeDetails />} />
            </Routes>

            <h1>Mon pokedex</h1>
            {isLoading && <p>Chargement...</p>}
            {erreur && <p style={{ color: "red" }}>Erreur : {erreur}</p>}
            {!isLoading && !erreur && pokemons.length === 0 && <p>Aucun pokemon disponible.</p>}
            {!isLoading && !erreur && (
                <div>
                    {pokemons.map((pokemon) => (
                        <Pokemon
                            key={pokemon.id}
                            nom={pokemon.nom}
                            element={pokemon.element}
                            image={pokemon.image}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
