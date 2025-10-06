## Setup PstCSS with Tailwind CSS

### Step 1: Install PostCSS and Tailwind CSS

Open your terminal and run the following command to install PostCSS and Tailwind CSS via npm:

npm install tailwindcss @tailwindcss/postcss postcss postcss-cli

### Step 2: Create styles.css file on the root directory and paste the following code

@import "tailwindcss";

### Step 3: Create postcss.config.js file on the root directory and paste the following code

export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}

### Step 4: Open your package.json file and add the following scripts

"type": "module",
"scripts": {
  "build": "postcss styles.css -o dist/styles.css",
  "watch": "postcss styles.css -o dist/styles.css --watch"
},

- You can also add "type": module, to the package.json file if you haven't already, to enable ES module support.

### Step 5: Build your CSS

Run the following command to build your CSS:

npm run build

or

npm run watch (to watch for changes)

This will generate an dist folder with the compiled Tailwind CSS styles.

### Step 6: Include the output.css file in your HTML

<link rel="stylesheet" href="dist/styles.css">