import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { get, ref, set } from "firebase/database";

const initialFormData = {
	name: "",
	type: "",
	catches: [
		{
			date: "",
			weight: "",
			length: "",
			location: "",
			lure: "",
		},
	],
};

function EditFishPage() {
	const { id } = useParams();
	const [fish, setFish] = useState(null);
	const navigate = useNavigate();

	const [formData, setFormData] = useState(initialFormData);

	useEffect(() => {
		async function fetchFish() {
			const fishRef = ref(db, `fishes/${id}`);
			const snapshot = await get(fishRef);
			if (snapshot.exists()) {
				const fetchedFish = snapshot.val();
				setFish(fetchedFish);

				setFormData({
					name: fetchedFish.name,
					type: fetchedFish.type,
					catches: fetchedFish.caught || initialFormData.catches,
				});
			}
		}

		fetchFish();
	}, [id]);

	const handleAddCatch = () => {
		setFormData((prevState) => ({
			...prevState,
			catches: [
				...prevState.catches,
				{
					date: "",
					weight: "",
					length: "",
					location: "",
					lure: "",
				},
			],
		}));
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCatchChange = (event, catchIndex) => {
		const { name, value } = event.target;

		setFormData((prevState) => {
			const newCatches = [...prevState.catches];
			newCatches[catchIndex] = {
				...newCatches[catchIndex],
				[name]: value,
			};

			return {
				...prevState,
				catches: newCatches,
			};
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const fishRef = ref(db, `fishes/${id}`);
		set(fishRef, {
			name: formData.name,
			type: formData.type,
			caught: formData.catches.map((catchItem) => ({
				date: catchItem.date,
				weight: parseFloat(catchItem.weight),
				length: parseFloat(catchItem.length),
				location: catchItem.location,
				lure: catchItem.lure,
			})),
		});
		setFormData(initialFormData);
		alert("Edit Successful!");
		navigate("/admin");
	};

	if (!fish) {
		return <p>Loading fish data...</p>;
	}

	return (
		<>
			<section>
				<div className="container">
					<h1 className="text-center">Edit Fish Page</h1>
				</div>
			</section>

			<section>
				<div className="container">
					<form className="mx-auto" onSubmit={handleSubmit}>
						<div className="row">
							<div className="col">
								<div className="form-floating mb-3">
									<input
										className="form-control"
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										id="fishName"
										required
									/>
									<label htmlFor="fishName">Fish Name</label>
								</div>
							</div>
							<div className="col">
								<div className="form-floating mb-3">
									<input
										className="form-control"
										type="text"
										name="type"
										value={formData.type}
										onChange={handleChange}
										id="fishType"
										required
									/>
									<label htmlFor="fishType">Fish Type</label>
								</div>
							</div>
						</div>

						<div className="row mb-1 align-items-center">
							<div className="col">
								<h2>Catch Details</h2>
							</div>
							<div className="col-auto mb-1">
								<button
									type="button"
									className="btn btn-sm btn-secondary"
									onClick={handleAddCatch}
								>
									Add a Catch
								</button>
							</div>
						</div>

						{formData.catches.map((catchItem, index) => (
							<div key={index}>
								<h5>Catch: {index + 1}</h5>
								<div className="row">
									<div className="col">
										<div className="form-floating mb-3">
											<input
												className="form-control"
												type="date"
												name="date"
												value={catchItem.date}
												onChange={(e) => handleCatchChange(e, index)}
												id={`fishDate-${index}`}
												required
											/>
											<label htmlFor={`fishDate-${index}`}>Date</label>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col">
										<div className="form-floating mb-3">
											<input
												className="form-control"
												type="number"
												name="weight"
												value={catchItem.weight}
												onChange={(e) => handleCatchChange(e, index)}
												id={`fishWeight-${index}`}
												required
											/>
											<label htmlFor={`fishWeight-${index}`}>Weight</label>
										</div>
									</div>
									<div className="col">
										<div className="form-floating mb-3">
											<input
												className="form-control"
												type="number"
												name="length"
												value={catchItem.length}
												onChange={(e) => handleCatchChange(e, index)}
												id={`fishLength-${index}`}
												required
											/>
											<label htmlFor={`fishLength-${index}`}>Length</label>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col">
										<div className="form-floating mb-3">
											<input
												className="form-control"
												type="text"
												name="location"
												value={catchItem.location}
												onChange={(e) => handleCatchChange(e, index)}
												id={`fishLocation-${index}`}
												required
											/>
											<label htmlFor={`fishLocation-${index}`}>Location</label>
										</div>
									</div>
									<div className="col">
										<div className="form-floating mb-3">
											<input
												className="form-control"
												type="text"
												name="lure"
												value={catchItem.lure}
												onChange={(e) => handleCatchChange(e, index)}
												id={`fishLure-${index}`}
												required
											/>
											<label htmlFor={`fishLure-${index}`}>Lure Type</label>
										</div>
									</div>
								</div>
							</div>
						))}

						<div className="row align-items-center mb-3">
							<div className="col">
								<button className="btn btn-success w-100" type="submit">
									Save Changes
								</button>
							</div>
							<div className="col-auto">
								<a href="/admin">Cancel</a>
							</div>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}

export default EditFishPage;
