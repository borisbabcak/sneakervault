# SneakerVault

A modern web application for managing your sneaker collection.

## Features

- Add, edit, and delete sneakers from your collection
- Add sneakers to favourites and show them
- Image support for each sneaker
- Detailed view for each sneaker

## Sneaker Details

For each sneaker, you can track:
- Name
- Brand
- Size
- Color
- Price
- Condition (New, Like New, Used)
- Purchase Date
- Image

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/borisbabcak/sneakervault.git
cd sneakervault
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Image Setup

1. Place your sneaker images in the `public/images` folder.
2. When adding a sneaker, select the image from this folder.

## Project Structure

```
sneakervault/
├── public/
│   └── images/         # Store sneaker images here
├── src/
│   ├── api/           # API configuration
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   ├── App.js         # Main app component
│   └── index.js       # Entry point
└── package.json
```

## Technologies Used

- React.js
- Tailwind CSS - Styling
- Axios - API requests
- React Router - Navigation
- JSON Server - Mock backend, database