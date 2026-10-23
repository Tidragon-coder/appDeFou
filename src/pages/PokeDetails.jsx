import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../services/api";

function PokeDetails() {
    const { id } = useParams();                         // id du pokémon dans l'URL
    const [resultat, setResultat] = useState(null);     // Résultat du dernier GET : { id, pokemon, erreur }

    // Chargement tant que le résultat ne correspond pas à l'id de l'URL
    const isLoading = resultat?.id !== id;
    const pokemon = isLoading ? null : resultat.pokemon;
    const erreur = isLoading ? null : resultat.erreur;

    useEffect(() => {
        api.get(`/pokemon/${id}`)
            .then((res) => {
                setResultat({ id, erreur: null, pokemon: {
                    id: res.data.id,
                    nom: res.data.name,
                    elements: res.data.types.map((t) => t.type.name),
                    image: res.data.sprites.other["official-artwork"].front_default ?? res.data.sprites.front_default,
                    poids: res.data.weight / 10,                // PokeAPI donne le poids en hectogrammes
                    taille: res.data.height / 10,               // et la taille en décimètres
                    capacites: res.data.abilities.map((a) => a.ability.name),
                    stats: res.data.stats.map((s) => ({ nom: s.stat.name, valeur: s.base_stat })),
                } });
            })
            .catch(() => {
                setResultat({ id, pokemon: null, erreur: "Pokémon introuvable" });
            });
    }, [id]); // Relance le GET à chaque changement d'id

    if (isLoading) return <p>Chargement...</p>;
    if (erreur) return <p style={{ color: "red" }}>Erreur : {erreur}</p>;
    if (!pokemon) return null;

    return (
        <div>
            <h1>#{pokemon.id} {pokemon.nom}</h1>
            <img src={pokemon.image} alt={pokemon.nom} width={200} />
            <p><strong>Élément :</strong> {pokemon.elements.join(", ")}</p>
            <p><strong>Poids :</strong> {pokemon.poids} kg</p>
            <p><strong>Taille :</strong> {pokemon.taille} m</p>
            <p><strong>Capacités :</strong> {pokemon.capacites.join(", ")}</p>
            <h2>Statistiques</h2>
            <ul>
                {pokemon.stats.map((stat) => (
                    <li key={stat.nom}>{stat.nom} : {stat.valeur}</li>
                ))}
            </ul>
        </div>
    );
}

export default PokeDetails;
