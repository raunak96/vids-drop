import { Dispatch, FC, SetStateAction } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import client from "../sanity.config";
import { Video } from "../types";

interface IProps {
	isAlreadyLiked: boolean;
	setIsAlreadyLiked: Dispatch<SetStateAction<boolean>>;
	noOfLikes: number;
	flex?: string;
	postId: string;
	userId: string;
	setPost: Dispatch<SetStateAction<Video>>;
}
const LikeButton: FC<IProps> = ({
	isAlreadyLiked,
	setIsAlreadyLiked,
	flex = "",
	noOfLikes,
	postId,
	userId,
	setPost,
}) => {
	const handleLike = async () => {
		try {
			const data = !isAlreadyLiked
				? await client
						.patch(postId)
						.setIfMissing({ likes: [] })
						.insert("before", "likes[0]", [
							{
								_ref: userId,
							},
						])
						.commit({ autoGenerateArrayKeys: true })
				: await client
						.patch(postId)
						.unset([`likes[_ref=="${userId}"]`])
						.commit();
			setPost(post => ({ ...post, likes: data.likes }));
			setIsAlreadyLiked(prev => !prev);
		} catch (error) {
			console.log("Could not complete the request.");
		}
	};

	return (
		<div className={`${flex} gap-6`}>
			<div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
				<div
					className={`bg-primary rounded-full p-2 md:p-4 ${
						isAlreadyLiked && "text-[#F51997]"
					}`}
					onClick={handleLike}>
					{isAlreadyLiked ? (
						<MdFavorite className="text-lg md:text-2xl" />
					) : (
						<MdFavoriteBorder className="text-lg md:text-2xl" />
					)}
				</div>

				<p className="text-md font-semibold ">{noOfLikes}</p>
			</div>
		</div>
	);
};
export default LikeButton;
