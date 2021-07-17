import { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationCard from "../common-components/ReservationCard";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  const [number, setNumber] = useState("");
  const [numberCache, setNumberCache] = useState("");
  const [reservations, setReservations] = useState([]);
  const [err, setErr] = useState(null);

  const loadSearchResults = (mobile_number) => {
    setErr(null);
    return listReservations({ mobile_number })
      .then((res) => {
        if (!res.length) setErr({ message: "No reservations found" });
        return res;
      })
      .then(setReservations)
      .catch(setErr);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setNumberCache(number);
    loadSearchResults(number);
  };

  const changeHandler = (e) => {
    setNumber(e.target.value);
  };

  const refreshReservations = () => {
    loadSearchResults(numberCache);
  };

  return (
    <div className="container">
      <h1>Search</h1>
      <hr />
      <div>
        <form
          onSubmit={submitHandler}
          style={{ display: "flex", marginBottom: "15px" }}
        >
          <input
            type="text"
            name="mobile_number"
            className="form-control"
            onChange={changeHandler}
            value={number}
            placeholder="Enter a customer's phone number"
          />
          <button type="submit" className="btn btn-primary">
            Find
          </button>
        </form>
      </div>
      <ErrorAlert error={err} />
      <div>
        {reservations.map((reservation, idx) => (
          <ReservationCard
            key={idx}
            reservation={reservation}
            setErr={setErr}
            refreshReservations={refreshReservations}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
