import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";

const Modal = ({ character, onClose }) => {
    const [homeworld, setHomeworld] = useState(null);

    useEffect(() => {

        //Fetching HomePage Data
        const fetchHomeworld = async () => {
            if (character && character.homeworld) {
                try {
                    const response = await axios.get(character.homeworld);
                    setHomeworld(response.data);
                } catch (error) {
                    console.error("Error fetching homeworld:", error);
                    setHomeworld({
                        name: "Unknown",
                        terrain: "Unknown",
                        climate: "Unknown",
                    });
                }
            }
        };

        fetchHomeworld();
    }, [character]);

    if (!character) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>{character.name}</h3>
                <p>
                    <strong>Height:</strong> {character.height} cm
                </p>
                <p>
                    <strong>Mass:</strong> {character.mass} kg
                </p>
                <p>
                    <strong>Hair Color: </strong>
                    {character.hair_color}
                </p>
                <p>
                    <strong>Skin Color:</strong> {character.skin_color}
                </p>
                <p>
                    <strong>Eye Color: </strong>
                    {character.eye_color}
                </p>
                <p>
                    <strong>Birth Year:</strong> {character.birth_year}
                </p>
                <p>
                    <strong>Gender:</strong> {character.gender}
                </p>
                {homeworld && (
                    <div className="modal-content">
                        <h3>Homeworld</h3>
                        <p>
                            <strong>Name:</strong> {homeworld.name}
                        </p>
                        <p>
                            <strong>Terrain:</strong> {homeworld.terrain}
                        </p>
                        <p>
                            <strong>Climate:</strong> {homeworld.climate}
                        </p>
                        <p>
                            <strong>Residents:</strong> {homeworld.residents.length}
                        </p>
                    </div>
                )}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
