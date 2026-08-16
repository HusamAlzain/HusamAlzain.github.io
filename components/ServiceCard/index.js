const ServiceCard = ({ name, description, index = 0 }) => (
  <article className="service-card">
    <span className="service-index">0{index + 1}</span>
    <div><h3>{name || "Service"}</h3><p>{description || "Description"}</p></div>
    <span className="service-arrow">↗</span>
  </article>
);
export default ServiceCard;
