import Image from "next/future/image";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";
import { GoVerified } from "react-icons/go";
import NoResults from "./NoResult";
import moment from "moment";
import useAuthStore from "../store/authStore";
import { useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import client from "../sanity.config";
import { Video } from "../types";

interface IProps {
	// isPostingComment: Boolean;
	// comment: string;
	// setComment: Dispatch<SetStateAction<string>>;
	// addComment: (e: React.FormEvent) => void;
	comments: IComment[];
	commentKeys: {
		_key: string;
	}[];
	postId: string;
	setPost: Dispatch<SetStateAction<Video>>;
}

interface IComment {
	comment: string;
	length?: number;
	_createdAt: string;
	_key?: string;
	postedBy: { _id: string; userName: string; avatar: string };
}
interface IFormInputs {
	comment: string;
}

const Comments: FC<IProps> = ({ comments, postId, setPost, commentKeys }) => {
	const { userProfile } = useAuthStore();
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<IFormInputs>();
	const addComment = async ({ comment }: IFormInputs) => {
		try {
			const commentData = await client.create({
				_type: "comment",
				comment,
				postedBy: { _type: "reference", _ref: userProfile._id },
			});
			const data = await client
				.patch(postId)
				.setIfMissing({ comments: [] })
				.insert("before", "comments[0]", [
					{
						_type: "reference",
						_ref: commentData?._id,
					},
				])
				.commit({ autoGenerateArrayKeys: true });
			const addedComment = {
				_key: data.comments[0]._key,
				comment: commentData.comment,
				_createdAt: commentData._createdAt,
				postedBy: {
					_id: userProfile._id,
					avatar: userProfile.avatar,
					userName: userProfile.userName,
				},
			};
			setPost(post => ({
				...post,
				comments: [addedComment, ...(post.comments ?? [])],
				commentKeys: [
					{ _key: data.comments[0]._key },
					...(post.commentKeys ?? []),
				],
			}));
			reset();
		} catch (error) {
			console.log("Could not add your comment");
		}
	};
	return (
		<div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
			<div className="overflow-scroll lg:h-[457px]">
				{comments.length > 0 ? (
					comments.map((comment: IComment, ind: number) => (
						<div
							className="p-2 items-center"
							key={`${commentKeys?.[ind]?._key}-${ind}`}>
							<Link href={`/profile/${comment.postedBy?._id}`}>
								<div className="flex items-start gap-3">
									<div className="w-12 h-12">
										<Image
											width={48}
											height={48}
											className="rounded-full cursor-pointer"
											src={comment.postedBy?.avatar}
											alt="user-profile"
											sizes="100vw"
										/>
									</div>

									<p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
										{comment.postedBy?.userName}{" "}
										<GoVerified className="text-blue-400" />
									</p>
								</div>
							</Link>
							<div className="flex justify-between">
								<p className="-mt-5 ml-16 text-[16px] mr-8">
									{comment.comment}
								</p>
								<p className="-mt-5 text-sm text-gray-500">
									{moment(comment._createdAt).fromNow()}
								</p>
							</div>
						</div>
					))
				) : (
					<NoResults text="No Comments Yet! Be First to do add the comment." />
				)}
				<div className="invisible mb-10 sm:mb-16" />
			</div>
			{userProfile && (
				<div className="absolute bottom-0 left-0 pb-6 px-6 sm:px-10 w-full">
					<form
						onSubmit={handleSubmit(addComment)}
						className="flex justify-between items-center bg-white px-6 py-4 text-md font-medium border-2 w-full border-gray-200 focus-within:outline-none focus-within:shadow-md focus-within:border-2 focus-within:border-gray-300 flex-1 rounded-lg">
						<input
							className="outline-none bg-transparent border-none"
							placeholder="Add comment.."
							{...register("comment", {
								required: "Comment cannot be empty",
							})}
						/>
						<button disabled={isSubmitting} type="submit">
							<IoMdSend
								className={`${
									isSubmitting && "opacity-50"
								} text-xl sm:text-3xl`}
							/>
						</button>
					</form>
				</div>
			)}
		</div>
	);
};
export default Comments;
