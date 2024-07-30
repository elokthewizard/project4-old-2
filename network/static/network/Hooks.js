function useFetch(url) {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Bad response: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            setData(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })
    }, [url])
    return {setData, data, loading, error}
}

function useProfileData(currentProfile) {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch(`view-profile/${currentProfile}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setData(data)
                setLoading(false);
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
    }, [currentProfile]);
    return {data, loading}
}