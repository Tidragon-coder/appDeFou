function Pagination({ page, nbPages, onPrecedent, onSuivant }) {
    return (
        <div>
            <button onClick={onPrecedent} disabled={page <= 1}>Précédent</button>
            <span> Page {page} / {nbPages} </span>
            <button onClick={onSuivant} disabled={page >= nbPages}>Suivant</button>
        </div>
    );
}

export default Pagination;
