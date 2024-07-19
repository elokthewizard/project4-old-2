function Feed({visibleComponent, setVisibleComponent, currentProfile, setCurrentProfile, postData, setPostData}) {
    const {data, loading, error} = useFetch('home');
    const [currentUser, setCurrentUser] = React.useState(null);

    React.useEffect(() => {
        fetch('current_user')
        .then(response => response.json())
        .then(data => {
            setCurrentUser(data.username)
            console.log(data.username)
        })
    }, [])

    React.useEffect(() => {
        console.log(postData);
    }, [postData]);

    console.log(visibleComponent)
    console.log(currentProfile)

    function handleEdit(postId) {
        let post = data.find(post => post.id === postId)
        setPostData(post);
        setVisibleComponent('edit_post')
        console.log(post)
        console.log(postData)
    }

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className='feed'>
            <h2>All posts:</h2>
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

                {currentUser === post.author_username && (
                    <button onClick={() => handleEdit(post.id)}>Edit</button>
                )}
            </div>
            ))}
        </div>
    )
}