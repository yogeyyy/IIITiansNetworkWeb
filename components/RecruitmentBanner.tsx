const RecruitmentBanner = () => {
    return (
        <section className="w-4/5 px-12 bg-creamy rounded-3xl flex">
            <div className="w-1/2 flex flex-col justify-center gap-6 pr-20">
                <h5 className="font-bold font-inter tracking-tight text-cocoa text-lg">Recruitments</h5>
                <h2 className="font-semibold font-inter tracking-tight text-[#110C09] text-[4rem] leading-tight">Become a part of the IIITians Network Core Team</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut iusto at provident distinctio molestiae quae magni alias sequi? Repudiandae, natus nam odit officiis atque animi dolores facilis quasi praesentium quis?</p>
            </div>
            <div className="w-1/2">
                <img src={"/recruitments.svg"} alt="recruiments" className="w-full h-full"/>
            </div>
        </section>
    )
}

export default RecruitmentBanner