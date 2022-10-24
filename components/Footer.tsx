import { FC, useId } from "react";
import { footerList } from "../utils/constants";

const Footer: FC = () => {
	const id = useId();
	return (
		<li className="hidden xl:block mt-6">
			<footer>
				{footerList.map((footer: string[], ind: number) => (
					<div
						key={`${id}-${ind}`}
						className="flex flex-wrap gap-2 mt-4">
						{footer.map((item: string) => (
							<p
								key={item}
								className="text-gray-400 text-sm  hover:underline cursor-pointer">
								{item}
							</p>
						))}
					</div>
				))}
				<p className="text-gray-400 text-sm mt-5">
					&copy; {new Date().getFullYear()} VidsDrop
				</p>
			</footer>
		</li>
	);
};
export default Footer;
