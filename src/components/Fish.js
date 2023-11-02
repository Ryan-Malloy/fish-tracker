import Button from "./Button";
const Fish = ({ fish }) => {
	return (
		<div className="card my-2 mx-auto">
			<div className="card-body">
				<image src={fish.image} className="card-img-top" alt="..."></image>
				<div className="row">
					<div className="col">
						<h5 className="card-title">{fish.name}</h5>
					</div>
					<div className="col-auto">
						<h5 className="card-title">ID: {fish.id}</h5>
					</div>
				</div>
				<p className="card-text text-secondary">{fish.type}</p>

				{fish.caught.map((catchEntry, index) => (
					<div className="my-2">
						<h6 className="card-title">Catch Entry</h6>
						<ul className="text-secondary">
							<li>Date: {catchEntry.date}</li>
							<li>Location: {catchEntry.location}</li>
							<li>Weight: {catchEntry.weight}</li>
							<li>Length: {catchEntry.length}</li>
							<li>Lure: {catchEntry.lure}</li>
						</ul>
					</div>
				))}
				<div className="row">
					<div className="col">
						<Button color={"primary"} text={"View Details"}></Button>
					</div>
					<div className="row">
						<div className="col">
							<Button color={"success"} text={"Edit"}></Button>
						</div>
						<div className="col">
							<Button color={"danger"} text={"Delete"}></Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Fish;
