import React, { Fragment } from "react";
import { useQuery } from "react-query";
import CharacterComponent from "./CharacterComponent";

function CharactersComponent() {
    const getCharacters = async () => {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        return response.json();
    };

    const { data, status } = useQuery('characters', getCharacters);
    console.log(status)
	if (status === "loading") {
		return <div>Loading....</div>;
	}
	if (status === "error") {
		return <div>Error,,</div>;
	}
	return (
		<Fragment>
			<div>
				{data.results.map((character) => (
					<div>
                        <CharacterComponent character={character} />
					</div>
				))}
			</div>
		</Fragment>
	);
}

export default CharactersComponent;
