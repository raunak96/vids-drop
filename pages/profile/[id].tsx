import { GetServerSideProps, NextPage } from "next";
import { useMemo, useState } from "react";
import {
	userCreatedPostsQuery,
	userDetailsQuery,
	userLikedPostsQuery,
} from "../../queries/userQueries";
import client from "../../sanity.config";
import { IUser, Video } from "../../types";
import NoResults from "../../components/NoResult";
import { GoVerified } from "react-icons/go";
import Image from "next/future/image";
import VideoCard from "../../components/VideoCard";

interface IProps {
	user: IUser;
	userVideos: Video[];
	userLikedVideos: Video[];
}
const Profile: NextPage<IProps> = ({ user, userVideos, userLikedVideos }) => {
	const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
	const videosList = useMemo(
		() => (showUserVideos ? userVideos : userLikedVideos),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[showUserVideos]
	);

	return (
		<div className="w-full">
			<div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
				<div className="w-16 h-16 md:w-32 md:h-32">
					<Image
						width={120}
						height={120}
						sizes="100vw"
						className="rounded-full"
						src={user.avatar}
						alt="user-profile"
					/>
				</div>

				<div>
					<div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
						<span>{user?.userName?.replace(/\s+/g, "")} </span>
						<GoVerified className="text-blue-400 md:text-xl text-md" />
					</div>
					<p className="text-sm font-medium"> {user.userName}</p>
				</div>
			</div>
			<div>
				<div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
					<p
						className={`text-xl font-semibold cursor-pointer ${
							showUserVideos
								? "border-b-2 border-black"
								: "text-gray-400"
						} mt-2`}
						onClick={() => setShowUserVideos(true)}>
						Videos
					</p>
					<p
						className={`text-xl font-semibold cursor-pointer ${
							!showUserVideos
								? "border-b-2 border-black"
								: "text-gray-400"
						} mt-2`}
						onClick={() => setShowUserVideos(false)}>
						Liked
					</p>
				</div>
				<div className="flex gap-6 flex-wrap md:justify-start">
					{videosList.length > 0 ? (
						videosList.map((post: Video) => (
							<VideoCard key={post._id} video={post} />
						))
					) : (
						<NoResults
							text={`No ${
								showUserVideos ? "" : "Liked"
							} Videos Yet`}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const id = context.params?.id ?? "";
	try {
		const [[user], userVideos, userLikedVideos] = await Promise.all([
			client.fetch(userDetailsQuery(id)),
			client.fetch(userCreatedPostsQuery(id)),
			client.fetch(userLikedPostsQuery(id)),
		]);
		if (!user)
			return {
				redirect: { destination: "/", permanent: true },
			};
		return {
			props: { user, userVideos, userLikedVideos },
		};
	} catch (error) {
		return {
			redirect: { destination: "/", permanent: true },
		};
	}
};
/* export const getStaticProps: GetStaticProps = async context => {
	const id = context.params?.id ?? "";
	try {
		const [[user], userVideos, userLikedVideos] = await Promise.all([
			client.fetch(userDetailsQuery(id)),
			client.fetch(userCreatedPostsQuery(id)),
			client.fetch(userLikedPostsQuery(id)),
		]);
		if (!user)
			return {
				redirect: { destination: "/", permanent: true },
			};
		return {
			props: { user, userVideos, userLikedVideos },
			revalidate: 10,
		};
	} catch (error) {
		return {
			redirect: { destination: "/", permanent: true },
		};
	}
};
export const getStaticPaths: GetStaticPaths = async () => {
	const userIds = await client.fetch(
		`*[_type == "user"][0..9]{
            _id
        }`
	);
	const paths = userIds.map(({ _id }: { _id: string }) => ({
		params: { id: _id },
	}));
	return {
		paths,
		fallback: true,
	};
};
 */
export default Profile;
