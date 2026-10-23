function Pokemon({ nom, element, image }) {
    return (
        <div style={{ border: "1px solid #ccc", margin: "1em", padding: "1em" }}>
            <img src={image} alt={nom} />
            <h3>{nom}</h3>
            <p>Élément : {element}</p>
        </div>
    );
}

export default Pokemon;
