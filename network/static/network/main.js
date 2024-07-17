function App() {
    const [visibleComponent, setVisibleComponent] = React.useState(null);

    return(
        <div>
            {visibleComponent === null && (
                <>
                    <button onClick={() => {
                        setVisibleComponent('newPostForm')
                    }}>New post</button>
                    <button onClick={() => {
                        setVisibleComponent('two')
                    }}>Show Component Two</button>
                </>
            )}
            

            {visibleComponent === 'newPostForm' && <NewPostForm />}
            {visibleComponent === 'two' && <ComponentTwo />}
        </div>

    )
}

// get posts from users following list
function NewPostForm() {
    const [formData, setFormData] = React.useState({ body: ''});
    const csrftoken = Cookies.get('csrftoken');

    function postData(body) {

        fetch('submit-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Bad response")
            }
            return response.json()
        })
        .catch(error => {
            console.error("Error: ", error)
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postData(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea name="body" placeholder="Whats happening?" onChange={handleChange}></textarea>
            <button type="submit" disabled={!formData.body}>Submit</button>
        </form>
    )
}

function ComponentTwo() {
    const {data, loading, error} = useFetch();

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h1>Second Component!</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
