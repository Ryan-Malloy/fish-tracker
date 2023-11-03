import TestComponent from "../components/TestComponent";
import AdminForm from "../components/AdminForm";
import FishList from "../components/FishList";

const HomePage = () => {
	return (
		<>
    <section>
			<div className="container">
				<h1 className="text-center">Home Page</h1>
				<div className="row">
					<div className="col">
						<a href="admin/login">Admin Login</a>
					</div>
					<div className="col-auto">
						<a href="/admin">Admin Dashboard</a>
					</div>
				</div>
			</div>
		</section>
    <section>
      <FishList></FishList>
    </section>
    </>
	);
};

export default HomePage;
