// src/components/templates/TemplateWebProfile.jsx
import {getLabel} from "@components/sections/sections";

export default function TemplateWebProfile({ data }) {
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            {/* Hero */}
            <header className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-12">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={data.photo?.value || "/profile.jpg"}
                        alt={data.name?.value}
                        className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold">{data.name?.value}</h1>
                        <p className="text-lg mt-1 text-sky-100">{data.headline?.value}</p>
                        {data.contacts?.value?.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
                                {data.contacts.value.map((contact, i) => (
                                    <a
                                        key={i}
                                        href={contact.url}
                                        className="bg-white text-sky-700 px-3 py-1 rounded-md text-sm font-medium shadow-sm hover:opacity-90"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {contact.type}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left column */}
                <aside className="md:col-span-1 space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-lg mb-2">{getLabel(data, "about", "About")}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{data.about?.value}</p>
                    </div>

                    {data.skills?.value?.length > 0 && (
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-lg mb-2">{getLabel(data, "skills", "Skills")}</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.value?.map((skill, i) => (
                                    <span key={i} className="text-sm bg-sky-50 text-sky-700 px-2 py-1 rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {data.testimonials?.value?.length > 0 && (
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-lg mb-2">{getLabel(data, "testimonials", "Testimonials")}</h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                {data.testimonials.value.map((testimonial, i) => (
                                    <blockquote key={i} className="italic">“{testimonial.text}” — <span className="font-medium not-italic text-gray-900">{testimonial.author}</span></blockquote>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                {/* Right column */}
                <section className="md:col-span-2 space-y-6">
                    {data.projects?.value?.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-xl mb-4">Projects</h3>
                            <div className="space-y-4">
                                {data.projects.value.map((project, i) => (
                                    <article key={i} className="border rounded p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium">{project.name}</h4>
                                            {project.link && (
                                                <a href={project.link} className="text-sky-600 text-sm" target="_blank" rel="noreferrer">Visit</a>
                                            )}
                                        </div>
                                        <p className="text-gray-700 text-sm">{project.description}</p>
                                    </article>
                                ))}
                            </div>
                        </div>

                    )}
                    {data.experience?.value?.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-xl mb-4">{getLabel(data, "experience", "Experience")}</h3>
                            <div className="space-y-4">
                                {data.experience.value.map((job, i) => (
                                    <div key={i} className="flex justify-between items-start">
                                        <div>
                                            <strong className="block text-gray-900">{job.role}</strong>
                                            <span className="text-sm text-gray-600">{job.company}</span>
                                            <p className="text-gray-700 text-sm mt-1">{job.details}</p>
                                        </div>
                                        <div className="text-sm text-gray-500">{job.period}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {data.services?.value?.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-xl mb-4">{getLabel(data, "services", "Services")}</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {data.services.value.map((service, i) => (
                                    <li key={i}><strong>{service.name}</strong> — {service.description}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-xl mb-4">{getLabel(data, "contactText", "Contact Text")}</h3>
                        <p className="text-gray-700">{data.contactText?.value}</p>
                        <a href={`mailto:${data.email?.value}`} className="inline-block mt-4 bg-sky-600 text-white px-5 py-2 rounded-md">Email Me</a>
                    </div>
                </section>
            </main>
        </div>
    );
}
