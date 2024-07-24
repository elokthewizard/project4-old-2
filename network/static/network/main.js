var VisibleComponentContext = React.createContext();

function App() {
    const [visibleComponent, setVisibleComponent] = React.useState(null);
    const [currentProfile, setCurrentProfile] = React.useState(null)
    const [postData, setPostData] = React.useState(null);
    const [componentKey, setComponentKey] = React.useState(0);

    React.useEffect(() => {
        console.log(postData);
    }, [postData]);

    return(
        <div>
            {visibleComponent === null && (
                <>
                    <Navbar setVisibleComponent={setVisibleComponent} />
                    <NewPostForm setVisibleComponent={setVisibleComponent} setComponentKey={setComponentKey} />
                    <FollowingFeed visibleComponent={visibleComponent} setVisibleComponent={setVisibleComponent} setCurrentProfile={setCurrentProfile} key={componentKey} />
                </>
            )}
            {visibleComponent === 'all_posts' && (
                <>
                    <Navbar setVisibleComponent={setVisibleComponent} />
                    <NewPostForm setVisibleComponent={setVisibleComponent} setComponentKey={setComponentKey} />
                    <Feed visibleComponent={visibleComponent} setVisibleComponent={setVisibleComponent} setCurrentProfile={setCurrentProfile} setPostData={setPostData} key={componentKey} />
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
