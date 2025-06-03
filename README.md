# Email Spam Checker

  ## Overview
  Email Spam Checker is a modern web application designed to help users identify potential spam content in their emails. It features a clean, user-friendly interface inspired by the Hemingway Editor.

  ## Features
  - Real-time spam detection
  - Integration with Supabase for dynamic spam word management
  - Clean and responsive design

  ## Tech Stack
  - **Frontend**: React, Tailwind CSS
  - **Backend**: Supabase

  ## Setup Instructions
  1. Clone the repository:
     ```bash
     git clone <repository-url>
     cd email-spam-checker
     ```

  2. Install dependencies:
     ```bash
     npm install
     ```

  3. Create a `.env` file in the root directory and add your Supabase credentials:
     ```plaintext
     VITE_SUPABASE_URL=https://your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

  4. Start the development server:
     ```bash
     npm run dev
     ```

  5. Open your browser and navigate to `http://localhost:3000` to view the application.

  ## Usage
  - Paste or type your email content into the text area.
  - The application will analyze the text and display the spam score along with any flagged words.

  ## Contributing
  Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

  ## License
  This project is licensed under the MIT License.
