import { useState } from "react";
import { ref, push, set } from "firebase/database";
import { db } from "../config/firebase";

const AdminForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		date: "",
		weight: "",
		length: "",
		location: "",
		lure: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const fishRef = ref(db, "fishes");
		const newFishRef = push(fishRef);
		set(newFishRef, {
			name: formData.name,
			type: formData.type,
			caught: [
				{
					date: formData.date,
					weight: parseFloat(formData.weight),
					length: parseFloat(formData.length),
					location: formData.location,
					lure: formData.lure,
				},
			],
		});
		// Reset the form data after submission
		setFormData({
			name: "",
			type: "",
			date: "",
			weight: "",
			length: "",
			location: "",
			lure: "",
		});
	};

	return (
		<form className="mx-auto" onSubmit={handleSubmit}>
			{/* <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div> */}
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
						<label for="fishName">Fish Name</label>
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
						<label for="fishType">Fish Type</label>
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
							value={formData.weight}
							onChange={handleChange}
							id="fishWeight"
							required
						/>
						<label for="fishWeight">Weight</label>
					</div>
				</div>
				<div className="col">
					<div className="form-floating mb-3">
						<input
							className="form-control"
							type="number"
							name="length"
							value={formData.length}
							onChange={handleChange}
							id="fishLength"
							required
						/>
						<label for="fishLength">Length</label>
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
							value={formData.location}
							onChange={handleChange}
							id="fishLocation"
							required
						/>
						<label for="fishLocation">Location</label>
					</div>
				</div>
				<div className="col">
					<div className="form-floating mb-3">
						<input
							className="form-control"
							type="text"
							name="lure"
							value={formData.lure}
							onChange={handleChange}
							id="fishLure"
							required
						/>
						<label for="fishLure">Lure Type</label>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="form-floating mb-3">
					<input
						className="form-control"
						type="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
						id="fishDate"
						required
					/>
				</div>
				<button className="btn btn-primary" type="submit">
					Add Fish
				</button>
			</div>
		</form>
	);
};

export default AdminForm;
