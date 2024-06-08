
import { Link } from "react-router-dom";
import formatDate from "../utils";
import { JobType } from "../utils/constant";

const JobCard = ({ data }) => {
  const { id, name, poster, min_price, max_price, price_unit, created_at, end_date, description, type } = data;
  const posterName = `${poster?.information?.fname} ${poster?.information?.lname}`
  const createDate = formatDate(created_at)
  const endDate = formatDate(end_date)
  return (
    <div>
      <section className="card">
        <Link to={`/jobs/${id}`} className="flex gap-4 flex-col sm:flex-row items-start mb-2">
          <div className="card-details">
            <h3 className="text-2xl font-semibold mb-2">{name}</h3>

            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2">Giá: {min_price} {price_unit} - {max_price} {price_unit} </span> |
              <span className="flex items-center gap-2">Loại: {JobType[type]?.label} </span> |
              <span className="flex items-center gap-2">Ngày tạo: {createDate}</span> |
              <span className="flex items-center gap-2">Ngày hết hạn: {endDate}</span>
            </div>

            <p className="text-base text-primary/70 truncate max-w-sm">{description}</p>
          </div>
        </Link>
        <div className="flex items-center">
          <img src={poster?.information?.avatar} alt={posterName} className="w-10 h-10 rounded-full" />
          <span className="text-primary ml-2"> Người tạo: {posterName}</span>
        </div>
      </section>
    </div >
  );
};

export default JobCard;
