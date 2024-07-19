function FollowingFeed({visibleComponent, setVisibleComponent, currentProfile, setCurrentProfile}) {
    const {data, loading, error} = useFetch('following-feed');

    console.log(visibleComponent)
    console.log(currentProfile)

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className='feed'>
            {data.map(post => (
                <div className="post" id={`post_${post.id}`} key={post.id}>
                <a className="profile-link" href={`view-profile/${post.author_username}`} onClick={(e) => {
                    e.preventDefault();
                    console.log("SWAG")
                    console.log(`${post.author_username}`)
                    setVisibleComponent('profile')
                    setCurrentProfile(`${post.author_username}`)
                }}>@{post.author_username}</a>
                <div>{post.body}</div>
                <div>{post.time}</div>
                <div>Likes: {post.liked_by.length}</div>
            </div>
            ))}
        </div>
    )
}