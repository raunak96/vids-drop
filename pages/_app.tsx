import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [isSSR, setIsSSR] = useState(true);
	useEffect(() => {
		/*  As NextJS runs both server/client Side, to know when what type rendering is happening, we initially set isSSR=true and as soon as 
            useEffect runs first time, we know now client side rendering is happening so we set isSSR=false
        */
		setIsSSR(false);
	}, []);
	if (isSSR) return null;
	return (
		<GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CID}`}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</GoogleOAuthProvider>
	);
};

export default MyApp;
