import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PositionProps } from '@/mongodb/models/position';

const PositionProfile = () => {
  const router = useRouter();
  const { positionId } = router.query;
  const [position, setPosition] = useState<PositionProps | null>(null);

  useEffect(() => {
    if (positionId) {
      // Fetch the position data based on positionId
      fetch(`/api/positions/${positionId}`)
        .then((response) => response.json())
        .then((data) => setPosition(data));
    }
  }, [positionId]);

  if (!position) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{position.positionTitle}</h1>
      <p>{position.positionDescription}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default PositionProfile;