import Faqs from "@/components/Faqs"
import OpenPositions from "@/components/OpenPositions"
import RecruitmentBanner from "@/components/RecruitmentBanner"

const Recruit = () => {
  return (
    <div className="flex flex-col items-center w-full">

      <RecruitmentBanner />

      <OpenPositions />

      <Faqs />
    </div>
  )
}

export default Recruit