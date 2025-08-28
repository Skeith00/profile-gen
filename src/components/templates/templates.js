import TemplateProfessionalProfile from "@components/templates/TemplateProfessionalProfile";
import TemplateWeb from "@components/templates/TemplateWebProfile";
import TemplateCreativeProfile from "@components/templates/TemplateCreativeProfile";
import TemplateSimpleProfile from "@components/templates/TemplateSimpleProfile";

export const TEMPLATES = {
    classic: TemplateProfessionalProfile,
    web: TemplateWeb,
    creative: TemplateCreativeProfile,
    simple: TemplateSimpleProfile,
    // Add more templates: modern, minimal, etc.
}