import { NextApiRequest, NextApiResponse } from "next";
import { allPostsQuery } from "../../../queries/postQueries";
import client from "../../../sanity.config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			const query = allPostsQuery();
			const data = await client.fetch(query);
			return res.status(200).json(data);
		case "POST":
			await client.create(req.body);
			return res
				.status(201)
				.send({ message: "Created Post successfully." });
		default:
			return res.status(403).json({
				message: `Method ${req.method} is not allowed for this resource`,
			});
	}
};

export default handler;
