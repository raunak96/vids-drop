import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import GoogleLogin from "react-google-login";
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
				<ul className="xl:w-[400px] w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
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
					{!userProfile && (
						<li className="px-2 py-4 hidden xl:block">
							<p className="text-gray-400">
								Log in to like and comment on videos.
							</p>
							<GoogleLogin
								clientId=""
								render={renderProps => (
									<button
										className="mr-3 bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997]"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}>
										Log in
									</button>
								)}
								onSuccess={() => {}}
								onFailure={() => {}}
								cookiePolicy="single_host_origin"
							/>
						</li>
					)}
					<Discover />
					<SuggestedAccounts />
					<Footer />
				</ul>
			)}
		</aside>
	);
};
export default Sidebar;
