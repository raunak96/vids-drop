import { NextApiRequest, NextApiResponse } from "next";
import { allPostsQuery } from "../../../queries/postQueries";
import client from "../../../sanity.config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const reqType = req.method;
	if (reqType === "GET") {
		const query = allPostsQuery();
		const data = await client.fetch(query);
		return res.status(200).json(data);
	}
	if (reqType == "POST") {
		await client.create(req.body);
		return res.status(201).send({ message: "Created Post successfully." });
	}
};

export default handler;
