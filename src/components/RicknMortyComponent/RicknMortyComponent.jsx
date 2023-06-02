import React, { useState, useEffect } from "react";
import "./RicknMortyComponent.css";

function RicknMortyComponent() {
	const [characters, setCharacters] = useState([]);
	const [episodeNames, setEpisodeNames] = useState({});

	const getData = async () => {
		const data = await fetch("https://rickandmortyapi.com/api/character");
		const characters = await data.json();
		setCharacters(characters.results);
	};

	const getEpisodeName = async (url) => {
		const data = await fetch(url);
		const episode = await data.json();
		return episode.name;
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		const fetchEpisodeNames = async () => {
			const names = {};
			for (const character of characters) {
				const episodeName = await getEpisodeName(character.episode[0]);
				names[character.id] = episodeName;
			}
			setEpisodeNames(names);
		};

		fetchEpisodeNames();
	}, [characters]);

	const getStatusColor = (status) => {
		switch (status) {
			case "Alive":
				return "green";
			case "Dead":
				return "red";
			default:
				return "grey";
		}
	};

	return (
		<div className="container">
			<div className="container-head">
				<h1>Rick n Morty Adventures</h1>
			</div>
			<div className="row">
				{characters.map((character) => {
					const firstEpisodeName = episodeNames[character.id];
					const statusColor = getStatusColor(character.status);

					return (
						<div className="card" key={character.id}>
							<div className="card-body">
								<h5 className="card-title">
									<a href={character.url}>{character.name}</a>
								</h5>
								<img src={character.image} alt={character.name} />
								<p className="card-text">
									Status: <span className={`status-dot ${statusColor}`} />
									{character.status}
								</p>
								<p className="card-text">
									Last Known Location:{" "}
									<a href={character.location.url}>{character.location.name}</a>
								</p>
								<p className="card-text">Species: {character.species}</p>
								<p className="card-text">
									First Appearance:{" "}
									<a href={character.episode[0]}>{firstEpisodeName}</a>
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default RicknMortyComponent;
