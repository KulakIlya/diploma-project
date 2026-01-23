import Image from "next/image";

import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

export const metadata = {
	title: "Profile",
};

export default function Page() {
	return (
		<div>
			<h2 className="mb-4 text-2xl font-semibold text-accent-400">
				Update your guest profile
			</h2>

			<p className="mb-8 text-lg text-primary-200">
				Providing the following information will make your check-in process
				faster and smoother. See you soon!
			</p>

			<Suspense fallback={<Spinner />}>
				<UpdateProfileForm>
					{/* <SelectCountry
					name="nationality"
					id="nationality"
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
					defaultCountry={nationality}
				/> */}
				</UpdateProfileForm>
			</Suspense>
		</div>
	);
}
