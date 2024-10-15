import { PositionProps } from "@/mongodb/models/position"
import { ChevronRight, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

const PositionCard = ({ position }: { position: PositionProps }) => {
  return (
    <div key={position.positionId} className="flex flex-col rounded-2xl p-6 bg-gray-100 hover:bg-creamy shadow-lg">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-cocoa">{position.positionTitle}</h3>
        <div className="flex gap-1">
          <MapPin color="#66523A" />
          <p className="">{position.positionLocation}</p>
        </div>
      </div>

      <div className="mt-10">
        <Link href={`/positions/${position.positionId}`}><Button variant="link" className="p-0 font-semibold flex gap-1">Apply Now <ChevronRight size={16} /></Button></Link>
      </div>
    </div>
  )
}

export default PositionCard