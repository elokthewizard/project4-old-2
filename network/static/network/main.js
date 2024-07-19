var VisibleComponentContext = React.createContext();

function App() {
    const [visibleComponent, setVisibleComponent] = React.useState(null);
    const [currentProfile, setCurrentProfile] = React.useState(null)

    return(
        <div>
            {visibleComponent === null && (
                <>
                    <Navbar setVisibleComponent={setVisibleComponent} />
                    <NewPostForm setVisibleComponent={setVisibleComponent} />
                    <FollowingFeed visibleComponent={visibleComponent} setVisibleComponent={setVisibleComponent} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} />
                </>
            )}
            {visibleComponent === 'all_posts' && (
                <>
                    <Navbar setVisibleComponent={setVisibleComponent} />
                    <NewPostForm setVisibleComponent={setVisibleComponent} />
                    <Feed visibleComponent={visibleComponent} setVisibleComponent={setVisibleComponent} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile}/>
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

ReactDOM.render(<App />, document.getElementById('root'));
