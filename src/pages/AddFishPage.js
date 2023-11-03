import AdminForm from "../components/AdminForm";

const AddFishPage = () => {
	return (
		<>
			<section className="mx-auto">
				<div className="container">
					<h1 className="text-center">Add Fish Page</h1>
					<div className="row">
						<div className="col">
							<a href="/">Home</a>
						</div>
						<div className="col-auto">
							<a href="/admin">Back to Dashboard</a>
						</div>
					</div>
				</div>
			</section>
			<section>
				<AdminForm></AdminForm>
			</section>
		</>
	);
};

export default AddFishPage;
