import React, { useEffect, useState } from "react";
import useListingData from "../../hooks/useListingData";
import Modal from "../modal/Modal.jsx";
import "./Listing.css";
import { useNavigate } from "react-router-dom";

const Listing = () => {
    //Using Custom Hook 
    const { loading, data, error, currentPage, totalPages, nextPage, prevPage } = useListingData();
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    const handleCardClick = (character) => {
        setSelectedCharacter(character);
    };

    const closeModal = () => {
        setSelectedCharacter(null);
    };

    //If Logout then Remove Token and navigate to Login page
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="listing-container">
            <div className="header">
                <h2>Character List</h2>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <ul className="character-list">
                {data &&
                    data.map((item) => (
                        <li
                            key={item.name}
                            className="character-card"
                            onClick={() => handleCardClick(item)}
                        >
                            <img
                                src={`https://starwars-visualguide.com/assets/img/characters/${item.url.match(/\/(\d+)\//)[1]
                                    }.jpg`}
                                alt={item.name}
                                className="character-image"
                            />
                            <p>{item.name}</p>
                        </li>
                    ))}
            </ul>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            <Modal character={selectedCharacter} onClose={closeModal} />
        </div>
    );
};

export default Listing;
