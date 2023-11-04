import { Link } from "react-router-dom";

function FishList({ fishes }) {
	return (
		<>
			{fishes.map((fish) => (
				<div className="card mb-4 mx-auto" key={fish.key}>
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
					<div className="card-body">
						<div className="row">
							<div className="col">
								<p>
									<b>Weight:</b>{" "}
									{fish.caught && fish.caught.length > 0
										? fish.caught[fish.caught.length - 1].weight + " oz"
										: "N/A"}
								</p>
							</div>
							<div className="col-auto">
								<p>
									<b>Length:</b>{" "}
									{fish.caught && fish.caught.length > 0
										? fish.caught[fish.caught.length - 1].length + " cm"
										: "N/A"}
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
											aria-expanded="false"
											aria-controls={`collapseFish${fish.key}Catch${index}`}
										>
											Date: {catchDetails.date}
										</a>
										<ul
											className="collapse"
											id={`collapseFish${fish.key}Catch${index}`}
										>
											<li><b>Weight:</b> {catchDetails.weight} oz</li>
											<li><b>Length:</b> {catchDetails.length} cm</li>
											<li><b>Location:</b> {catchDetails.location}</li>
											<li><b>Lure:</b> {catchDetails.lure}</li>
										</ul>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="card-footer">
						<Link to={`/fish/${fish.key}`}>
							<button className="btn btn-primary">View Details</button>
						</Link>
					</div>
				</div>
			))}
		</>
	);
}

export default FishList;
