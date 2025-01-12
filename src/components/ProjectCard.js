import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, siteUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <a
        href={siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <div className="proj-imgbx">
          <img src={imgUrl} alt={`${title} preview`} className="proj-img" />
          <div className="proj-txtx text-white">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </div>
      </a>
    </Col>
  );
};
