import { useState } from "react";
import { ref, push, set } from "firebase/database";
import { db } from "../config/firebase";
import { uploadImage } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const AdminForm = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		date: "",
		weight: "",
		length: "",
		location: "",
		lure: "",
		image: null,
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleImageChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			image: event.target.files[0],
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let imageUrl = "";

		if (formData.image) {
			const filePath = `fish-images/${formData.image.name}`;
			imageUrl = await uploadImage(formData.image, filePath);
		}

		const fishRef = ref(db, "fishes");
		const newFishRef = push(fishRef);
		await set(newFishRef, {
			name: formData.name,
			type: formData.type,
			image: imageUrl,
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

		setFormData({
			name: "",
			type: "",
			date: "",
			weight: "",
			length: "",
			location: "",
			lure: "",
			image: null,
		});

		alert("Added Successfully!");
		navigate("/admin");
	};

	return (
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
						<label forHTML="fishLure">Lure Type</label>
					</div>
				</div>
			</div>
			<div className="mb-3">
				<label htmlFor="fishImage">Fish Image</label>
				<input
					className="form-control"
					type="file"
					name="image"
					onChange={handleImageChange}
					id="fishImage"
				/>
			</div>
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
				<label htmlFor="fishDate">Date</label>
			</div>
			<div className="row align-items-center">
				<div className="col">
					<button className="btn btn-primary w-100" type="submit">
						Add Fish
					</button>
				</div>
				<div className="col-auto">
					<a href="/admin">Cancel</a>
				</div>
			</div>
		</form>
	);
};

export default AdminForm;
