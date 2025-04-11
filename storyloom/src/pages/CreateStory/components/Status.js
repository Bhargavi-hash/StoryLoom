function StoryStatus({ status, setStatus }) {
    return (
        <div className="story-details">
            <label>Status:</label>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="dropdown">
                <option value="">None</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
            </select>
        </div>
    );
}

export default StoryStatus;
