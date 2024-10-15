import { PositionProps } from "@/mongodb/models/position"
import { ChevronRight, MapPin } from "lucide-react"
import { Button } from "./ui/button"

const PositionCard = ({ position }: { position: PositionProps }) => {
  return (
    <div key={position.positionId} className="flex flex-col rounded-2xl p-6 bg-green-100">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{position.positionTitle}</h3>
        <div className="flex gap-1">
          <MapPin />
          <p className="">{position.positionLocation}</p>
        </div>
      </div>
      
      <div className="mt-10">
      <Button variant="link" className="p-0 font-semibold flex gap-1">Apply Now <ChevronRight size={16}/></Button>
      </div>
      

    </div>
  )
}

export default PositionCard