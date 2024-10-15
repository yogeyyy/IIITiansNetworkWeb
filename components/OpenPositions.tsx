import connectDB from "@/mongodb/db"
import { Position, PositionProps } from "@/mongodb/models/position";
import PositionCard from "./PositionCard";

const OpenPositions = async () => {

  await connectDB();
  const positions = await Position.getAllPositions() as PositionProps[];

  return (
    <section className="w-4/5 px-12 flex flex-col gap-4 py-20">
        {/* Heading */}
        <h1 className=" font-inter tracking-tight text-[#110C09] text-[4rem] leading-tight">Open Positions</h1>

        {/* Search */}
        
        {/* Filters */}
        <p>Filters</p>

        {/* Positions card builder */}
        <div className="grid grid-cols-3">
          {positions.map((position: PositionProps) => (
            <PositionCard key={position.positionId} position={position} />
          ))}
        </div>
    </section>
  )
}

export default OpenPositions