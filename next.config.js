/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["cdn4.iconfinder.com"],
	},
};

module.exports = nextConfig;
