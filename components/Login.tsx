import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils/constants";

const Login = () => {
	const { addUser } = useAuthStore();

	const loginUser = async (res: CredentialResponse) => {
		const decoded: {
			name: string;
			picture: string;
			sub: string;
			email: string;
		} = jwt_decode(`${res.credential}`);
		const { name, picture, sub, email } = decoded;
		const userDoc = {
			_type: "user",
			_id: sub,
			avatar: picture,
			userName: name,
			email,
		};
		const { data } = await axios.post(`${BASE_URL}/api/auth`, userDoc);
		addUser(data);
	};
	return (
		<GoogleLogin
			onSuccess={loginUser}
			auto_select={true}
			onError={() => console.log("Login Failed")}
			useOneTap
		/>
	);
};
export default Login;
