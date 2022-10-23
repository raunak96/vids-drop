import { NextComponentType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

const Discover: NextComponentType = () => {
	const router = useRouter();
	const { topic } = router.query;
	return (
		<li className="xl:border-b-2 xl:border-gray-200 pb-6">
			<p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
				Popular Topics
			</p>
			<ul className="flex gap-3 flex-wrap">
				{topics?.map(item => (
					<li key={item.name}>
						<Link href={`/?topic=${item.name}`}>
							<a
								className={`sidenav-link ${
									topic === item.name && "sidenav-link-active"
								}`}>
								<span className="font-bold text-2xl xl:text-md ">
									{item.icon}
								</span>
								<span
									className={`font-medium text-md hidden xl:block capitalize`}>
									{item.name}
								</span>
							</a>
						</Link>
					</li>
				))}
			</ul>
		</li>
	);
};
export default Discover;
