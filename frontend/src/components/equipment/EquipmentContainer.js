// EquipmentContainer.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allEquipments } from "../../actions/equipmentActions";
import Equipment from "./Equipment";
import axios from "axios"; // Import axios for making API requests
import "../../Equipment.css";

const EquipmentContainer = () => {
  const dispatch = useDispatch();
  const { equipments, loading, error } = useSelector(
    (state) => state.allEquipments
  );

  const [sports, setSports] = useState([]); // State to store sports
  const [selectedSport, setSelectedSport] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/sports`
        );

        console.log("Fetched sports data:", response.data);

        setSports(response.data.sports);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchSports();
    dispatch(allEquipments());
  }, [dispatch]);

  const handleSportClick = (sport) => {
    setSelectedSport((prevSelectedSport) =>
      prevSelectedSport === sport ? null : sport
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="col-md-3">
            <div className="sidebar">
              <h2>Sport Categories</h2>
              <ul>
                <li onClick={() => handleSportClick(null)}>All Sports</li>
                {sports.map((sport) => (
                  <li
                    key={sport._id}
                    onClick={() => handleSportClick(sport.name)}
                  >
                    {sport.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="main-content">
            <h2>Available Equipments</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <div className="row">
                {equipments
                  .filter((equipment) => {
                    if (selectedSport === null) {
                      return true;
                    }
                    return equipment.sport === selectedSport;
                  })
                  .map((equipment) => (
                    <div key={equipment._id} className="col-md-4">
                      <Equipment equipment={equipment} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentContainer;
