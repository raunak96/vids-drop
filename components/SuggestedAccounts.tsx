import Image from "next/future/image";
import Link from "next/link";
import { FC, useEffect, useMemo } from "react";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import arrayShuffle from "array-shuffle";

const SuggestedAccounts: FC = () => {
	const { allUsers, fetchAllUsers } = useAuthStore();
	useEffect(() => {
		fetchAllUsers();
	}, [fetchAllUsers]);

	return (
		<li className="xl:border-b-2 border-gray-200 pb-4">
			<p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
				Suggested accounts
			</p>
			<>
				{allUsers &&
					arrayShuffle(allUsers)
						?.slice(0, 6)
						?.map((user: IUser) => (
							<Link href={`/profile/${user._id}`} key={user._id}>
								<div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
									<div className="w-8 h-8">
										<Image
											width={34}
											height={34}
											className="rounded-full"
											src={user.avatar}
											alt="user-profile"
											sizes="100vw"
										/>
									</div>

									<div className="hidden xl:block">
										<p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
											{user.userName.replace(/\s+/g, "")}{" "}
											<GoVerified className="text-blue-400" />
										</p>
										<p className="capitalize text-gray-400 text-xs">
											{user.userName}
										</p>
									</div>
								</div>
							</Link>
						))}
			</>
		</li>
	);
};
export default SuggestedAccounts;
