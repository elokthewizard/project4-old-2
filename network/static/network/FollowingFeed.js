function FollowingFeed({setVisibleComponent, setCurrentProfile}) {
    const [currentPage, setCurrentPage] = React.useState(1)
    const {setData, data, loading, error} = useFetch('following-feed');
    const [currentUser, setCurrentUser] = React.useState(null);

    function handleLike(postId) {
        const csrftoken = Cookies.get('csrftoken');
        fetch(`like-post/${postId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {
                // Update the state with the new data
                setData(prevData => prevData.map(post => {
                    if (post.id === postId) {
                        const hasLiked = post.liked_by.includes(currentUser)
                        // Create a new post object with the updated liked_by array
                        return {
                            // spread operator makes it ez to use the object
                            ...post,
                            liked_by: hasLiked ?
                            post.liked_by.filter(user => user !== currentUser) : 
                            [...post.liked_by, currentUser]
                        };
                    } else {
                        return post;
                    }
                }));
            }
        })
    }

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className='feed'>
            <h2>Your feed:</h2>
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
                <button onClick={() => handleLike(post.id)}>Like</button>
            </div>
            ))}
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Back</button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={data.length < 10}>Next</button>
        </div>
    )
}