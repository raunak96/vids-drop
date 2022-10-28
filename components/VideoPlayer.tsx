import Link from "next/link";
import { FC, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { BsPlay } from "react-icons/bs";

interface IProps {
	video: {
		asset: {
			_id: string;
			url: string;
		};
	};
	id: string;
}
const VideoPlayer: FC<IProps> = ({ video, id }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = useState(false);
	const [isVideoMuted, setIsVideoMuted] = useState(false);

	const onVideoPress = () => {
		if (playing) {
			videoRef?.current?.pause();
			setPlaying(false);
		} else {
			videoRef?.current?.play();
			setPlaying(true);
		}
	};
	const onVolPress = () => {
		setIsVideoMuted(prev => !prev);
	};

	return (
		<div className="lg:ml-20 flex gap-4">
			<div className="rounded-3xl group relative mr-4 sm:mr-0">
				<Link href={`/post/${id}`}>
					<a>
						<video
							loop
							ref={videoRef}
							src={video.asset.url}
							muted={isVideoMuted}
							className="h-[300px] md:h-[400px] lg:h-[528px] w-full sm:w-[400px] md:w-[500px] lg:w-[600px] rounded-2xl bg-black object-contain"
						/>
					</a>
				</Link>
				<div className="hidden group-hover:flex absolute bottom-6 cursor-pointer left-0 right-0 justify-between p-3">
					{playing ? (
						<button
							onClick={onVideoPress}
							className="bg-black rounded-full p-2">
							<BsFillPauseFill
								className="text-2xl lg:text-4xl"
								color="#fff"
							/>
						</button>
					) : (
						<button
							onClick={onVideoPress}
							className="bg-black rounded-full p-2">
							<BsFillPlayFill
								className="text-2xl lg:text-4xl"
								color="#fff"
							/>
						</button>
					)}
					{isVideoMuted ? (
						<button
							onClick={onVolPress}
							className="bg-black rounded-full p-2">
							<HiVolumeOff
								className="text-2xl lg:text-4xl"
								color="#fff"
							/>
						</button>
					) : (
						<button
							onClick={onVolPress}
							className="bg-black rounded-full p-2">
							<HiVolumeUp
								className="text-2xl lg:text-4xl"
								color="#fff"
							/>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
export default VideoPlayer;
