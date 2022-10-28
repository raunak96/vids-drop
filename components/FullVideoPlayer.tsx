import { FC, MouseEvent, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill, BsFullscreen } from "react-icons/bs";
import { BsPlay } from "react-icons/bs";

interface IProps {
	video: {
		asset: {
			_id: string;
			url: string;
		};
	};
}
const FullVideoPlayer: FC<IProps> = ({ video }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = useState(false);
	const [isVideoMuted, setIsVideoMuted] = useState(false);

	const onVideoPress = () => {
		if (playing) videoRef?.current?.pause();
		else videoRef?.current?.play();
	};
	const onVolPress = () => setIsVideoMuted(prev => !prev);

	return (
		<div className="group lg:h-[100vh] h-[60vh]">
			<video
				loop
				ref={videoRef}
				onPlaying={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				src={video.asset.url}
				muted={isVideoMuted}
				onClick={onVideoPress}
				className="h-full cursor-pointer object-cover"
			/>
			<div className="hidden group-hover:flex absolute top-[45%] left-[40%] cursor-pointer">
				{playing ? (
					<button
						onClick={onVideoPress}
						className="bg-black rounded-full p-2">
						<BsFillPauseFill
							className="text-6xl lg:text-8xl"
							color="#fff"
						/>
					</button>
				) : (
					<button
						onClick={onVideoPress}
						className="bg-black rounded-full p-2">
						<BsFillPlayFill
							className="text-6xl lg:text-8xl"
							color="#fff"
						/>
					</button>
				)}
			</div>
			<div className="hidden group-hover:flex gap-4 absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
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
	);
};
export default FullVideoPlayer;
