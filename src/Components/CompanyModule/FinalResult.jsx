import React from "react";
import SelectStudents from "./SelectStudents";
import GenerateOfferLetter from "./GenerateOfferLetter";

export default function FinalResult(){
  return (
    <div className="container py-4">
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">Final Result</h3>
        </div>
        <div className="card-body">
          <SelectStudents />
          <hr />
      
          <GenerateOfferLetter/>
        </div>
      </div>
    </div>
  );
}