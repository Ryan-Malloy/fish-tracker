import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { get, ref, set } from "firebase/database";
import {
	getStorage,
	ref as storageRef,
	uploadBytes,
	getDownloadURL,
} from "firebase/storage";

const initialFormData = {
	name: "",
	type: "",
	image: null,
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
					image: fetchedFish.image || null,
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

	const handleImageChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			image: event.target.files[0],
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

	// Function to upload a new image to Firebase Storage
	const uploadImage = async (imageFile) => {
		if (!imageFile) {
			return null;
		}

		const storage = getStorage();
		const storageReference = storageRef(
			storage,
			`fishImages/${imageFile.name}`
		);
		await uploadBytes(storageReference, imageFile);
		const downloadURL = await getDownloadURL(storageReference);
		return downloadURL;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Update: Upload image first and get the URL to be set in the fishRef
		const imageUrl = await uploadImage(formData.image);

		const updateData = {
			name: formData.name,
			type: formData.type,
			image: imageUrl, // Update: Use the new image URL from the uploadImage function
			caught: formData.catches.map((catchItem) => {
				// Update: Safely parse the weight and length, avoiding NaN
				const weight = parseFloat(catchItem.weight);
				const length = parseFloat(catchItem.length);
				return {
					date: catchItem.date,
					weight: isNaN(weight) ? 0 : weight, // Fallback to 0 if NaN
					length: isNaN(length) ? 0 : length, // Fallback to 0 if NaN
					location: catchItem.location,
					lure: catchItem.lure,
				};
			}),
		};

		// Proceed to update the database only if the image upload was successful or there was no image to upload
		if (imageUrl || !formData.image) {
			const fishRef = ref(db, `fishes/${id}`);
			await set(fishRef, updateData);
			setFormData(initialFormData);
			alert("Edit Successful!");
			navigate("/admin");
		} else {
			// Handle the error scenario where image upload failed
			alert("Image upload failed, please try again.");
		}
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
								<div className="mb-3">
									{fish.image && (
										<div>
											<label htmlFor="fishImage">Current Image</label>
											<img
												src={fish.image}
												className="edit-fish-img"
												alt="Current Fish"
												style={{ width: "100%", height: "auto" }}
											/>
										</div>
									)}
									<input
										className="form-control edit-fish-input"
										type="file"
										name="image"
										onChange={handleImageChange}
										id="fishImage"
									/>
								</div>
							</div>
						</div>
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
									className="btn btn-sm btn-primary"
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
