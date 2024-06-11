import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import Spinner from './Spinner';
import ButtonWithSpinner from './ButtonWithSpinner';

const CharacterListView = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                let allCharacters = [];
                let page = 1;
                let data;

                do {
                    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
                    data = await response.json();
                    allCharacters = allCharacters.concat(data.results);
                    page++;
                } while (data.info.next);

                setCharacters(allCharacters);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
            setLoading(false);
        };
        fetchCharacters();
    }, []);

    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);
    const charactersToRender = filteredCharacters.slice((currentPage - 1) * charactersPerPage, currentPage * charactersPerPage);

    return (
        <div className="character-list-view">
            <div className="logo">
                <img src="https://image.ibb.co/hTQdUF/Rick_and_Morty_logo.png" alt="Rick and Morty Logo" />
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search characters..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <ButtonWithSpinner 
                            onClick={() => {
                                setSearchTerm('');
                                navigate('/');
                            }}
                            altText="Clear"
                            buttonText="Clear"
                        />
                    </div>
                    <div className="character-list">
                        {charactersToRender.map(character => (
                            <CharacterCard key={character.id} character={character} onClick={() => navigate(`/character/${character.id}`)} />
                        ))}
                    </div>
                    <div className="pagination">
                        <ButtonWithSpinner 
                            onClick={() => setCurrentPage(currentPage - 1)} 
                            disabled={currentPage === 1} 
                            altText="Prev" 
                            buttonText="Prev" 
                        />
                        <ButtonWithSpinner 
                            onClick={() => setCurrentPage(currentPage + 1)} 
                            disabled={currentPage === totalPages} 
                            altText="Next" 
                            buttonText="Next" 
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CharacterListView;
