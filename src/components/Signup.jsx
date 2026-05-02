import { useActionState } from "react";

function signUpAction(prevFormState, formData) {
	const email = formData.get("email");
	const password = formData.get("password");
	const confirmPassword = formData.get("confirm-password");
	const firstName = formData.get("first-name");
	const lastName = formData.get("last-name");
	const role = formData.get("role");
	const acquisitionChannels = formData.getAll("acquisition");
	const termsAgreed = formData.get("terms") === "on";

	let errors = [];
	if (!email) {
		errors.push("Email is required");
	}
	if (!password) {
		errors.push("Password is required");
	}
	if (!confirmPassword) {
		errors.push("Confirm password is required");
	}
	if (!firstName) {
		errors.push("First name is required");
	}
	if (!lastName) {
		errors.push("Last name is required");
	}
	if (!termsAgreed) {
		errors.push("You must agree to the terms and conditions");
	}

	if (acquisitionChannels.length === 0) {
		errors.push("Please let us know how you found us");
	}

	if (password !== confirmPassword) {
		console.log("Password and confirm password do not match");
		return;
	}

	if (errors.length > 0) {
		return {
			errors,
			enteredValue: {
				email,
				password,
				confirmPassword,
				firstName,
				lastName,
				role,
				acquisitionChannels,
				termsAgreed,
			},
		};
	}

	return { errors: null };
}

export default function Signup() {
	// const [passwordIsNotEqual, setPasswordIsNotEqual] = useState(false);

	const [formState, formAction] = useActionState(signUpAction, {
		errors: null,
	});

	return (
		<form action={formAction}>
			<h2>Welcome on board!</h2>
			<p>We just need a little bit of data from you to get you started 🚀</p>

			<div className="control">
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					name="email"
					defaultValue={formState.enteredValue?.email}
				/>
			</div>

			<div className="control-row">
				<div className="control">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						name="password"
						defaultValue={formState.enteredValue?.password}
					/>
				</div>

				<div className="control">
					<label htmlFor="confirm-password">Confirm Password</label>
					<input
						id="confirm-password"
						type="password"
						name="confirm-password"
						defaultValue={formState.enteredValue?.confirmPassword}
					/>

					{/* <div className="control-error">
						{passwordIsNotEqual && <p>Password is not equal</p>}
					</div> */}
				</div>
			</div>

			<hr />

			<div className="control-row">
				<div className="control">
					<label htmlFor="first-name">First Name</label>
					<input
						type="text"
						id="first-name"
						name="first-name"
						defaultValue={formState.enteredValue?.firstName}
					/>
				</div>

				<div className="control">
					<label htmlFor="last-name">Last Name</label>
					<input
						type="text"
						id="last-name"
						name="last-name"
						defaultValue={formState.enteredValue?.lastName}
					/>
				</div>
			</div>

			<div className="control">
				<label htmlFor="phone">What best describes your role?</label>
				<select
					id="role"
					name="role"
					defaultValue={formState.enteredValue?.role}
				>
					<option value="student">Student</option>
					<option value="teacher">Teacher</option>
					<option value="employee">Employee</option>
					<option value="founder">Founder</option>
					<option value="other">Other</option>
				</select>
			</div>

			<fieldset>
				<legend>How did you find us?</legend>
				<div className="control">
					<input
						type="checkbox"
						id="google"
						name="acquisition"
						value="google"
						defaultChecked={formState.enteredValue?.acquisitionChannels?.includes(
							"google",
						)}
					/>
					<label htmlFor="google">Google</label>
				</div>

				<div className="control">
					<input
						type="checkbox"
						id="friend"
						name="acquisition"
						value="friend"
						defaultChecked={formState.enteredValue?.acquisitionChannels?.includes(
							"friend",
						)}
					/>
					<label htmlFor="friend">Referred by friend</label>
				</div>

				<div className="control">
					<input
						type="checkbox"
						id="other"
						name="acquisition"
						value="other"
						defaultChecked={formState.enteredValue?.acquisitionChannels?.includes(
							"other",
						)}
					/>
					<label htmlFor="other">Other</label>
				</div>
			</fieldset>

			<div className="control">
				<label htmlFor="terms-and-conditions">
					<input
						type="checkbox"
						id="terms-and-conditions"
						name="terms"
						defaultValue={formState.enteredValue?.termsAgreed}
					/>
					I agree to the terms and conditions
				</label>
			</div>

			{formState.errors && (
				<div className="control-error">
					{formState.errors.map((error, index) => (
						<p key={index}>{error}</p>
					))}
				</div>
			)}

			<p className="form-actions">
				<button type="reset" className="button button-flat">
					Reset
				</button>
				<button type="submit" className="button">
					Sign up
				</button>
			</p>
		</form>
	);
}
