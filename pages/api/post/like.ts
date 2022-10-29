import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../sanity.config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "PUT":
			try {
				const { userId, postId, isAlreadyLiked } = req.body;
				const data = !isAlreadyLiked
					? await client
							.patch(postId)
							.setIfMissing({ likes: [] })
							.insert("after", "likes[-1]", [
								{
									_ref: userId,
								},
							])
							.commit({ autoGenerateArrayKeys: true })
					: await client
							.patch(postId)
							.unset([`likes[_ref=="${userId}"]`])
							.commit();

				return res.status(200).json(data);
			} catch (error) {
				return res
					.status(500)
					.json({ message: "Could not complete the request." });
			}
		default:
			return res.status(403).json({
				message: `Method ${req.method} is not allowed for this resource`,
			});
	}
};

export default handler;
