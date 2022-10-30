export const userDetailsQuery = (id: string | string[]): string => {
	return `*[_type=="user" && _id=="${id}" ]{
                _id,
                avatar,
                userName
            }`;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
	const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
        _id,
        caption,
        video{
            asset->{
                _id,
                url
            }
        },
        userId,
        postedBy->{
            _id,
            userName,
            avatar
        },
        likes,
  }`;

	return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
	const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
        _id,
        caption,
        video{
            asset->{
                _id,
                url
            }
        },
        userId,
        postedBy->{
            _id,
            userName,
            avatar
        },
        likes,
  }`;

	return query;
};
