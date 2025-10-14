// pages/error/_error.js
function ErrorPage({ statusCode }) {
    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-red-600">
                {statusCode ? `Error ${statusCode}` : "An error occurred"}
            </h1>
            <p>Something went wrong. Please try again later.</p>
        </div>
    );
}

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res?.statusCode || err?.statusCode || 500;
    return { statusCode };
};

export default ErrorPage;
