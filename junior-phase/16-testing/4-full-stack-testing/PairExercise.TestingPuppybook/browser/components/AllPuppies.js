import React from "react";

const AllPuppies = ({ puppies, pickPuppy }) => (
  <div className="text-center">
    <div>
      <h3>Puppies!</h3>
      <ul className="list-unstyled">
        {puppies.map(puppy => (
          <li key={puppy.id}>
            <div role="button" className="puppylink" onClick={pickPuppy(puppy.id)}>
              {puppy.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default AllPuppies;
