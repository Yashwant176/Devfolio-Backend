@"
# Devfolio Backend

This is the backend of the Devfolio Blog Application, built with **Django** and **Django REST Framework**. It provides REST APIs for user authentication, profile management, and blog post management.

## Features

- User registration and JWT authentication
- Profile management (update bio, profile picture, social links)
- Create, read, update, delete blog posts
- Image upload for profiles and blogs
- REST API endpoints for frontend consumption

## Tech Stack

- Python 3.x
- Django 5.2.x
- Django REST Framework
- Django CORS Headers
- Simple JWT for authentication
- Gunicorn (for production deployment)

## Installation

1. Clone the repository:
    ```powershell
    git clone https://github.com/Yashwant176/Devfolio-Backend.git
    cd Devfolio-Backend
    ```

2. Create a virtual environment:
    ```powershell
    python -m venv aenv
    ```

3. Activate the virtual environment:
    ```powershell
    .\aenv\Scripts\activate
    ```

4. Install dependencies:
    ```powershell
    pip install -r requirements.txt
    ```

5. Run migrations:
    ```powershell
    python manage.py makemigrations
    python manage.py migrate
    ```

6. Start the development server:
    ```powershell
    python manage.py runserver
    ```

## Environment Variables

Set the following environment variables in **Render** or your deployment environment:

- `SECRET_KEY` – Django secret key
- `DEBUG` – `False` for production
- `ALLOWED_HOSTS` – Domain of your backend on Render
- Database credentials if using PostgreSQL or other database

## Deployment on Render

1. Create a **Python Service** on Render.
2. Connect your GitHub repository.
3. Set build and start commands:
    ```text
    Build Command: pip install -r requirements.txt
    Start Command: gunicorn new_django_api.wsgi
    ```
4. Add environment variables as listed above.
5. Deploy the service.

## License

This project is open-source and available under the MIT License.
"@
