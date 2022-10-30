import { NextApiRequest, NextApiResponse } from "next";
import client from "../../sanity.config";
import { IUser } from "../../types";

interface IError {
	message: string;
}
const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<Array<IUser> | IError>
) => {
	switch (req.method) {
		case "GET":
			try {
				const data: Array<IUser> = await client.fetch(
					`*[_type=="user" ]{
                        _id,
                        avatar,
                        userName
                    }`
				);
				if (data) return res.status(200).json(data);
			} catch (error) {
				return res
					.status(500)
					.json({ message: "Could not get users data" });
			}
		default:
			return res.status(403).json({
				message: `Method ${req.method} is not allowed for this resource`,
			});
	}
};

export default handler;
