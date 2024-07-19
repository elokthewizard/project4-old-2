function Following({currentProfile, setVisibleComponent}) {
    const {data, loading} = useProfileData(currentProfile)

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2>{data.username}'s Following</h2>
            {data.following.map(followed => (
                <div className="following" key={followed}>
                    {followed}
                </div>
            ))}
        </>
    )
}