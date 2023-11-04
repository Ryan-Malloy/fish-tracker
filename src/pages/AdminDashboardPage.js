import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { get, ref } from "firebase/database";
import AdminFishList from "../components/AdminFishList"

const AdminDashboardPage = () => {
	const [fishes, setFishes] = useState({});
	const [sortMethod, setSortMethod] = useState("mostRecent");
	const sortedFishes = sortFishes(fishes);
	
	function removeFishFromState(key) {
        setFishes(prevFishes => prevFishes.filter(fish => fish.key !== key));
    }

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

	

	return (
		<>
			<section className="mx-auto">
				<div className="container">
					<h1 className="text-center">Admin Dashboard Page</h1>
					<div className="row">
						<div className="col">
							<a href="/">Home</a>
						</div>
						<div className="col-auto">
							<a href="admin/add">Add</a>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<select
						className="form-select mx-auto"
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
				<AdminFishList fishes={fishes} onDeleteFish={removeFishFromState} />
				</div>
			</section>
		</>
	);
};

export default AdminDashboardPage;
