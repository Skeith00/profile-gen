import {getLabel} from "@components/sections/sections";

export default function TemplateProfessionalProfile({ data }) {
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            {/* Hero */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <img
                        src={data.photo?.value || "/profile.jpg"}
                        alt={data.name?.value}
                        className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg"
                    />
                    <h1 className="text-4xl font-bold mt-4">{data.name?.value}</h1>
                    <p className="text-xl mt-2">{data.headline?.value}</p>
                    {data.contacts?.length > 0 && (
                        <div className="flex justify-center gap-4 mt-4">
                            {data.contacts.map((contact, idx) => (
                                <a
                                    key={idx}
                                    href={contact.url}
                                    className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100"
                                >
                                    {contact.type}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* About */}
            <section className="max-w-4xl mx-auto py-12 px-4">
                <h2 className="text-2xl font-semibold mb-4">{getLabel(data, "about", "About")}</h2>
                <p className="leading-relaxed">{data.about?.value}</p>
            </section>
            {/* Skills */}
            {data.skills?.value?.length > 0 && (
                <section className="bg-white py-12 shadow-inner">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-2xl font-semibold mb-4">{getLabel(data, "skills", "Skills")}</h2>
                        <div className="flex flex-wrap gap-3">
                            {data.skills?.value?.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm"
                                >{skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {/* Projects */}
            {data.projects?.value?.length > 0 && (
                <section className="max-w-4xl mx-auto py-12 px-4">
                    <h2 className="text-2xl font-semibold mb-4">{getLabel(data, "projects", "Projects")}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {data.projects?.value?.map((project, idx) => (
                            <div key={idx} className="bg-white rounded-lg shadow p-4">
                                <h3 className="font-medium">{project.name}</h3>
                                <p className="text-gray-700">{project.description}</p>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                                    >
                                        View Project →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Contact */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold mb-4">{getLabel(data, "contactText", "Contact Text")}</h2>
                    <p>{data.contactText?.value}</p>
                    <a
                        href={`mailto:${data.email?.value}`}
                        className="mt-4 inline-block bg-white text-blue-600 px-6 py-2 rounded shadow hover:bg-gray-100"
                    >
                        {getLabel(data, "email", "Email Me")}
                    </a>
                </div>
            </section>
        </div>
    );
}
