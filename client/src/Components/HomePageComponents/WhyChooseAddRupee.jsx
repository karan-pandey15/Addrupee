import React from "react";
import AddRupeeLogo from "../../assets/AddRupee_logo.jpeg";

const WhyChooseAddRupee = () => {
  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <div class="container px-4 pt-5" id="custom-cards">
        <h2 style={{ color: "#264653", fontWeight: 600 }}>
          Why Choose Add Rupee
        </h2>
        <p class="pb-2 border-bottom" style={{ color: "gray" }}>
          Add Rupee: Your trusted partner for financial success. Tailored
          solutions, transparency, and a path to prosperity.
        </p>

        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div class="col">
            <div class="card NoHiddenFeeImg card-cover h-100 overflow-hidden rounded-5 shadow-lg">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h2
                  style={{ color: "white", fontWeight: 900 }}
                  class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold"
                >
                  No Hidden Fee
                </h2>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img
                      src={AddRupeeLogo}
                      alt="AddRupee"
                      width="32"
                      height="32"
                      class="rounded-circle border border-white"
                    />
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <small
                      style={{
                        fontWeight: 600,
                        color: "#15616d",
                        fontSize: "15px",
                      }}
                    >
                      No Hidden Fee
                    </small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card LessDocuments card-cover h-100 overflow-hidden text-white  rounded-5 shadow-lg">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Less Documents
                </h2>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img
                      src={AddRupeeLogo}
                      alt="AddRupee"
                      width="32"
                      height="32"
                      class="rounded-circle border border-white"
                    />
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <small
                      style={{
                        fontWeight: 600,
                        color: "#001524",
                        fontSize: "15px",
                      }}
                    >
                      Less Documents
                    </small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card SpecialistTeam card-cover h-100 overflow-hidden text-white  rounded-5 shadow-lg">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Specialist Team
                </h2>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img
                      src={AddRupeeLogo}
                      alt="AddRupee"
                      width="32"
                      height="32"
                      class="rounded-circle border border-white"
                    />
                  </li>
                  <li class="d-flex align-items-center  me-3">
                    <small
                      style={{
                        fontWeight: 600,
                        color: "#ffffff",
                        fontSize: "15px",
                      }}
                    >
                      Specialist Team
                    </small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAddRupee;
