import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface iProps {
	title?: string;
	children: ReactNode;
	keywords?: string[];
}

const Meta = ({
	title = "VidsDrop App",
	children,
	keywords = ["video-sharing", "sanity.io", "nextjs", "tailwind", "comments"],
}: iProps) => {
	return (
		<div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
			<Head>
				<title>{title}</title>
				<meta
					name="description"
					content="A Video Sharing Social Media Application"
				/>
				<meta name="keywords" content={keywords.join(", ")} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<Navbar />
			</header>
			<main className="flex gap-6 md:gap-20">
				<div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
					<Sidebar />
				</div>
				<div className="mt-4 flex flex-1 flex-col gap-10 overflow-auto h-[88vh] videos">
					{children}
				</div>
			</main>
		</div>
	);
};

export default Meta;
