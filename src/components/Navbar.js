import React, { useState, useEffect } from "react";
import { auth, signOut } from "../config/firebase";

const Navbar = () => {
	const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setAdminLoggedIn(true);
			} else {
				setAdminLoggedIn(false);
			}
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
			<nav class="navbar navbar-expand-lg bg-body-tertiary">
				<div class="container-fluid">
					<a class="navbar-brand" href="/">
						FishTracker
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">
							<li className="nav-item">
								<a class="nav-link" aria-current="page" href="/">
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
						<div className="ms-auto">
							{isAdminLoggedIn ? (
								<button className="btn btn-outline-secondary" onClick={handleSignOut}>
									Sign Out
								</button>
							) : (
								<a className="btn btn-secondary" href="/admin/login">
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
