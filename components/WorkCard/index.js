const WorkCard = ({ img, name, description, onClick, index = 0 }) => {
  const clickable = Boolean(onClick);
  return (
    <article className={`project-card ${clickable ? "project-card-clickable" : ""}`} onClick={onClick} role={clickable ? "button" : undefined} tabIndex={clickable ? 0 : undefined} onKeyDown={(event) => { if (clickable && (event.key === "Enter" || event.key === " ")) onClick(); }}>
      <div className="project-image-wrap">
        <img alt={name} className="project-image" src={img} loading={index < 2 ? "eager" : "lazy"} decoding="async" fetchPriority={index < 2 ? "high" : "low"} />
        <span className="project-number">0{index + 1}</span>
        <span className="project-arrow">↗</span>
      </div>
      <div className="project-meta"><h3>{name || "Project Name"}</h3><p>{description || "Description"}</p></div>
    </article>
  );
};
export default WorkCard;
