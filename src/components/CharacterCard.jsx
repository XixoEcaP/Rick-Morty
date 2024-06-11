import React from 'react';

const CharacterCard = ({ character, onClick }) => (
    <div className="character-card" onClick={onClick}>
        <h3 className="character-name">{character.name}</h3>
        <img src={character.image} alt={character.name} />
    </div>
);

export default CharacterCard;
