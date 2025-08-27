import { TEMPLATES } from "@components/templates/templates";

export default function ProfilePage({ data }) {
    if (!data) return <div className="p-8">Profile not found.</div>;
    const Template = TEMPLATES[data.template] || TEMPLATES["classic"]; // fallback to classic
    return <Template data={data} />
}

export async function getServerSideProps(context) {
    const { username } = context.params;
    const res = await fetch(`${process.env.PUBLIC_BASE_URL}/api/profile/${username}`);

    if (!res.ok) {
        return { notFound: true }; // show 404 if user doesn't exist
    }

    const data = await res.json();

    return {
        props: {
            data,
        }
    }
}