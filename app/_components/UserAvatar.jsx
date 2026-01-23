import { auth } from "@/auth";
import Image from "next/image";

export const UserAvatar = async () => {
	const session = await auth();

	if (!session) return null;

	return (
		<Image
			src={session.user.image}
			alt={session.user.name}
			width={32}
			height={32}
			className="rounded-full"
		/>
	);
};
