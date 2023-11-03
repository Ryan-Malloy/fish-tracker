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
      navigate('/admin');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div>
			<h2>Admin Login</h2>
			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default AdminLogin;
