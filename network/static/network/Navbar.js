function Navbar({setVisibleComponent}) {
    const [username, setUsername] = React.useState(null);

    React.useEffect(() => {
        // Fetch the username from your server
        fetch('current_user')
            .then(response => response.json())
            .then(data => setUsername(data.username));
    }, []);

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={(e) => {
                            e.preventDefault();
                            setVisibleComponent('all_posts')
                        }}>All Posts</a>
                    </li>
                    {username && ( 
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={(e) => {
                                e.preventDefault();
                                setVisibleComponent(null)
                            }}>Following</a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}