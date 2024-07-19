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