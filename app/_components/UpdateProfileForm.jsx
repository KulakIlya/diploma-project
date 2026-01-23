import { auth } from "@/auth";
import SelectCountry from "./SelectCountry";

import { updateProfile } from "../actions";
import { getGuest } from "../services/data-service";
import UpdateProfileButton from "./UpdateProfileButton";

const UpdateProfileForm = async ({ children }) => {
	const session = await auth();
	const { fullName, email, nationality, nationalID, countryFlag } =
		await getGuest(session.user.email);

	return (
		<form
			className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
			action={updateProfile}
		>
			<div className="space-y-2">
				<label>Full name</label>
				<input
					disabled
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
					defaultValue={fullName}
					name="fullName"
				/>
			</div>

			<div className="space-y-2">
				<label>Email address</label>
				<input
					disabled
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
					defaultValue={email}
					name="email"
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">Where are you from?</label>
					<img
						src={countryFlag}
						alt="Country flag"
						className="h-5 rounded-sm"
					/>
				</div>

				<SelectCountry
					name="nationality"
					id="nationality"
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
					defaultCountry={nationality}
				/>
			</div>

			<div className="space-y-2">
				<label htmlFor="nationalID">National ID number</label>
				<input
					name="nationalID"
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
					defaultValue={nationalID}
				/>
			</div>

			<div className="flex items-center justify-end gap-6">
				<UpdateProfileButton />
			</div>
		</form>
	);
};
export default UpdateProfileForm;
