import Img from "components/Img";
import Section from "components/Section";

const staff = [
    {
        name: "Professor Baafuor Opoku",
        image: "/imgs/t/1.jpg",
        position: "Chief Executive",
        description: "A full professor of Obstetrics & Gynaecology, Prof Baafuor Opoku has over 35 years' experience in medical practice. He taught for 20 years at the School of Medical Sciences, KNUST, training and mentoring medical students as well as postgraduate doctors. He has a passion for women's health as well as child health.",
    },
    {
        name: "Ms. Mary Opoku",
        image: "/imgs/t/2.jpg",
        position: "Matron i/c",
        description: "Ms Mary Opoku is a trained midwife, with over 30 years' experience. She's dedicated to service and willing to teach and mentor the younger ones.",
    },
    {
        name: "Mr Isaac Amankwah",
        image: "/imgs/t/3.jpg",
        position: "The Administrator",
        description: "",
    }
]

const Team = () => {
    return (
        <Section
            id="team"
            title="Our Staff"
            className="bg-blue-100"
        >
            <div className="md:w-3/4 mx-auto mt-20" >

                <div className="grid md:grid-cols-3 gap-4">
                    {
                        staff.map((mem, i) => (
                            <div
                                key={i}
                            >
                                <div
                                    className=""
                                >

                                    <Img src={mem.image} className="max-w-full height-auto" />
                                    <h3 className="text-3xl font-bold mt-4">
                                        {`${mem.name} - ${mem.position}`}
                                    </h3>
                                    <p className="mt-4">{mem.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Section>
    )
}

export default Team;