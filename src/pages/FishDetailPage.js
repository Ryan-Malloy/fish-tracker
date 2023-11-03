import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { get, ref } from "firebase/database";

function FishDetailPage() {
	const { id } = useParams();
	const [fish, setFish] = useState(null);

	useEffect(() => {
		async function fetchFish() {
			const fishRef = ref(db, `fishes/${id}`);
			const snapshot = await get(fishRef);
			if (snapshot.exists()) {
				setFish(snapshot.val());
			}
		}

		fetchFish();
	}, [id]);

	return (
		<>
			<section>
				<div className="container">
					<h1 className="text-center">View Fish Page</h1>
					<div className="row">
						<div className="col">
							<a href="/">Home</a>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div>
						{fish ? (
							<div className="card mb-3 mx-auto">
								<div className="card-body">
									<div className="row">
										<div className="col">
											<h5 className="card-title">{fish.name}</h5>
											<p>Type: {fish.type}</p>
										</div>
                    <div className="col-auto">
                      <small className="text-secondary">{fish.key}</small>
                    </div>
									</div>

									{fish.caught && (
										<div>
											{fish.caught.map((catchDetails, index) => (
												<div key={index}>
													<p>Date: {catchDetails.date}</p>
													<ul>
														<li>Weight: {catchDetails.weight}</li>
														<li>Length: {catchDetails.length}</li>
														<li>Location: {catchDetails.location}</li>
														<li>Lure: {catchDetails.lure}</li>
													</ul>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						) : (
							<p>Loading fish details...</p>
						)}
					</div>
				</div>
			</section>
		</>
	);
}

export default FishDetailPage;
