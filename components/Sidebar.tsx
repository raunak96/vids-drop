import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import Footer from "./Footer";
import SuggestedAccounts from "./SuggestedAccounts";

const Sidebar: FC = () => {
	const [showSidebar, setShowSidebar] = useState<Boolean>(true);
	const { pathname } = useRouter();
	const userProfile = false;
	return (
		<aside>
			<button
				type="button"
				className={`block xl:hidden m-2 mt-3 cursor-pointer ${
					showSidebar ? "mx-auto" : "ml-3"
				}`}
				onClick={() => setShowSidebar(prev => !prev)}>
				{showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
			</button>
			{showSidebar && (
				<ul className="xl:w-[400px] w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
					<li className="xl:border-b-2 border-gray-200 xl:pb-4">
						<Link href="/">
							<a
								className={`nav-link ${
									pathname === "/" && "nav-link-active"
								}`}>
								<p className="text-2xl">
									<AiFillHome />
								</p>
								<span className="capitalize text-xl hidden xl:block">
									For You
								</span>
							</a>
						</Link>
					</li>
					<Discover />
					<SuggestedAccounts />
					<Footer />
				</ul>
			)}
		</aside>
	);
};
export default Sidebar;
