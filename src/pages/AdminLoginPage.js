import { useState } from "react";
import { signInWithEmailAndPassword } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await signInWithEmailAndPassword(email, password);
			navigate("/admin");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<section id="login" className="mx-auto">
			<h1 className="text-center">Admin Login</h1>
			{error && <p className="text-danger text-center">{error}</p>}
			<form className="mx-auto" onSubmit={handleSubmit}>
				<div class="form-floating mb-3">
					<input
						className="form-control"
						type="email"
						placeholder="Email"
						value={email}
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label for="email">Email address</label>
				</div>
				<div className="form-floating mb-3">
					<input
						className="form-control"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<label for="passowrd">Password</label>
				</div>

				<button className="btn btn-primary w-100 mb-3" type="submit">
					Login
				</button>
				<p>Not supposed to be here? <a href="/">Back to Home</a></p>
			</form>
		</section>
	);
};

export default AdminLogin;
