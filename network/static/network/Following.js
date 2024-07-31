function Following({setCurrentProfile, currentProfile, setVisibleComponent}) {
    const {data, loading} = useProfileData(currentProfile)

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div class="profile-main">
                <h2>{data.username}'s Following</h2>
                {data.following.map(followed => (
                    <div className="following" key={followed}>
                        <a className="profile-link" href={`view-profile/${followed}`} onClick={(e) => {
                            e.preventDefault();
                            setVisibleComponent('profile');
                            setCurrentProfile(followed);
                        }}>
                            {followed}
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}