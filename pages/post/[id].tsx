import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import client from "../../sanity.config";
import { postDetailQuery } from "../../queries/postQueries";
import { Video } from "../../types";
import Spinner from "../../components/Spinner";
import { MdOutlineCancel } from "react-icons/md";
import FullVideoPlayer from "../../components/FullVideoPlayer";
import Link from "next/link";
import Image from "next/future/image";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";
import { useState } from "react";

interface IProps {
	postDetails: Video;
}

const Detail: NextPage<IProps> = ({ postDetails }) => {
	const [post, setPost] = useState(postDetails);

	const router = useRouter();
	const { userProfile } = useAuthStore();
	const [isAlreadyLiked, setIsAlreadyLiked] = useState(
		!!post?.likes?.find(like => like._ref === userProfile?._id)
	);

	if (router.isFallback) return <Spinner />;
	return (
		post && (
			<div className="fixed inset-0 z-50 overflow-auto bg-gray-100">
				<div className="flex w-full absolute bg-gray-100 flex-wrap lg:flex-nowrap">
					<div className="relative w-[1000px] lg:w-3/5 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
						<div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
							<p
								className="cursor-pointer "
								onClick={() => router.back()}>
								<MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
							</p>
						</div>
						<div className="relative">
							<FullVideoPlayer video={post.video} />
						</div>
					</div>

					<div className="relative w-full lg:w-2/5 bg-white">
						<div className="lg:mt-20 mt-10">
							<Link href={`/profile/${post.postedBy._id}`}>
								<div className="flex gap-4 mb-4 w-full pl-10 cursor-pointer">
									<Image
										width={60}
										height={60}
										alt="user-profile"
										className="rounded-full"
										src={post.postedBy.avatar}
									/>
									<div>
										<div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
											{post.postedBy.userName.replace(
												/\s+/g,
												""
											)}{" "}
											<GoVerified className="text-blue-400 text-xl" />
										</div>
										<p className="text-md">
											{" "}
											{post.postedBy.userName}
										</p>
									</div>
								</div>
							</Link>
							<div className="px-10">
								<p className=" text-md text-gray-600">
									{post.caption}
								</p>
							</div>
							{userProfile && (
								<div className="mt-10 px-10">
									<LikeButton
										isAlreadyLiked={isAlreadyLiked}
										noOfLikes={post.likes?.length || 0}
										flex="flex"
										setIsAlreadyLiked={setIsAlreadyLiked}
										postId={post._id}
										userId={userProfile._id}
										setPost={setPost}
									/>
								</div>
							)}
							<Comments
								comments={post?.comments ?? []}
								postId={post._id}
								setPost={setPost}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export const getStaticProps: GetStaticProps = async context => {
	const id = context.params?.id ?? "";
	try {
		const [post] = await client.fetch(postDetailQuery(id));
		if (!post)
			return {
				redirect: { destination: "/", permanent: true },
			};
		return {
			props: { postDetails: post },
			revalidate: 10,
		};
	} catch (error) {
		return {
			redirect: { destination: "/", permanent: true },
		};
	}
};
export const getStaticPaths: GetStaticPaths = async () => {
	const postIds = await client.fetch(
		`*[_type == "post"] | order(_createdAt desc)[0..9]{
            _id
        }`
	);
	const paths = postIds.map(({ _id }: { _id: string }) => ({
		params: { id: _id },
	}));
	return {
		paths,
		fallback: true,
	};
};

export default Detail;
