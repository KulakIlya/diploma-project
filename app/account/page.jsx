import { auth } from "@/auth";

export const metadata = {
	title: "Guest area",
};

const Page = async () => {
	const {
		user: { name },
	} = await auth();

	return (
		<h2 className="mb-7 text-2xl font-semibold text-accent-400">
			Welcome, {name}
		</h2>
	);
};
export default Page;
