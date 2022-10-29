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
		_key: string;
		_type: string;
		_ref: string;
	}[];
	comments: {
		comment: string;
		_key?: string;
		postedBy: {
			_id: string;
			userName: string;
			avatar: string;
		};
		_createdAt: string;
	}[];
	commentKeys?: {
		_key: string;
	}[];
	userId: string;
}

export interface IUser {
	_id: string;
	_type: string;
	userName: string;
	avatar: string;
}
