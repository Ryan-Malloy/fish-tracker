import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { get, ref } from "firebase/database";
import AdminFishList from "../components/AdminFishList";

const AdminDashboardPage = () => {
	const [fishes, setFishes] = useState({});
	const [sortMethod, setSortMethod] = useState("mostRecent");
	const sortedFishes = sortFishes(fishes);

	const deleteFish = (deletedFishKey) => {
		const updatedFishes = { ...fishes };
		delete updatedFishes[deletedFishKey];
		setFishes(updatedFishes);
	};

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
			<section>
				<div className="container mx-auto">
					<div className="row">
						<div className="col">
							<h1 className="text-center">Admin Dashboard Page</h1>
						</div>
						<div className="col-auto"></div>
					</div>
				</div>
			</section>
			<section>
				<div className="container mx-auto">
					<label htmlFor="sort">Filter</label>
					<div className="input-group">
						<select
							className="form-select mx-auto"
							value={sortMethod}
							onChange={(e) => setSortMethod(e.target.value)}
							id="filter"
						>
							<option value="mostRecent">Most Recent</option>
							<option value="oldest">Oldest</option>
							<option value="popular">Popular</option>
						</select>
						<a className="btn btn-primary" href="admin/add">
							Add
						</a>
					</div>
				</div>
			</section>
			<section>
				<div className="container mx-auto">
					<AdminFishList fishes={sortedFishes} onDeleteFish={deleteFish} />
				</div>
			</section>
		</>
	);
};

export default AdminDashboardPage;
