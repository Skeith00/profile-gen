// src/components/templates/TemplateCreative.jsx
import React from "react";

export default function TemplateSimpleProfile({ data }) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-8">
            {/* Header */}
            <header className="flex items-center space-x-6">
                {data.photo?.value && (
                    <img
                        src={data.photo?.value || "/profile.jpg"}
                        alt={data.name?.value}
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    />
                )}
                <div>
                    <h1 className="text-3xl font-bold">{data.name?.value}</h1>
                    <p className="text-gray-500">{data.headline?.value}</p>
                </div>
            </header>

            {/* About */}
            {data.about?.value && (
                <section>
                    <h2 className="text-xl font-semibold mb-2">{data.about.label || "About"}</h2>
                    <p className="text-gray-700">{data.about.value}</p>
                </section>
            )}

            {/* Skills */}
            {data.skills?.value?.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-2">{data.skills.label || "Skills"}</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.value.map((skill, i) => (
                            <span
                                key={i}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects?.value?.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-2">{data.projects.label || "Projects"}</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {data.projects.value.map((proj, i) => (
                            <div
                                key={i}
                                className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition"
                            >
                                <h3 className="font-bold">{data.proj.name}</h3>
                                <p className="text-gray-700 text-sm">{data.proj.description}</p>
                                {data.proj.link && (
                                    <a
                                        href={proj.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 text-sm mt-1 inline-block"
                                    >
                                        View Project
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Testimonials */}
            {data.testimonials?.value?.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-2">{data.testimonials.label || "Testimonials"}</h2>
                    <div className="space-y-4">
                        {data.testimonials.value.map((t, i) => (
                            <blockquote key={i} className="border-l-4 border-blue-400 pl-4 italic text-gray-700">
                                "{t.text}" — <span className="font-semibold">{t.author}</span>
                            </blockquote>
                        ))}
                    </div>
                </section>
            )}

            {/* Services */}
            {data.services?.value?.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-2">{data.services.label || "Services"}</h2>
                    <ul className="list-disc pl-5 text-gray-700">
                        {services.value.map((s, i) => (
                            <li key={i}>
                                <strong>{s.name}:</strong> {s.description}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Contact */}
            {(data.contactText?.value || data.email?.value || data.contacts?.value?.length > 0) && (
                <section>
                    <h2 className="text-xl font-semibold mb-2">Contact</h2>
                    {data.contactText?.value && <p>{data.contactText.value}</p>}
                    {data.email?.value && (
                        <p>
                            Email:{" "}
                            <a href={`mailto:${data.email.value}`} className="text-blue-600">
                                {data.email.value}
                            </a>
                        </p>
                    )}
                    {data.contacts?.value?.length > 0 && (
                        <ul className="flex space-x-4 mt-2">
                            {data.contacts.value.map((contact, i) => (
                                <li key={i}>
                                    <a href={contact.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                        {contact.type}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}
        </div>
    );
}
