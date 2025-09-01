import PropTypes from 'prop-types';

export const contactPropType = PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string
});

export const projectPropType = PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.string
});

export const testimonialPropType = PropTypes.shape({
    text: PropTypes.string,
    author: PropTypes.string
});

export const servicePropType = PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
});

export const profilePropType = PropTypes.shape({
    name: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }),
    tagline: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }),
    photo: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }),
    about: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }),
    contacts: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.arrayOf(contactPropType)
    }),
    skills: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.arrayOf(PropTypes.string)
    }),
    projects: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.arrayOf(projectPropType)
    }),
    testimonials: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.arrayOf(testimonialPropType)
    }),
    services: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.arrayOf(servicePropType)
    }),
    contactText: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }),
    email: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })
});
