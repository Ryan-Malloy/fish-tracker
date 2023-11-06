import React, { useState, useEffect } from "react";
import { auth, signOut } from "../config/firebase";

const Navbar = () => {
	const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setAdminLoggedIn(!!user);
		});

		return () => unsubscribe();
	}, []);

	const handleSignOut = async () => {
		try {
			await signOut();
			alert("Logged out successfully!");
		} catch (error) {
			alert("Failed to log out.");
		}
	};

	return (
		<div>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						FishTracker
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link" aria-current="page" href="/">
									Home
								</a>
							</li>
							{isAdminLoggedIn ? (
								<li className="nav-item">
									<a className="nav-link" href="/admin">
										Dashboard
									</a>
								</li>
							) : (
								<div></div>
							)}
						</ul>
						<div className="ms-auto flex-column flex-lg-row align-items-lg-center">
							{isAdminLoggedIn ? (
								<>
									<button
										className="btn btn-link nav-link"
										onClick={handleSignOut}
									>
										Sign Out
									</button>
								</>
							) : (
								<a className="nav-link" href="/admin/login">
									Admin Login
								</a>
							)}
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
