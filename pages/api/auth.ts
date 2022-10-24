import { NextApiRequest, NextApiResponse } from "next";
import client from "../../sanity.config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const user = req.body;
		try {
			const data = await client.createIfNotExists(user);
			console.log(data);
			return res.status(201).json(data);
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	}
};

export default handler;
