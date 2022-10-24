export interface Video {
	caption: string;
	video: {
		asset: {
			_id: string;
			url: string;
		};
	};
	_id: string;
	postedBy: {
		_id: string;
		userName: string;
		avatar: string;
	};
	likes: {
		postedBy: {
			_id: string;
			userName: string;
			avatar: string;
		};
	}[];
	comments: {
		comment: string;
		_key: string;
		postedBy: {
			_ref: string;
		};
	}[];
	userId: string;
}

export interface IUser {
	_id: string;
	_type: string;
	userName: string;
	avatar: string;
}
