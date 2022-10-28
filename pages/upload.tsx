import { NextPage } from "next";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import { topics } from "../utils/constants";
import { useForm } from "react-hook-form";
import client from "../sanity.config";
import useAuthStore from "../store/authStore";

interface IFormInputs {
	videoUpload: File;
	caption: string;
	topic: string;
}

const Upload: NextPage = () => {
	const [videoAsset, setVideoAsset] = useState<
		string | ArrayBuffer | undefined
	>();
	const { userProfile } = useAuthStore();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		clearErrors,
		resetField,
		getValues,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<IFormInputs>();

	const onSubmit = async (data: IFormInputs) => {
		const { caption, topic, videoUpload: file } = data;
		/* Upload video to Sanity */
		let videoAsset;
		try {
			const { type, name } = file;
			videoAsset = await client.assets.upload("file", file, {
				contentType: type,
				filename: name,
			});
		} catch (error) {
			console.log("Video Upload failed", error);
			return;
		}
		const doc = {
			_type: "post",
			caption,
			video: {
				_type: "file",
				asset: {
					_type: "reference",
					_ref: videoAsset?._id,
				},
			},
			userId: userProfile?._id,
			postedBy: {
				_type: "reference",
				_ref: userProfile?._id,
			},
			topic,
		};
		try {
			await client.create(doc);
			router.push("/");
		} catch (error) {
			console.log("Could not create a new post", error);
		}
	};

	const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e?.target?.files?.[0]) return;
		const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

		const file = e.target.files[0];
		const fileType = file.type;

		if (!fileTypes.includes(fileType)) {
			setError("videoUpload", {
				type: "fileType",
				message: "Please select a video file (mp4 or webm or ogg)",
			});
		} else {
			clearErrors("videoUpload");
			var reader = new FileReader();
			reader.onload = function (e) {
				setVideoAsset(e.target?.result ?? undefined);
			};
			reader.readAsDataURL(file);
			setValue("videoUpload", file);
		}
	};

	return (
		<div className="flex absolute w-full left-0 top-[67px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
			<div className="bg-white rounded-lg 2xl:w-3/5 sm:w-4/5 w-full flex gap-6 flex-col items-center p-14 pt-6">
				<div className="text-center">
					<p className="text-2xl font-bold">Upload Video</p>
					<p className="text-md text-gray-400 mt-1">
						Post a video to your account
					</p>
					{Object.keys(errors).length > 0 &&
						errors?.videoUpload?.type !== "fileType" && (
							<p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
								All fields are required!
							</p>
						)}
				</div>
				<form
					className="flex flex-1 w-full space-x-12 space-y-6 flex-wrap justify-between items-center"
					onSubmit={handleSubmit(onSubmit)}>
					<div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[280px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 mx-auto">
						<div>
							{!videoAsset ? (
								<label className="cursor-pointer">
									<div className="flex flex-col items-center justify-center h-full">
										<div className="flex flex-col justify-center items-center">
											<p className="font-bold text-xl">
												<FaCloudUploadAlt className="text-gray-300 text-6xl" />
											</p>
											<p className="text-xl font-semibold">
												Select video to upload
											</p>
										</div>

										<p className="text-gray-400 text-center mt-10 text-sm leading-10">
											MP4 or WebM or ogg <br />
											720x1280 resolution or higher <br />
											Up to 10 minutes <br />
											Less than 2 GB
										</p>
										<p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
											Select file
										</p>
									</div>
									<input
										type="file"
										{...register("videoUpload", {
											required: true,
										})}
										onChange={e => {
											handleVideoChange(e);
										}}
										accept="video/*"
										className="w-0 h-0"
									/>
								</label>
							) : (
								<div className="rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center">
									<video
										className="rounded-xl h-[462px] mt-16 bg-black object-cover"
										controls
										loop
										src={`${videoAsset}`}
									/>
									<div className=" flex justify-between gap-6 px-2">
										<p className="text-lg">
											{getValues("videoUpload").name}
										</p>
										<button
											type="button"
											className="border-none text-red-500 opacity-60 p-2 text-xl cursor-pointer outline-none hover:opacity-100 hover:scale-125 transition-all duration-500 ease-in-out"
											onClick={() => {
												setVideoAsset(undefined);
												resetField("videoUpload");
											}}>
											<MdDelete />
										</button>
									</div>
								</div>
							)}
						</div>

						{errors?.videoUpload?.type === "fileType" && (
							<p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
								{errors.videoUpload.message}
							</p>
						)}
					</div>
					<div
						className="flex flex-col gap-3 py-10 px-4"
						style={{ margin: "0 auto" }}>
						<label className="text-md font-medium ">Caption</label>
						<input
							{...register("caption", {
								required: true,
							})}
							type="text"
							className="rounded outline-none text-md border-2 border-gray-200 p-2"
						/>
						<label className="text-md font-medium ">
							Choose a topic
						</label>

						<select
							{...register("topic", {
								required: true,
							})}
							className="outline-none border-2 border-gray-200 text-md capitalize p-2 rounded cursor-pointer">
							{topics.map(item => (
								<option
									key={item.name}
									className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
									value={item.name}>
									{item.name}
								</option>
							))}
						</select>
						<div className="flex gap-6 mt-10">
							<button
								onClick={() => {
									reset();
									clearErrors();
								}}
								type="button"
								className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none">
								Discard
							</button>
							<button
								disabled={isSubmitting}
								type="submit"
								className="bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none">
								{isSubmitting ? "Posting..." : "Post"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Upload;
