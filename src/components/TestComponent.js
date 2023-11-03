import { ref, push, set } from "firebase/database";
import { db } from "../config/firebase";

const TestComponent = () => {
	function addDummyFish() {
		const fishRef = ref(db, "fishes");
		const newFishRef = push(fishRef);

		set(newFishRef, {
			id: 1,
			name: "Test Name 1",
			type: "Test Type 1",
			caught: [
				{
					date: "2023-11-02",
					weight: 20,
					length: 18,
					location: "Test Pond",
					lure: "Test Lure",
				},
			],
		});
	}

	return (
		<div>
			<button onClick={addDummyFish}>Add Dummy Fish</button>
		</div>
	);
};

export default TestComponent;
