export const allPostsQuery = (): string => {
	const query = `*[_type=="post" ] | order(_createdAt desc){
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
        comments[]{
            _key,
            comment,
            postedBy->{
                _id,
                userName,
                avatar
            },
        }
    }`;
	return query;
};
