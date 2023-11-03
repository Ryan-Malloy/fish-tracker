import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { get, ref } from "firebase/database";
import FishList from "../components/FishList";

const HomePage = () => {
	const [fishes, setFishes] = useState({});
	const [sortMethod, setSortMethod] = useState("mostRecent");

	async function fetchFishes() {
		const fishRef = ref(db, "fishes");
		const snapshot = await get(fishRef);
		if (snapshot.exists()) {
			return snapshot.val();
		}
		return {};
	}

	function sortFishes(fishes) {
		const fishArray = Object.entries(fishes).map(([key, fish]) => ({
			key,
			...fish,
		}));

		switch (sortMethod) {
			case "mostRecent":
				return fishArray.sort(
					(a, b) => new Date(b.caught[0]?.date) - new Date(a.caught[0]?.date)
				);
			case "oldest":
				return fishArray.sort(
					(a, b) => new Date(a.caught[0]?.date) - new Date(b.caught[0]?.date)
				);
			case "popular":
				return fishArray.sort((a, b) => b.caught.length - a.caught.length);
			default:
				return fishArray;
		}
	}

	useEffect(() => {
		async function fetchData() {
			const data = await fetchFishes();
			setFishes(data);
		}
		fetchData();
	}, []);

	const sortedFishes = sortFishes(fishes);

	return (
		<>
			<section className="mx-auto">
				<div className="container">
					<h1 className="text-center">Home Page</h1>
					<div className="row">
						<div className="col">
							<a href="admin/login">Admin Login</a>
						</div>
						<div className="col-auto">
							<a href="/admin">Admin Dashboard</a>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<select
						className="form-control mx-auto"
						value={sortMethod}
						onChange={(e) => setSortMethod(e.target.value)}
					>
						<option value="mostRecent">Most Recent</option>
						<option value="oldest">Oldest</option>
						<option value="popular">Popular</option>
					</select>
				</div>
			</section>
			<section>
				<div className="container">
					<FishList fishes={sortedFishes} />
				</div>
			</section>
		</>
	);
};

export default HomePage;
