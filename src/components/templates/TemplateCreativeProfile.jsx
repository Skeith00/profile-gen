import {getLabel} from "@components/sections/sections";
import React from "react";

export default function TemplateCreativeProfile({data}) {
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800 flex flex-col">
            {/* Main content wrapper */}
            <div className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5">
                    <div className="max-w-4xl mx-auto text-center">
                        {data.name?.value && (
                            <h1 className="text-4xl font-bold mt-4">{data.name?.value}</h1>
                        )}
                        {data.headline?.value && (
                            <p className="text-xl mt-2">{data.headline?.value}</p>
                        )}
                    </div>
                </section>

                {/* Projects */}
                <section className="my-4">
                    <div className="container mx-auto px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            {data.contacts?.value?.length > 0 && (
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5">
                    <div className="max-w-4xl mx-auto text-center">
                        {data.contactText?.value && (
                            <h2 className="text-2xl font-semibold mb-4">{data.contactText?.value}</h2>
                        )}
                        {data.contacts.value.map((contact, i) => (
                            <a key={i} href={contact.url}
                               target="_blank" rel="noopener noreferrer"
                               className="mt-4 inline-block bg-white text-blue-600 px-6 py-2 rounded shadow hover:bg-gray-100"
                            >
                                {contact.type}
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
