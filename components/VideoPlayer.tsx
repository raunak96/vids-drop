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
}
const VideoPlayer: FC<IProps> = ({ video }) => {
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
		if (videoRef?.current) videoRef.current.muted = !isVideoMuted;
		setIsVideoMuted(prev => !prev);
	};

	return (
		<div className="lg:ml-20 flex gap-4">
			<div className="rounded-3xl group relative">
				<Link href={""}>
					<a>
						<video
							loop
							ref={videoRef}
							src={video.asset.url}
							className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl bg-gray-100"></video>
					</a>
				</Link>
				<div className="hidden group-hover:flex absolute bottom-6 cursor-pointer left-0 right-0 justify-between p-3">
					{playing ? (
						<button onClick={onVideoPress}>
							<BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
						</button>
					) : (
						<button onClick={onVideoPress}>
							<BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
						</button>
					)}
					{isVideoMuted ? (
						<button onClick={onVolPress}>
							<HiVolumeOff className="text-black text-2xl lg:text-4xl" />
						</button>
					) : (
						<button onClick={onVolPress}>
							<HiVolumeUp className="text-black text-2xl lg:text-4xl" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
export default VideoPlayer;
