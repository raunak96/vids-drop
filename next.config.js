/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["lh3.googleusercontent.com", "cdn4.iconfinder.com"],
	},
};

module.exports = nextConfig;
