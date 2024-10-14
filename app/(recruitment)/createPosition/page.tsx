"use client"

import createPositionAction from "@/actions/positionsActions";
import { PositionBase, PositionData } from "@/mongodb/models/position";
import { useState } from "react";

const createPosition = () => {
  const [formData, setFormData] = useState({
    positionTitle: '',
    positionDescription: '',
    positionRequirements: '',
    positionSkills: '',
    positionLocation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: checks

    //promise
    const promise = handleCreatePosition(formData);

    // Toast
    
  };

  const handleCreatePosition = async (data: PositionBase) => {
    try {
      await createPositionAction(data);
    } catch (error) {
      console.log("Error Creating position:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="positionTitle">Position Title</label>
        <input
          type="text"
          id="positionTitle"
          name="positionTitle"
          value={formData.positionTitle}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="positionDescription">Position Description</label>
        <textarea
          id="positionDescription"
          name="positionDescription"
          value={formData.positionDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="positionRequirements">Position Requirements</label>
        <textarea
          id="positionRequirements"
          name="positionRequirements"
          value={formData.positionRequirements}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="positionSkills">Position Skills</label>
        <textarea
          id="positionSkills"
          name="positionSkills"
          value={formData.positionSkills}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="positionLocation">Position Location</label>
        <input
          type="text"
          id="positionLocation"
          name="positionLocation"
          value={formData.positionLocation}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Position</button>
    </form>
  );
};

export default createPosition;