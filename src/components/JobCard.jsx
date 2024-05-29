
import { FiCalendar, FiClock, FiDollarSign, FiMapPin, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const JobCard = ({ data }) => {
  console.log(data)
  const { id, name, poster, estimate_time, price, price_unit, created_at, description } = data;
  const posterName = `${poster?.information?.fname} ${poster?.information?.lname}`
  const createDay = created_at?.split('T')[0]
  return (
    <div>
      <section className="card">
        <Link to={`/jobs/${id}`} className="flex gap-4 flex-col sm:flex-row items-start">
          <img src={poster?.information?.avatar} alt={posterName} className="w-16 h-16 mb-4" />
          <div className="card-details">
            <h4 className="text-primary mb-1">{posterName}</h4>
            <h3 className="text-lg font-semibold mb-2">{name}</h3>

            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2"><FiClock /> {estimate_time}</span>
              <span className="flex items-center gap-2"><FiDollarSign /> {price} {price_unit}</span>
              <span className="flex items-center gap-2"><FiCalendar /> {createDay}</span>
            </div>

            <p className="text-base text-primary/70 ">{description}</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default JobCard;
