import { PositionProps } from "@/mongodb/models/position"

const PositionCard = ({position}: {position: PositionProps}) => {
  return (
    <div key={position.positionId}>
      <h2>{position.positionTitle}</h2>
      <p>{position.positionDescription}</p>
      <p>{position.positionRequirements}</p>
      <p>{position.positionSkills}</p>
      <p>{position.positionLocation}</p>
    </div>
  )
}

export default PositionCard