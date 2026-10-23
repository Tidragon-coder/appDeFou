import { useEffect, useState } from "react";
import api from "../services/api";
import PokeCard from "../components/PokeCard";
import Pagination from "../components/Pagination";

const LIMIT = 10;   // Nombre de pokémons par page

function Home() {
    const [pokemons, setPokemons] = useState([]);       // État pour stocker la liste des pokémons
    const [page, setPage] = useState(1);                // Page courante
    const [total, setTotal] = useState(0);              // Nombre total de pokémons
    const [isLoading, setIsLoading] = useState(true);   // État pour gérer le chargement
    const [erreur, setErreur] = useState(null);         // État pour gérer les erreurs

    useEffect(() => {
        // PokeAPI pagine avec offset/limit : page 1 → offset 0, page 2 → offset 10...
        api.get("/pokemon", { params: { offset: (page - 1) * LIMIT, limit: LIMIT } })
            .then((res) => {
                setTotal(res.data.count);
                // La liste ne contient que nom + url : on récupère le détail de chaque pokémon
                return Promise.all(res.data.results.map((p) => api.get(p.url)));
            })
            .then((details) => {
                setPokemons(details.map((res) => ({
                    id: res.data.id,
                    nom: res.data.name,
                    element: res.data.types[0].type.name,
                    image: res.data.sprites.front_default,
                })));                                           // Stocker la liste des pokémons dans le state
                setIsLoading(false);                            // Fin du chargement
            })
            .catch((err) => {
                setErreur(err.message);                         // Gérer l'erreur
                setIsLoading(false);
            });
    }, [page]); // Relance le GET à chaque changement de page

    const nbPages = Math.ceil(total / LIMIT);

    // Changement de page : on réaffiche le chargement, le useEffect relance le GET
    function changerPage(nouvellePage) {
        setIsLoading(true);
        setErreur(null);
        setPage(nouvellePage);
    }

    return (
        <div>
            <h1>Liste des pokémons</h1>
            {isLoading && <p>Chargement...</p>}
            {erreur && <p style={{ color: "red" }}>Erreur : {erreur}</p>}
            {!isLoading && !erreur && pokemons.length === 0 && <p>Aucun pokemon disponible.</p>}
            {!isLoading && !erreur && (
                <div>
                    {pokemons.map((pokemon) => (
                        <PokeCard
                            key={pokemon.id}
                            id={pokemon.id}
                            nom={pokemon.nom}
                            element={pokemon.element}
                            image={pokemon.image}
                        />
                    ))}
                </div>
            )}
            <Pagination
                page={page}
                nbPages={nbPages}
                onPrecedent={() => changerPage(page - 1)}
                onSuivant={() => changerPage(page + 1)}
            />
        </div>
    );
}

export default Home;
