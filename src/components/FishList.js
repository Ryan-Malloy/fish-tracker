import React from 'react';
import { Link } from "react-router-dom";

function FishList({ fishes }) {
    return (
        <>
            {fishes.map(fish => (
                <div className="card mb-3 mx-auto" key={fish.key}>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col">
                                <h5 className="card-title">{fish.name}</h5>
                            </div>
                            <div className="col-auto">
                                <small className="text-secondary">{fish.key}</small>
                            </div>
                        </div>

                        <p>Type: {fish.type}</p>
                        {fish.caught && (
                            <div>
                                {fish.caught.map((catchDetails, index) => (
                                    <div key={index}>
                                        <a
                                            data-bs-toggle="collapse"
                                            href={`#collapseFish${fish.key}Catch${index}`}
                                            aria-expanded="false"
                                            aria-controls={`collapseFish${fish.key}Catch${index}`}
                                        >
                                            Date: {catchDetails.date}
                                        </a>
                                        <ul className="collapse" id={`collapseFish${fish.key}Catch${index}`}>
                                            <li>Weight: {catchDetails.weight}</li>
                                            <li>Length: {catchDetails.length}</li>
                                            <li>Location: {catchDetails.location}</li>
                                            <li>Lure: {catchDetails.lure}</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="card-footer">
                        <Link to={`/fish/${fish.key}`}>
                            <button className="btn btn-primary">View Details</button>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}

export default FishList;
