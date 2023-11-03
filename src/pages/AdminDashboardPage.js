import AdminFishList from "../components/AdminFishList"

const AdminDashboardPage = () => {
	return (
		<>
			<section>
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
					<AdminFishList></AdminFishList>
				</div>
			</section>
		</>
	);
};

export default AdminDashboardPage;
