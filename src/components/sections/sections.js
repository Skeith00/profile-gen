import ContactsSection from "@components/sections/edit/ContactsSection";
import SkillsSection from "@components/sections/edit/SkillsSection";
import AboutSection from "@components/sections/edit/AboutSection";
import ProjectsSection from "@components/sections/edit/ProjectsSection";
import NameSection from "@components/sections/edit/NameSection";
import HeadlineSection from "@components/sections/edit/HeadlineSection";
import EmailSection from "@components/sections/edit/EmailSection";

export const SECTIONS = {
    name: { label: 'Name', defaultValue: '', Component: NameSection },
    headline: { label: 'Headline', defaultValue: '', Component: HeadlineSection },
    email: { label: 'Email', defaultValue: '', Component: EmailSection },
    about: { label: 'About', defaultValue: '', Component: AboutSection },
    contacts: { label: 'Contacts', defaultValue: [], Component: ContactsSection },
    skills: { label: 'Skills', defaultValue: [], Component: SkillsSection },
    projects: { label: 'Projects', defaultValue: [], Component: ProjectsSection },
    testimonials: { label: 'Testimonials', defaultValue: [] },
    services: { label: 'Services', defaultValue: [] },
    contactText: { label: 'Contact Text', defaultValue: '' }
}

export function getLabel(profile, key, defaultLabel) {
    return profile[key]?.label || SECTIONS[key]?.label || defaultLabel;
}

export function getValue(profile, key, defaultValue) {
    return profile[key]?.value || SECTIONS[key].defaultValue || defaultValue;
}