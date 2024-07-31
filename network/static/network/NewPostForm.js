function NewPostForm({ setVisibleComponent }) {
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
        setVisibleComponent(null);
    }

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <textarea name="body" placeholder="Whats happening?" onChange={handleChange}></textarea>
            <button type="submit" disabled={!formData.body}>Submit</button>
        </form>
    )
}