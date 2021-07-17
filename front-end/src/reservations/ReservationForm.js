import { useHistory } from "react-router-dom";

function ReservationForm({ form, handleChange, handleSubmit }) {
  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          className="form-control"
          value={form.first_name || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          className="form-control"
          value={form.last_name || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile_number">Phone Number</label>
        <input
          type="tel"
          name="mobile_number"
          className="form-control"
          value={form.mobile_number || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_date">Reservation Date</label>
        <input
          type="date"
          name="reservation_date"
          className="form-control"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-d{2}-d{2}"
          value={form.reservation_date || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_time">Reservation Time</label>
        <input
          type="time"
          name="reservation_time"
          className="form-control"
          placeholder="HH:MM"
          pattern="\d{2}:\d{2}"
          value={form.reservation_time || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="people">Party Size</label>
        <input
          type="number"
          name="people"
          className="form-control"
          min="1"
          value={form.people || ""}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mr-2">
        Submit
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={history.goBack}
      >
        Cancel
      </button>
    </form>
  );
}

export default ReservationForm;
