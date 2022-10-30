import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { searchPostsQuery } from "../../queries/postQueries";
import client from "../../sanity.config";
import useAuthStore from "../../store/authStore";
import { IUser, Video } from "../../types";
import NoResults from "../../components/NoResult";
import Image from "next/future/image";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import VideoCard from "../../components/VideoCard";

interface IProps {
	videos: Video[];
}
const SearchPage: NextPage<IProps> = ({ videos }) => {
	const { allUsers } = useAuthStore();
	const router = useRouter();
	const { searchTerm }: any = router.query;
	const [isAccounts, setIsAccounts] = useState(false);

	const searchedAccounts = useMemo(
		() =>
			allUsers?.filter((user: IUser) =>
				user.userName.toLowerCase().includes(searchTerm)
			),
		[searchTerm, allUsers]
	);

	return (
		<div className="w-full  ">
			<div className="flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full">
				<p
					onClick={() => setIsAccounts(true)}
					className={`text-xl  font-semibold cursor-pointer ${
						isAccounts ? "border-b-2 border-black" : "text-gray-400"
					} mt-2`}>
					Accounts
				</p>
				<p
					className={`text-xl font-semibold cursor-pointer ${
						!isAccounts
							? "border-b-2 border-black"
							: "text-gray-400"
					} mt-2`}
					onClick={() => setIsAccounts(false)}>
					Videos
				</p>
			</div>
			{isAccounts ? (
				<div className="md:mt-16 mb-10">
					{searchedAccounts.length > 0 ? (
						searchedAccounts.map((user: IUser) => (
							<Link key={user._id} href={`/profile/${user._id}`}>
								<a className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
									<div>
										<Image
											width={50}
											height={50}
											sizes="100vw"
											className="rounded-full"
											alt="user-profile"
											src={user.avatar}
										/>
									</div>
									<div>
										<div>
											<p className="flex gap-1 items-center text-lg font-bold text-primary">
												{user.userName}{" "}
												<GoVerified className="text-blue-400" />
											</p>
											<p className="capitalize text-gray-400 text-sm">
												{user.userName}
											</p>
										</div>
									</div>
								</a>
							</Link>
						))
					) : (
						<NoResults
							text={`No Account Results for ${searchTerm}`}
						/>
					)}
				</div>
			) : (
				<div className="md:mt-16 flex flex-wrap gap-6 md:justify-start ">
					{videos.length ? (
						videos.map((post: Video) => (
							<VideoCard video={post} key={post._id} />
						))
					) : (
						<NoResults
							text={`No Video Results for ${searchTerm}`}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const searchTerm = params?.searchTerm ?? "";
	const videos = await client.fetch(searchPostsQuery(searchTerm));
	return {
		props: {
			videos,
		},
	};
};

export default SearchPage;
