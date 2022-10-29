import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { GiCakeSlice, GiGalaxy, GiLipstick } from "react-icons/gi";
import { FaPaw, FaMedal, FaGamepad } from "react-icons/fa";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const topics = [
	{
		name: "coding",
		icon: <BsCode />,
	},
	{
		name: "comedy",
		icon: <BsEmojiSunglasses />,
	},
	{
		name: "gaming",
		icon: <FaGamepad />,
	},
	{
		name: "food",
		icon: <GiCakeSlice />,
	},
	{
		name: "dance",
		icon: <GiGalaxy />,
	},
	{
		name: "beauty",
		icon: <GiLipstick />,
	},
	{
		name: "animals",
		icon: <FaPaw />,
	},
	{
		name: "sports",
		icon: <FaMedal />,
	},
];

const footerList1 = [
	"About",
	"Newsroom",
	"Store",
	"Contact",
	"Careers",
	"ByteDance",
	"Creator Directory",
];
const footerList2 = [
	"VidsDrop",
	"Advertise",
	"Developers",
	"Transparency",
	"VidsDrop Reward Drops",
];
const footerList3 = [
	"Help",
	"Safety",
	"Terms",
	"Privacy",
	"Creator Portal",
	"Community Guidelines",
];

export const footerList = [footerList1, footerList2, footerList3];
