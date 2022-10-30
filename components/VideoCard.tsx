import { FC } from "react";
import { Video } from "../types";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import Image from "next/future/image";
import VideoPlayer from "./VideoPlayer";
import { BsPlay } from "react-icons/bs";

interface IProps {
	video: Video;
	isHomePage?: boolean;
}
const VideoCard: FC<IProps> = ({
	video: { caption, postedBy, video, _id, likes },
	isHomePage = false,
}) => {
	if (!isHomePage) {
		return (
			<div>
				<Link href={`/post/${_id}`}>
					<video
						loop
						src={video.asset.url}
						className="w-[250px] md:w-full rounded-xl cursor-pointer"></video>
				</Link>
				<div className="flex gap-2 -mt-8 items-center ml-4">
					<p className="text-white text-lg font-medium flex gap-1 items-center">
						<BsPlay className="text-2xl" />
						{likes?.length || 0}
					</p>
				</div>
				<Link href={`/post/${_id}`}>
					<p className="mt-5 text-md text-gray-800 cursor-pointer w-210">
						{caption}
					</p>
				</Link>
			</div>
		);
	}
	return (
		<div className="flex flex-col border-b-2 border-gray-200 pb-6">
			<div>
				<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
					<div className="md:w-16 md:h-16 w-10 h-10">
						<Link href={`/profile/${postedBy?._id}`}>
							<a>
								<Image
									width={62}
									height={62}
									sizes="100vw"
									className=" rounded-full"
									src={postedBy?.avatar}
									alt="user-profile"
								/>
							</a>
						</Link>
					</div>
					<div>
						<Link href={`/profile/${postedBy?._id}`}>
							<a className="flex items-center gap-2">
								<p className="flex gap-2 items-center md:text-md font-bold text-primary">
									{postedBy.userName}{" "}
									<GoVerified className="text-blue-400 text-md" />
								</p>
								<p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
									{postedBy.userName}
								</p>
							</a>
						</Link>
						<Link href={`/post/${_id}`}>
							<a>
								<p className="mt-2 font-normal ">{caption}</p>
							</a>
						</Link>
					</div>
				</div>
			</div>
			<VideoPlayer video={video} id={_id} />
		</div>
	);
};
export default VideoCard;
