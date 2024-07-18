var VisibleComponentContext = React.createContext();

function App() {
    const [visibleComponent, setVisibleComponent] = React.useState(null);
    const [currentProfile, setCurrentProfile] = React.useState(null)

    return(
        <div>
            {visibleComponent === null && (
                <>
                    <NewPostForm setVisibleComponent={setVisibleComponent} />
                    <Feed visibleComponent={visibleComponent} setVisibleComponent={setVisibleComponent} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile}/>
                </>
            )}
            {visibleComponent === 'profile' && (
                <>
                    <Profile currentProfile={currentProfile} />
                </>
            )}
        </div>

    )
}

function Profile({ currentProfile }) {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch(`view-profile/${currentProfile}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setData(data)
                setLoading(false);
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
    }, [currentProfile]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2>{data.username}</h2>
            <p>Followers: {data.followers}</p>
            <p>Following: {data.following}</p>
            <h3>Posts:</h3>
            {data.posts.map(post => (
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
            </div>
            ))}
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
