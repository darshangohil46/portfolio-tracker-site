# Portfolio Tracker Site

Welcome to the Portfolio Tracker Site. This project aims to help users manage and track their investment portfolios efficiently.

## Introduction

The Portfolio Tracker Site is a web application that allows users to track their investment portfolios, view performance metrics, and manage assets. It provides a comprehensive view of the user's financial health and helps in making informed investment decisions.

## Features

- Track multiple investment portfolios
- View detailed performance metrics
- Manage assets and transactions
- User authentication and authorization
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend:** React, HTML, CSS, JavaScript, Bootstrap
- **Backend:** Python
- **Database:** sqlite3
- **APIs:** Various APIs

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/darshangohil46/food_ordering_website.git
    cd portfolio-tracker-site
    ```

2. Install dependencies (Install required libraries):
    ```bash
    pip install -r requirements.txt
    pip install django
    pip install django-cors-headers
    pip install djangorestframework
    ```

3. Apply migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

4. Create a superuser for the Django admin panel:
    ```bash
    python manage.py createsuperuser
    ```

5. Run the Django development server:
    ```bash
    python manage.py runserver
    ```

### Frontend (React)

1. Navigate to the frontend directory:
    ```bash
    cd portfolio-tracker-site
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open the app in your browser:
    ```
    http://localhost:3000
    ```

## Project Structure

### Backend (Django)

- `models.py`: Contains database models for users, orders, menu items, reviews, etc.
- `views.py`: API views for handling requests and sending responses to the frontend.
- `urls.py`: Defines URL routes for different API endpoints.
- `serializers.py`: Serializes data between the Django models and React frontend.
- `settings.py`: Configuration file for database, middleware, and installed apps.

### Frontend (React)

- `src/components/`: Contains reusable React components such as `Dashboard`, `Navbar`, `StockForm`, `StockList`, etc.
- `src/pages/`: Contains page components such as `Home`, `Login`, `EditProfile`, `Portfolio`, and `Signup`.
- `src/App.js`: The main app component that handles routing.
- `src/index.js`: Entry point for the React app.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Contributing

Contributions are what make the open-source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Darshan Gohil - [darshangohil46](https://github.com/darshangohil46) - darshangohil2005@gmail.com

Project Link: [https://github.com/darshangohil46/portfolio-tracker-site](https://github.com/darshangohil46/portfolio-tracker-site)
