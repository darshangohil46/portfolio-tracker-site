import React from "react";

const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="text-secondary mb-4">Page Not Found</h2>
            <p className="text-muted text-center">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <a href="/" className="btn btn-primary mt-3">
                Back to Home
            </a>
        </div>
    );
};

export default NotFound;
