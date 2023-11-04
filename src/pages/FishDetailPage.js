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

	const getDelta = (property) => {
		if (!fish.caught || fish.caught.length < 2) return null;
		const mostRecent = fish.caught[fish.caught.length - 1][property];
		const previous = fish.caught[fish.caught.length - 2][property];
		const delta = mostRecent - previous;

		return delta !== 0 ? delta : null;
	};

	return (
		<>
			<section>
				<div className="container mx-auto">
					<div>
						{fish ? (
							<div className="card mb-3 mx-auto">
								<div className="card-header">
									<div className="row">
										<div className="col">
											<h3 className="card-title">{fish.name}</h3>
											<p className="text-secondary">Type: {fish.type}</p>
										</div>
										<div className="col-auto">
											<small className="text-secondary">{fish.key}</small>
										</div>
									</div>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col">
											<p>
												<b>Weight:</b>{" "}
												{fish.caught && fish.caught.length > 0
													? fish.caught[fish.caught.length - 1].weight + " oz"
													: "N/A"}
												{getDelta("weight") && (
													<span
														className={
															getDelta("weight") > 0
																? "text-success"
																: "text-danger"
														}
													>
														({getDelta("weight") > 0 ? "+" : ""}
														{getDelta("weight")} oz)
													</span>
												)}
											</p>
										</div>
										<div className="col-auto">
											<p>
												<b>Length:</b>{" "}
												{fish.caught && fish.caught.length > 0
													? fish.caught[fish.caught.length - 1].length + " cm"
													: "N/A"}
												{getDelta("length") && (
													<span
														className={
															getDelta("length") > 0
																? "text-success"
																: "text-danger"
														}
													>
														({getDelta("length") > 0 ? "+" : ""}
														{getDelta("length")} cm)
													</span>
												)}
											</p>
										</div>
									</div>
									<hr></hr>
									<h5>Catches</h5>
									{fish.caught && (
										<div>
											{[...fish.caught].reverse().map((catchDetails, index) => (
												<div key={index}>
													<a
														data-bs-toggle="collapse"
														href={`#collapseFish${fish.key}Catch${index}`}
														aria-expanded="true"
														aria-controls={`collapseFish${fish.key}Catch${index}`}
													>
														Date: {catchDetails.date}
													</a>
													<ul
														className="collapse show"
														id={`collapseFish${fish.key}Catch${index}`}
													>
														<li>
															<b>Weight:</b> {catchDetails.weight}
														</li>
														<li>
															<b>Length:</b> {catchDetails.length}
														</li>
														<li>
															<b>Location:</b> {catchDetails.location}
														</li>
														<li>
															<b>Lure:</b> {catchDetails.lure}
														</li>
													</ul>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						) : (
							<p className="text-center mt-5">Loading fish details...</p>
						)}
					</div>
					<p>
						<a href="/">Back to Home</a>
					</p>
				</div>
			</section>
		</>
	);
}

export default FishDetailPage;
