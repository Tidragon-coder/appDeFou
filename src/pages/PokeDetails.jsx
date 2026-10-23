import { useParams } from "react-router";

function PokeDetails() {
    const { id } = useParams();     // id du pokémon dans l'URL

    return (
        <div>
            <h1>Détails du pokémon {id}</h1>
        </div>
    );
}

export default PokeDetails;
