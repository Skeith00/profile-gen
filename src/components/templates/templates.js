import TemplateProfessionalProfile from "@components/templates/TemplateProfessionalProfile";
import TemplateWeb from "@components/templates/TemplateWebProfile";
import TemplateCreativeProfile from "@components/templates/TemplateCreativeProfile";
import TemplateSimpleProfile from "@components/templates/TemplateSimpleProfile";

export const TEMPLATES = {
    classic: {
        view: TemplateProfessionalProfile, edit: {
            mandatory: ["name", "headline", "email"],   // required sections
            optional: ["about", "contacts", "skills", "projects", "services", "testimonials"], // user can toggle
        }
    },
    web: {
        view: TemplateWeb, edit: {
            mandatory: ["name", "headline", "email"],   // required sections
            optional: ["about", "contacts", "skills", "projects", "services", "testimonials"], // user can toggle
        }
    },
    creative: {
        view: TemplateCreativeProfile, edit: {
            mandatory: ["name", "headline"],   // required sections
            optional: ["projects", "contactText", "contacts"], // user can toggle
        }
    },
    simple: {
        view: TemplateSimpleProfile, edit: {
            mandatory: ["name", "headline", "email"],   // required sections
            optional: ["about", "contacts", "skills", "projects", "services", "testimonials"], // user can toggle
        }
    },
    // Add more templates: modern, minimal, etc.
}