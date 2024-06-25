import SuggestedUser from "./SuggestedUser";

export default function FollowerSuggestion() {
    return (
        <div className="w-full flex flex-col items-center justify-end py-10">
            {/* Header */}
            <div className="w-2/3">
                <h4 className="text-md font-bold">Follow Suggestions</h4>
            </div>

            <div className="w-2/3 flex flex-col gap-4 mt-4">
                <SuggestedUser />
            </div>
        </div>
    );
}