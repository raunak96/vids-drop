import { NextApiRequest, NextApiResponse } from "next";
import client from "../../sanity.config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "POST":
			const user = req.body;
			try {
				const data = await client.createIfNotExists(user);
				return res.status(201).json(data);
			} catch (error) {
				return res.status(500).json({ error: error });
			}
		default:
			return res.status(403).json({
				message: `Method ${req.method} is not allowed for this resource`,
			});
	}
};

export default handler;
