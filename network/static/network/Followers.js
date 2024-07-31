function Followers({setCurrentProfile, currentProfile, setVisibleComponent}) {
    const {data, loading} = useProfileData(currentProfile)

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="profile-main">
                <h2>{data.username}'s Followers</h2>
                {data.followers.map(follower => (
                    <div className="follower" key={follower}>
                        <a className="profile-link" href={`view-profile/${follower}`} onClick={(e) => {
                            e.preventDefault();
                            setVisibleComponent('profile');
                            setCurrentProfile(follower);
                        }}>
                            {follower}
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}