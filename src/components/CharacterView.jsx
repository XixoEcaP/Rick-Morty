import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import ButtonWithSpinner from './ButtonWithSpinner';

const CharacterView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                const data = await response.json();
                setCharacter(data);
            } catch (error) {
                console.error('Error fetching character:', error);
            }
            setLoading(false);
        };
        fetchCharacter();
    }, [id]);

    return (
        <div className="character-view">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <ButtonWithSpinner 
                        id="button-back"
                        onClick={() => navigate(-1)} 
                        altText="Back" 
                        buttonText="Back" 
                    />
                    <img className="character-image" src={character.image} alt={character.name} />
                    <div className="character-detail-card">
                        <div className="character-info">
                            <h1>{character.name}</h1>
                            <p>Status: {character.status}</p>
                            <p>Species: {character.species}</p>
                            <p>Gender: {character.gender}</p>
                            <p>Origin: {character.origin.name}</p>
                            <p>Location: {character.location.name}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CharacterView;
