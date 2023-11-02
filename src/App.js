import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Fishes from "./components/Fishes";
import { useState } from "react";

function App() {
	const [fishes, setFishes] = useState([
		{
			id: 1,
			name: "Fish 1",
			type: "Type 1",
			caught: [
				{
          id: 1,
					date: "November 2",
					weight: 20,
					length: 20,
					location: "South Pond",
					lure: "Green Lure",
				},
				{
          id: 2,
					date: "November 1",
					weight: 18,
					length: 19,
					location: "North Pond",
					lure: "Green Lure",
				},
			],
		},
		{
			id: 2,
			name: "Fish 2",
			type: "Type 2",
			caught: [
				{
          id: 1,
					date: "October 31",
					weight: 11,
					length: 17,
					location: "South Pond",
					lure: "Red Lure",
				},
				{
          id: 2,
					date: "October 30",
					weight: 10,
					length: 17,
					location: "North Pond",
					lure: "Red Lure",
				},
			],
		},
	]);

	return (
		<>
			<section>
				<div className="container align-items-center justify-content-center">
					<Header />
					<Fishes fishes={fishes}/>
				</div>
			</section>
		</>
	);
}

export default App;
