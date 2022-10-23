import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsDroplet } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Link from "next/link";
import logo from "../public/logo.jpg";
import Image from "next/future/image";

const Navbar = () => {
	return (
		<nav>
			<ul className="w-full flex justify-between items-center border-b-2 border-gray-200 py-3 px-4 ">
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
								<p className="hidden md:inline">Drop</p>
							</h3>
						</a>
					</Link>
				</li>
				<li></li>
			</ul>
		</nav>
	);
};
export default Navbar;
