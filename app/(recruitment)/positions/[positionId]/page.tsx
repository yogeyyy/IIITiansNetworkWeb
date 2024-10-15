"use client";

import { useEffect, useState } from 'react';
import { PositionDocument, PositionProps } from '@/mongodb/models/position';
import { useParams } from 'next/navigation';

const PositionProfile = () => {
  const params = useParams();

  const positionId = params.positionId;
  const [position, setPosition] = useState<PositionDocument | null>(null);

  useEffect(() => {
    const fetchPosition = async () => {
      if (positionId) {
        try {
          const response = await fetch(`/api/positions/${positionId}`);
          const responseJson = await response.json();
          const data = responseJson.position;
          
          setPosition(data);
        } catch (error) {
          console.error("Error fetching position:", error);
        }
      }
    };
  
    fetchPosition();
  }, [positionId]);

  if (!position) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-red-300 h-96'>
      <h1 className='h-40 bg-blue-300'>{position.positionTitle}</h1>
      <p>{position.positionDescription}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default PositionProfile;