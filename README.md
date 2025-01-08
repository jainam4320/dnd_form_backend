# DnD Form Backend

This project is a backend service for a Dungeons and Dragons (DnD) form application. It provides APIs to manage and store form data.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
    sh
    git clone https://github.com/yourusername/dnd_form_backend.git
    cd dnd_form_backend
    

2. **Set up a virtual environment:**
    sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    

3. **Install dependencies:**
    sh
    pip install -r requirements.txt
    

4. **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables. For example:
    env
    DATABASE_URL=your_database_url
    SECRET_KEY=your_secret_key
    

5. **Run database migrations:**
    sh
    python manage.py migrate
    

6. **Start the development server:**
    sh
    python manage.py runserver
    

## Usage

After installation, you can access the API at `http://localhost:8000`. Use tools like Postman or curl to interact with the endpoints.

## API Endpoints

- `GET /api/forms/` - List all forms
- `POST /api/forms/` - Create a new form
- `GET /api/forms/{id}/` - Retrieve a specific form
- `PUT /api/forms/{id}/` - Update a specific form
- `DELETE /api/forms/{id}/` - Delete a specific form

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Additional Features

### API Endpoints

- `POST /api/forms/save` - Save a new form with metadata (form title, creation date, etc.)
- `GET /api/forms/{id}` - Fetch a saved form by its ID
- `PUT /api/forms/update/{id}` - Update a saved form by its ID
- `GET /api/forms/list` - Retrieve a list of saved forms for editing or viewing

### Database Design

**Forms Table:**
- `id`: Primary key
- `form_name`: Name of the form
- `form_data`: JSON field to store form structure
- `created_at`: Timestamp for when the form was created
- `updated_at`: Timestamp for when the form was last updated

### Form Management

- Save the generated form in the database as JSON (including form fields and their properties)
- Allow retrieving and updating forms

### Security

- Implement authentication and authorization (e.g., API token) to ensure only authorized users can create, edit, or delete forms
- Add validation on the server side to ensure form data integrity

### Form Submission Handling

- Optionally, create endpoints to handle form submissions if the forms are intended to collect data from end-users

### Additional Features (Optional)

- **Version Control**: Allow keeping different versions of a form, so users can revert to an earlier version if needed
- **Form Analytics**: Provide basic analytics on form usage (e.g., number of times a form was filled out)

Here are some output of the images from the given tasks.

![alt text](<Screenshot 2025-01-08 at 4.18.31 AM.png>)
![alt text](<Screenshot 2025-01-08 at 4.18.00 AM.png>)
![alt text](<Screenshot 2025-01-08 at 4.18.31 AM-1.png>)
![alt text](<Screenshot 2025-01-08 at 4.18.53 AM.png>)
![alt text](<Screenshot 2025-01-08 at 4.19.15 AM.png>)
![alt text](<Screenshot 2025-01-08 at 4.20.31 AM.png>)
![alt text](<Screenshot 2025-01-08 at 4.20.58 AM.png>)
![alt text](<Screenshot 2025-01-08 at 4.21.18 AM.png>)