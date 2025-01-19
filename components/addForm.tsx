import Form from 'next/form';

export default function AddForm() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/addProject', {
            body: JSON.stringify({
                title: e.target.title.value,
                description: e.target.description.value,
                skills_used: e.target.skills_used.value,
                start_date: e.target.start_date.value,
                end_date: e.target.end_date.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await res.json();
        console.log(result);
    }
    return (
        <Form action={handleSubmit} className="flex flex-col p-4 bg-gray-100 rounded-lg shadow px-6">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" />
            <label htmlFor="skills_used">Skills Used</label>
            <input type="text" name="skills_used" id="skills_used" />
            <label htmlFor="start_date">Start Date</label>
            <input type="date" name="start_date" id="start_date" />
            <label htmlFor="end_date">End Date</label>
            <input type="date" name="end_date" id="end_date" />
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Add
            </button>
        </Form>
    )
}   