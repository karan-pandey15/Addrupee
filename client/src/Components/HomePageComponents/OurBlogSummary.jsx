import React from "react";

const OurBlogSummary = () => {
  return (
    <section style={{ backgroundColor: "#EEECED" }} className="py-4">
      <div className="container OurBlogSummary">
        <h2
          style={{ textAlign: "center", fontWeight: 700, color: "#264653" }}
          className="OurBlogSummary_Heading"
        >
          Our Blogs
        </h2>
        <hr
          style={{
            width: "150px",
            margin: "auto",
            borderTop: "3px solid #000000",
          }}
        />
      </div>
    </section>
  );
};

export default OurBlogSummary;
