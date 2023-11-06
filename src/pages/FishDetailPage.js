import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { get, ref } from "firebase/database";

function FishDetailPage({ fishes }) {
	const { id } = useParams();
	const [fish, setFish] = useState(null);

	useEffect(() => {
		async function fetchFish() {
			const fishRef = ref(db, `fishes/${id}`);
			const snapshot = await get(fishRef);
			if (snapshot.exists()) {
				setFish({ ...snapshot.val(), key: id });
			}
		}

		fetchFish();
	}, [id]);

	return (
		<section>
			<div className="mx-auto p-1">
				{fish ? (
					<>
						<div className="row">
							<div className="col">
								<h3>{fish.name}</h3>
								<p className="text-secondary">{fish.type}</p>
							</div>
							<div className="col-auto">
							<small className="text-secondary">ID: {fish.key}</small>
							</div>
						</div>

						
						<table className="table table-striped">
							<thead>
								<tr>
									<th scope="col">Catch</th>
									<th scope="col">Date</th>
									<th scope="col">Weight</th>
									<th scope="col">Length</th>
									<th scope="col">Location</th>
									<th scope="col">Lure</th>
								</tr>
							</thead>
							<tbody>
								{fish.caught &&
									[...fish.caught].map((catchDetails, index) => (
										<tr key={index}>
											<th scope="row">{index+1}</th>
											<td>{catchDetails.date}</td>
											<td>{catchDetails.weight} oz</td>
											<td>{catchDetails.length} cm</td>
											<td>{catchDetails.location}</td>
											<td>{catchDetails.lure}</td>
										</tr>
									))}
							</tbody>
						</table>
					</>
				) : (
					<p className="text-center mt-5">Loading fish details...</p>
				)}
				<p>
					<a href="/">Back to Home</a>
				</p>
			</div>
		</section>
	);
}

export default FishDetailPage;
