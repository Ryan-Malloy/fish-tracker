import Button from "./Button";

const Header = () => {
	return (
		<header>
			<div className="row align-items-center">
				<div className="col">
					<h1>Fish Tracker</h1>
				</div>
				<div className="col-auto">
					<Button color={"primary"} text={"Add"} />
				</div>
			</div>
		</header>
	);
};

export default Header;
