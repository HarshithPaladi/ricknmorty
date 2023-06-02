import React from "react";

function CharacterComponent({ character }) {
	return (
		<div className="card">
			<img src={character.image} alt={character.name} />
			<div className="text-container">
				<h4>{character.name}</h4>
				<p className="status">
					{character.status} - {character.species}
				</p>
				<p className="title">Location</p>
				{/* <p>{character.location.name}</p> */}
			</div>
		</div>
	);
}

export default CharacterComponent;
