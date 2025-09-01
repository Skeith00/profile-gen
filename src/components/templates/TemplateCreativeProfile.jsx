import {getLabel} from "@components/sections/sections";

export default function TemplateCreativeProfile({data}) {
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800 flex flex-col">
            {/* Main content wrapper */}
            <div className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5">
                    <div className="max-w-4xl mx-auto text-center">
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

                {/* Projects */}
                <section className="my-8">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.projects?.value?.map((project, idx) => (
                                <article
                                    key={idx}
                                    className="relative h-48 rounded-xl overflow-hidden shadow-lg group"
                                >
                                    {/* Background cover image */}
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gray-300" />
                                    )}
                                    {/* Centered overlay with title */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <h3 className="text-white text-lg font-semibold text-center px-2">
                                            {project.name || "Untitled Project"}
                                        </h3>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Contact */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5">
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
