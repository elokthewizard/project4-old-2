function Profile({ currentProfile, setCurrentProfile, setVisibleComponent }) {
    const {data, loading} = useProfileData(currentProfile)

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2>{data.username}</h2>
            <a href="/" onClick={(e) => {
                        e.preventDefault();
                        setVisibleComponent('followers')
                        
                    }}>Followers: {data.followers.length}</a>
            <a href="/" onClick={(e) => {
                        e.preventDefault();
                        setVisibleComponent('following')
                        
                    }}>Following: {data.following.length}</a>
            <h3>Posts:</h3>
            {data.posts.map(post => (
                <div className="post" id={`post_${post.id}`} key={post.id}>
                    <a className="profile-link" href={`view-profile/${post.author_username}`} onClick={(e) => {
                        e.preventDefault();
                        setVisibleComponent('profile')
                        setCurrentProfile(`${post.author_username}`)
                    }}>@{post.author_username}</a>
                    <div>{post.body}</div>
                    <div>{post.time}</div>
                    <div>Likes: {post.liked_by.length}</div>
                </div>
            ))}
        </>
    )
}