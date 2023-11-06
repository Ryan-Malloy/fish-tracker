import { Link } from "react-router-dom";
import { remove, ref } from "firebase/database";
import { db } from "../config/firebase";

function AdminFishList({ fishes, onDeleteFish }) {
	function deleteFish(key, name) {
		const isConfirmed = window.confirm(
			`Are you sure you want to delete ${name}?`
		);
		if (!isConfirmed) return;

		const fishRef = ref(db, `fishes/${key}`);
		remove(fishRef)
			.then(() => {
				window.alert(`${name} deleted.`);
				if (onDeleteFish) {
					onDeleteFish(key);
				}
			})
			.catch((error) => {
				window.alert("Failed to delete fish. Please try again.");
			});
	}

	return (
		<>
			{fishes.map((fish) => (
				<div className="card mb-4 mx-auto" key={fish.key}>
					{fish.image && (
						<img
							src={fish.image}
							className="card-img-top"
							alt={`${fish.name}`}
						/>
					)}
					<div className="card-header">
						<div className="row">
							<div className="col">
								<h3 className="card-title">{fish.name}</h3>
							</div>
							<div className="col-auto">
								<small className="text-secondary">{fish.key}</small>
							</div>
						</div>

						<p className="text-secondary">Type: {fish.type}</p>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">
							<div className="row">
								<div className="col">

										<b>Weight:</b>{" "}
										{fish.caught && fish.caught.length > 0
											? fish.caught[fish.caught.length - 1].weight + " oz"
											: "N/A"}

								</div>
								<div className="col-auto">

										<b>Length:</b>{" "}
										{fish.caught && fish.caught.length > 0
											? fish.caught[fish.caught.length - 1].length + " cm"
											: "N/A"}

								</div>
							</div>
						</li>
					</ul>
					<div className="card-body">
						<h5>Catches</h5>
						{fish.caught && (
							<div>
								{[...fish.caught].reverse().map((catchDetails, index) => (
									<div key={index}>
										<a
											data-bs-toggle="collapse"
											href={`#collapseFish${fish.key}Catch${index}`}
											aria-expanded="false"
											aria-controls={`collapseFish${fish.key}Catch${index}`}
										>
											Date: {catchDetails.date}
										</a>
										<ul
											className="collapse"
											id={`collapseFish${fish.key}Catch${index}`}
										>
											<li>
												<b>Weight:</b> {catchDetails.weight} oz
											</li>
											<li>
												<b>Length:</b> {catchDetails.length} cm
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
					<div className="card-footer">
						<div className="row">
							<div className="col">
								<Link to={`edit/${fish.key}`}>
									<button className="btn btn-primary ">Edit Details</button>
								</Link>
							</div>

							<div className="col-auto">
								<button
									className="btn btn-outline-danger"
									onClick={() => deleteFish(fish.key, fish.name)}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default AdminFishList;
