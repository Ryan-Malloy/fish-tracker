import { useState, useEffect } from "react";
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
			<section>
				<div className="container mx-auto">
					<div className="filter mx-auto">
						<label htmlFor="sort">Filter</label>
						<select
							className="form-select mx-auto"
							value={sortMethod}
							onChange={(e) => setSortMethod(e.target.value)}
							id="sort"
						>
							<option value="mostRecent">Most Recent</option>
							<option value="oldest">Oldest</option>
							<option value="popular">Popular</option>
						</select>
					</div>
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
