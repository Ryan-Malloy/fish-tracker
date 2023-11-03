import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./pages/HomePage";
import FishDetailPage from "./pages/FishDetailPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AddEditFishPage from "./pages/AddEditFishPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/fish/:id" element={<FishDetailPage />} />
					<Route path="/admin/login" element={<AdminLoginPage />} />
					<Route path="/admin" element={<PrivateRoute />}>
						<Route index element={<AdminDashboardPage />} />
						<Route path="add" element={<AddEditFishPage />} />
						<Route path="edit/:id" element={<AddEditFishPage />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
