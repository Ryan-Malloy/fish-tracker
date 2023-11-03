import AdminForm from "../components/AdminForm";

const AdminDashboardPage = () => {
	return (
		<>
			<section>
				<div className="container">
					<h1>Admin Dashboard Page</h1>
				</div>
			</section>
      <section>
        <div className="container">
          <h1 className="text-center">Add Fish Form</h1>
          <AdminForm/>
        </div>
      </section>
		</>
	);
};

export default AdminDashboardPage;
