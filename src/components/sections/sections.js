import ContactsSection from "@components/sections/edit/ContactsSection";
import SkillsSection from "@components/sections/edit/SkillsSection";

export const SECTIONS = {
    contacts: { label: 'Contacts', defaultValue: [], Component: ContactsSection },
    skills: { label: 'Skills', defaultValue: [], Component: SkillsSection },
    projects: { label: 'Projects', defaultValue: []},
    testimonials: { label: 'Testimonials', defaultValue: [] },
    services: { label: 'Services', defaultValue: [] },
    contactText: { label: 'Contact Text', defaultValue: '' }
}

export function getLabel(profile, key, defaultLabel) {
    return profile[key]?.label || SECTIONS[key]?.label || defaultLabel;
}

export function getValue(profile, key, defaultValue) {
    return profile[key]?.value || SECTIONS[key].value || defaultValue;
}