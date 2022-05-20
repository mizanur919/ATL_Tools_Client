import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const [bondList, setBondList] = useState([]);
  const [searchData, setSearchData] = useState("");

  const url = "https://shielded-wave-70948.herokuapp.com/InstallationToolsList";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBondList(data));
  }, []);
  console.log(bondList);
  return (
    <div className="container-data">
      <div className="container w-75 sm-w-100 mx-auto">
        {/* Search Box */}
        <div class="input-group mb-4 w-50 mx-auto">
          <input
            type="text"
            className="form-control p-2"
            placeholder="Find Software Installation Tool"
            aria-label="Recipient's username"
            onChange={(event) => setSearchData(event.target.value)}
          />
          <span class="input-group-text" id="basic-addon2">
            Search
          </span>
        </div>

        {/* Tools List */}
        <div>
          <div className="row">
            {bondList
              .filter((val) => {
                if (searchData === "") {
                  return val;
                } else if (
                  val?.ToolName.toLowerCase().includes(
                    searchData.toLocaleLowerCase()
                  )
                ) {
                  return val;
                }
              })
              .map((singleBond) => (
                <div key={singleBond._id} className="col-12 mb-4">
                  <div className="card">
                    <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                      <div className="text-center">
                        <p className="mb-0">{singleBond?.ToolName}</p>
                      </div>
                      <a
                        className="btn btn-info text-center"
                        href={singleBond?.DownloadLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            {/* <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div className="align-self-center">
                      <i className="fas fa-pencil-alt text-info fa-3x" />
                    </div>
                    <div className="text-end">
                      <p className="mb-0">New Posts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
