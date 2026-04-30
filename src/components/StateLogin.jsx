import { useRef } from "react";

export default function Login() {
	const email = useRef("");
	const password = useRef("");

	function handleSubmit(event) {
		event.preventDefault();

		const enteredEmail = email.current.value;
		const enteredPassword = password.current.value;

		console.log(enteredEmail, enteredPassword);
	}

	return (
		<form>
			<h2>Login</h2>

			<div className="control-row">
				<div className="control no-margin">
					<label htmlFor="email">Email</label>
					<input id="email" type="email" name="email" value={email} />
				</div>

				<div className="control no-margin">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						name="password"
						value={password}
					/>
				</div>
			</div>

			<p className="form-actions">
				<button className="button button-flat">Reset</button>
				<button className="button" onClick={handleSubmit}>
					Login
				</button>
			</p>
		</form>
	);
}
