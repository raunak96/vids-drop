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
    comments[]{
            _key,
          ...@->{
                comment,
                postedBy->{
                    _id,
                    avatar,
                    userName
                },
                _createdAt
            }
        }
    
  }`;
	return query;
};

export const topicPostsQuery = (topic: string | string[]) => {
	const query = `*[_type == "post" && topic match '${topic}*'] {
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

export const searchPostsQuery = (searchTerm: string | string[]) => {
	const query = `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
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
