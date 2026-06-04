# Leaf Disease Detection

This project is a web application that uses a deep learning model to detect diseases in plant leaves. Users can upload an image of a leaf, and the application will predict the disease and provide information about its treatment.

## Features

-   **Image Upload**: Upload an image of a plant leaf.
-   **Disease Prediction**: The uploaded image is processed by a trained deep learning model to predict the disease.
-   **Treatment Information**: Displays information about the detected disease and suggests treatments based on a predefined JSON file.

## Tech Stack

-   **Frontend**:
    -   React
    -   Vite
    -   Tailwind CSS
-   **Backend**:
    -   Python (Flask/FastAPI is likely used in `main.py`)
    -   TensorFlow/Keras (for loading the `best_model.h5` model)
-   **Model**:
    -   A pre-trained Keras model (`best_model.h5`) for disease classification.

## Project Structure

```
Leaf Disease Detection/
├── best_model.h5
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── disease_treatments.json
└── frontend/
    ├── index.html
    ├── src/
    ├── package.json
    └── vite.config.js
```

## Setup and Installation

### Backend

1.  **Navigate to the backend directory**:
    ```bash
    cd "Leaf Disease Detection/backend"
    ```

2.  **Create a virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the required packages**:
    ```bash
    pip install -r requirements.txt
    ```

### Frontend

1.  **Navigate to the frontend directory**:
    ```bash
    cd "Leaf Disease Detection/frontend"
    ```

2.  **Install the required packages**:
    ```bash
    npm install
    ```

## Running the Application

### Backend

1.  **Navigate to the backend directory**:
    ```bash
    cd "Leaf Disease Detection/backend"
    ```

2.  **Start the backend server**:
    ```bash
    python main.py
    ```
    The backend server will start on the configured port (e.g., `http://localhost:5000`).

### Frontend

1.  **Navigate to the frontend directory**:
    ```bash
    cd "Leaf Disease Detection/frontend"
    ```

2.  **Start the frontend development server**:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` (or another port specified by Vite).

Open your browser and navigate to the frontend URL to use the application.
