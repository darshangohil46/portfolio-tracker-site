import React from "react";

const Footer = () => {
    return (
        <footer className="bg-primary text-light py-4">
            <div className="container">
                <div className="row">
                    {/* About Section */}
                    <div className="col-md-4 mb-4">
                        <h5>About Us</h5>
                        <p>
                            We are a stock portfolio tracker providing real-time performance
                            insights, helping you make smarter investment decisions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/portfolio" className="text-white text-decoration-none">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="/edit-profile" className="text-white text-decoration-none">
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a href="/portfolio" className="text-white text-decoration-none">
                                    Show Stock Performance
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-4 mb-4">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>
                                <i className="bi bi-envelope-fill me-2"></i> darshangohil2005@gmail.com
                            </li>
                            <li>
                                <i className="bi bi-telephone-fill me-2"></i> +91 9773050107
                            </li>
                            <li>
                                <i className="bi bi-geo-alt-fill me-2"></i> Gujarat, India
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Media */}
                <div className="text-center py-3">
                    <a
                        href="https://facebook.com"
                        className="text-white text-decoration-none me-3"
                    >
                        <i className="bi bi-facebook fs-4"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        className="text-white text-decoration-none me-3"
                    >
                        <i className="bi bi-twitter fs-4"></i>
                    </a>
                    <a
                        href="https://instagram.com"
                        className="text-white text-decoration-none me-3"
                    >
                        <i className="bi bi-instagram fs-4"></i>
                    </a>
                    <a
                        href="https://linkedin.com"
                        className="text-white text-decoration-none"
                    >
                        <i className="bi bi-linkedin fs-4"></i>
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center mt-3">
                    <small>&copy; {new Date().getFullYear()} Portfolio Tracker. All rights reserved.</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
