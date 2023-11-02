import Fish from "./Fish";

const Fishes = ({ fishes }) => {
	

	return (
		<>
			{fishes.map((fish) => (
				<Fish key={fish.id} fish={fish}></Fish>
			))}
		</>
	);
};

export default Fishes;
