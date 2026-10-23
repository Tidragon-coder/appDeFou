import { Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import PokeDetails from "./pages/PokeDetails";
import AddPokemon from "./pages/AddPokemon";

function App() {
    return (
        <div>
            {/* Menu de navigation */}
            <nav>
                <Link to="/">Accueil</Link> | <Link to="/add">Ajouter un pokémon</Link>
            </nav>

            {/* Routes principales */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/poke/:id" element={<PokeDetails />} />
                <Route path="/add" element={<AddPokemon />} />
            </Routes>
        </div>
    );
}

export default App;
