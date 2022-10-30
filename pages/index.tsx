import type { GetServerSideProps, NextPage } from "next";
import NoResult from "../components/NoResult";
import VideoCard from "../components/VideoCard";
import { allPostsQuery } from "../queries/postQueries";
import client from "../sanity.config";
import { Video } from "../types";

interface IProps {
	videos: Video[];
}
const Home: NextPage<IProps> = ({ videos }) => {
	return (
		<div className="flex flex-col gap-10 videos h-full">
			{videos?.length ? (
				videos?.map((video: Video) => (
					<VideoCard key={video._id} video={video} isHomePage />
				))
			) : (
				<NoResult text="No videos" />
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const query = allPostsQuery();
	const videos = await client.fetch(query);
	return {
		props: {
			videos,
		},
	};
};

export default Home;
