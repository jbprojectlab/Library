import React from "react";

const SinglePuppy = ({ puppy, listAll }) => (
  <div className="text-center">
    <img src={puppy.image} />
    <div>
      <h2>
        {puppy.name} (Age: {puppy.age})
      </h2>
      <button onClick={listAll}>List all Puppies</button>
    </div>
  </div>
);

export default SinglePuppy;
