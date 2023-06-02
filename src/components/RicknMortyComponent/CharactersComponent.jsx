import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import CharacterComponent from "./CharacterComponent";

function CharactersComponent() {
	const [page, setPage] = useState(1);

	const getCharacters = async ({ queryKey }) => {
		const response = await fetch(
			`https://rickandmortyapi.com/api/character/?page=${queryKey[1]}`
		);
		return response.json();
	};

	const { data, status, isPreviousData, isLoading, isError } = useQuery(
		["characters", page],
		getCharacters,
		{ keepPreviousData: true }
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error!!</div>;
	}
	return (
		<Fragment>
			<div>
				{data.results.map((character) => (
					<div>
						<CharacterComponent character={character} />
					</div>
				))}
				<div>
					<button disabled={page === 1} onClick={() => setPage(page - 1)}>
						Previous Page
					</button>
					<button
						disabled={isPreviousData && !data.info.next}
						onClick={() => setPage(page + 1)}
					>
						Next Page
					</button>
				</div>
			</div>
		</Fragment>
	);
}

export default CharactersComponent;
