function EditPostForm({ postData, setVisibleComponent }) {
    console.log(`AYO ${postData.id}`)
    const [formData, setFormData] = React.useState({body: postData.body});
    const csrftoken = Cookies.get('csrftoken');

    function updateData(body) {
        fetch(`update-post/${postData.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Bad response: ${response.status}`)
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
        updateData(formData);
        setVisibleComponent(null);
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea name="body" value={formData.body} onChange={handleChange}></textarea>
            <button type="submit" disabled={!formData.body}>Update</button>
        </form>
    )
}