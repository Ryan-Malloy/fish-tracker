import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { get, ref } from "firebase/database";

function FishList() {
	const [fishes, setFishes] = useState({});

	async function fetchFishes() {
		const fishRef = ref(db, "fishes");
		const snapshot = await get(fishRef);
		if (snapshot.exists()) {
			return snapshot.val();
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
				<div className="card mb-3 mx-auto" key={key}>
					<div className="card-body">
						<div className="row align-items-center">
							<div className="col">
								<h5 className="card-title">{fish.name}</h5>
							</div>
							<div className="col-auto">
								<small className="text-secondary">{key}</small>
							</div>
						</div>

						<p>Type: {fish.type}</p>
						{fish.caught && (
							<div>
								{[...fish.caught].reverse().map((catchDetails, index) => (
									<div key={index}>
										<a
											data-bs-toggle="collapse"
											href={`#collapse-${key}-${index}`}
											aria-expanded="false"
											aria-controls={`collapse-${key}-${index}`}
										>
											Date: {catchDetails.date}
										</a>
										<ul className="collapse" id={`collapse-${key}-${index}`}>
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
								<Link to={`edit/${key}`}>
									<button className="btn btn-primary">Edit Details</button>
								</Link>
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
