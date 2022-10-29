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

export const postDetailQuery = (postId: string | string[]): string => {
	const query = `*[_type == "post" && _id == "${postId}"]{
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
    "commentKeys":comments[]{_key},
    comments[]->{
            comment,
            postedBy->{
                _id,
                avatar,
                userName
            },
            _createdAt
        }
    
  }`;
	return query;
};
