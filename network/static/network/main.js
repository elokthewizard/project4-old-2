var VisibleComponentContext = React.createContext();

function App() {
    const [visibleComponent, setVisibleComponent] = React.useState(null);
    const [currentProfile, setCurrentProfile] = React.useState(null)
    const [postData, setPostData] = React.useState(null);
    const [componentKey, setComponentKey] = React.useState(0);

    React.useEffect(() => {
        console.log(postData);
    }, [postData]);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    return(
        <div>
            {visibleComponent === null && (
                <>
                    <Navbar setVisibleComponent={setVisibleComponent} />
                    <NewPostForm setVisibleComponent={setVisibleComponent} setComponentKey={setComponentKey} />
                    <FollowingFeed formatDate={formatDate} visibleComponent={visibleComponent} setVisibleComponent={setVisibleComponent} setCurrentProfile={setCurrentProfile} key={componentKey} />
                </>
            )}
            {visibleComponent === 'all_posts' && (
                <>
                    <Navbar setVisibleComponent={setVisibleComponent} />
                    <NewPostForm setVisibleComponent={setVisibleComponent} setComponentKey={setComponentKey} />
                    <Feed formatDate={formatDate} visibleComponent={visibleComponent} setVisibleComponent={setVisibleComponent} setCurrentProfile={setCurrentProfile} setPostData={setPostData} key={componentKey} />
                </>
            )}
            {visibleComponent === 'profile' && (
                <>
                    <Navbar setVisibleComponent={setVisibleComponent} />
                    <Profile currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} setVisibleComponent={setVisibleComponent}/>
                </>
            )}
            {visibleComponent === 'followers' && (
                <>
                    <Navbar setVisibleComponent={setVisibleComponent} />
                    <Followers setCurrentProfile={setCurrentProfile} setVisibleComponent={setVisibleComponent} currentProfile={currentProfile} />
                </>
            )}
            {visibleComponent === 'following' && (
                <>
                    <Navbar setVisibleComponent={setVisibleComponent} />
                    <Following setCurrentProfile={setCurrentProfile} setVisibleComponent={setVisibleComponent} currentProfile={currentProfile} />
                </>
            )}
            {visibleComponent === 'edit_post' && (
                <>
                    <Navbar setVisibleComponent={setVisibleComponent} />
                    <EditPostForm postData={postData} setVisibleComponent={setVisibleComponent}/>
                </>
            )}
        </div>

    )
}

ReactDOM.render(<App />, document.getElementById('root'));
