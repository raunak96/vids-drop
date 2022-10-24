import { createClient } from "next-sanity";

const client = createClient({
	projectId: "ce444ubs",
	dataset: "production",
	apiVersion: "2022-03-10",
	useCdn: false,
	token: process.env.SANITY_TOKEN,
});

export default client;
