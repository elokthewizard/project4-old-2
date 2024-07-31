function Navbar({setVisibleComponent}) {
    const [username, setUsername] = React.useState(null);

    React.useEffect(() => {
        // Fetch the username from your server
        fetch('current_user')
            .then(response => response.json())
            .then(data => setUsername(data.username));
    }, []);

    return (
        <nav className="feednav navbar navbar-expand navbar-light bg-light">
            <div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={(e) => {
                            e.preventDefault();
                            setVisibleComponent('all_posts')
                        }}>All Posts</a>
                    </li>
                    {username && ( 
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={(e) => {
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