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
                    <Profile currentProfile={currentProfile} setCurrentProfile={setCurrentProfile}/>
                </>
            )}
            {visibleComponent === 'followers' && (
                <>
                    <Followers />
                </>
            )}
            {visibleComponent === 'following' && (
                <>
                    <Following />
                </>
            )}
        </div>

    )
}

function Followers() {

}

function Folowing() {
    
}

ReactDOM.render(<App />, document.getElementById('root'));
