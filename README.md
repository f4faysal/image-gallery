# Image Gallery - React JS

This is a responsive image gallery built with React JS that allows you to reorder images, delete multiple images, and set a feature image. The gallery is visually appealing and provides a seamless user experience.

## Live Demo

You can interact with the image gallery live at [https://imagallery.vercel.app/](https://imagallery.vercel.app/).

## Screenshots
<img src="https://res.cloudinary.com/dhvuyehnq/image/upload/v1698920652/ez8ew4ltfywvlosklzwb.png" alt="image-gallery">

## Features

### 1. Gallery Layout

- The gallery implements a grid layout for displaying images.
- One image is featured and displayed larger than the others.

### 2. Sorting

- You can reorder the images in the gallery by dragging and dropping them. The first image (from left to right) is considered the featured image.

### 3. Deleting Multiple Images

- Select multiple images by clicking on them and delete them using the delete button.
- Selected images are visually indicated.

### 4. Setting Feature Image

- The feature image is set by sorting. The first image (from left to right) is the featured image, visually distinct from the others.

### 5. User Experience

- The gallery provides a smooth and responsive user experience with transitions and animations for a polished look and feel.

## Technologies Used

- React JS
- Tailwind CSS for styling
- DnD Kint Core for drag and drop functionality
- React Transition Group for animations
- React Toastify for notifications
- Material Tailwind for UI components
- Vercel for hosting

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/f4faysal/image-gallery.git
   ```

2. Navigate to the project directory:

   ```bash
   cd image-gallery
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The gallery will be accessible at [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your web browser.

## Project Structure

The project structure is organized as follows:

- `src` - Contains the source code of the React application.
  - `components` - React components for the image gallery.
  - `App.js` - The main application component.
- `public` - Static assets, including images.

## How to Use

- **Reordering**: Click and drag an image to change its position within the gallery. The first image (from left to right) is the featured image.

- **Deleting Multiple Images**: Click on the checkboxes to select multiple images, then click the delete button to remove them from the gallery.

- **Setting Feature Image**: The first image (from left to right) is the featured image. Reorder the images to change the featured image.

---
