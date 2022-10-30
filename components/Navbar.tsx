import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsDroplet } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import logo from "../public/logo.jpg";
import Image from "next/future/image";
import Login from "./Login";
import useAuthStore from "../store/authStore";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";

const Navbar = () => {
	const { userProfile: user, removeUser } = useAuthStore();
	const router = useRouter();
	const searchRef = useRef<any>(null);
	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		if (searchRef.current.value)
			router.push(`/search/${searchRef.current.value}`);
	};
	return (
		<nav>
			<ul className="sticky bg-white top-0 z-40 w-full flex justify-between items-center border-b-2 border-gray-200 py-3 px-4 ">
				<li>
					<Link href="/">
						<a className="w-[100px] md:w-[129px] md:h-[38px] h-[30px] flex items-center gap-x-1">
							<Image
								className="w-full h-full object-contain"
								src={logo}
								sizes="100vw"
								alt="logo"
							/>
							<h3 className="logo text-bold text-xl uppercase flex items-center justify-start">
								Vids
								<BsDroplet color="#f05f57" />
								<p className="hidden lg:inline">Drop</p>
							</h3>
						</a>
					</Link>
				</li>
				<li className="relative hidden md:block">
					<form
						onSubmit={handleSearch}
						className="absolute md:static top-10 -left-20 bg-white">
						<input
							ref={searchRef}
							type="text"
							className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
							placeholder="Search accounts and videos"
						/>
						<button
							type="submit"
							className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400">
							<BiSearch />
						</button>
					</form>
				</li>
				<li>
					{user ? (
						<div className="flex gap-5 md:gap-10">
							<Link href="/upload">
								<button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
									<IoMdAdd className="text-xl" />{" "}
									<span className="hidden md:block">
										Upload{" "}
									</span>
								</button>
							</Link>
							{user.avatar && (
								<Link href={`/profile/${user._id}`}>
									<a>
										<Image
											className="rounded-full"
											src={user.avatar}
											alt="user"
											width={40}
											height={40}
										/>
									</a>
								</Link>
							)}
							<button
								type="button"
								className=" border-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
								onClick={() => {
									googleLogout();
									removeUser();
									router.replace("/");
								}}>
								<AiOutlineLogout color="red" fontSize={21} />
							</button>
						</div>
					) : (
						<Login />
					)}
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;
