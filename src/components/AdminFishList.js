import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { get, ref } from "firebase/database";

function FishList() {
	const [fishes, setFishes] = useState({});

	async function fetchFishes() {
		const fishRef = ref(db, "fishes");
		const snapshot = await get(fishRef);
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			console.log("No data available");
			return {};
		}
	}

	useEffect(() => {
		async function fetchData() {
			const data = await fetchFishes();
			setFishes(data);
		}
		fetchData();
	}, []);
	return (
		<>
			{Object.entries(fishes).map(([key, fish]) => (
				<div className="card" key={key}>
					<div className="card-body">
						<h5 className="card-title">{fish.name}</h5>
						<p>Type: {fish.type}</p>
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
					<div className="card-footer">
						<div className="row">
                            <div className="col">
                                <button className="btn btn-primary">Edit</button>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-danger">Delete</button>
                            </div>
                        </div>
					</div>
				</div>
			))}
		</>
	);
}

export default FishList;
