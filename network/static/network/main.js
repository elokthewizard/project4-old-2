var VisibleComponentContext = React.createContext();

function App() {
    const [visibleComponent, setVisibleComponent] = React.useState(null);
    const [currentProfile, setCurrentProfile] = React.useState(null)
    const [postData, setPostData] = React.useState(null);

    React.useEffect(() => {
        console.log(postData);
    }, [postData]);

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
                    <Feed visibleComponent={visibleComponent} setVisibleComponent={setVisibleComponent} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} postData={postData} setPostData={setPostData} />
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
            {visibleComponent === 'edit_post' && (
                <>
                    <EditPostForm postData={postData} setVisibleComponent={setVisibleComponent}/>
                </>
            )}
        </div>

    )
}

ReactDOM.render(<App />, document.getElementById('root'));
