var VisibleComponentContext = React.createContext();

function App() {
    const [visibleComponent, setVisibleComponent] = React.useState(null);
    const [currentProfile, setCurrentProfile] = React.useState(null)

    return(
        <div>
            {visibleComponent === null && (
                <>
                    <NewPostForm setVisibleComponent={setVisibleComponent} />
                    {/* <Feed visibleComponent={visibleComponent} setVisibleComponent={setVisibleComponent} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile}/> */}
                    <FollowingFeed visibleComponent={visibleComponent} setVisibleComponent={setVisibleComponent} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} />
                </>
            )}
            {visibleComponent === 'profile' && (
                <>
                    <Profile currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} setVisibleComponent={setVisibleComponent}/>
                </>
            )}
            {visibleComponent === 'followers' && (
                <>
                    <Followers setVisibleComponent={setVisibleComponent} currentProfile={currentProfile} />
                </>
            )}
            {visibleComponent === 'following' && (
                <>
                    <Following setVisibleComponent={setVisibleComponent} currentProfile={currentProfile} />
                </>
            )}
        </div>

    )
}

function Followers({currentProfile, setVisibleComponent}) {
    const {data, loading} = useProfileData(currentProfile)

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2>{data.username}'s Followers</h2>
            {data.followers.map(follower => (
                <div className="follower" key={follower}>
                    {follower}
                </div>
            ))}
        </>
    )
}

function Following({currentProfile, setVisibleComponent}) {
    const {data, loading} = useProfileData(currentProfile)

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2>{data.username}'s Following</h2>
            {data.following.map(followed => (
                <div className="following" key={followed}>
                    {followed}
                </div>
            ))}
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
