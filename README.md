# Social Media Post Analyzer

This repository contains the code for a **Next.js** application and **LangFlow configurations** developed for a hackathon. Below is a detailed overview of the repository structure, setup, and instructions for contributing.

## Repository Structure

```
.
├── langflow/
│   ├── flow.json                # JSON file for LangFlow configurations
│   ├── sample_data.sql          # SQL file for inserting sample data into DataStax Astra DB
│   └── generate_sample_data.py  # Python script to generate sample data
├── app/                         # Next.js pages
├── components/                  # Reusable React components
├── public/                      # Static assets
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- DataStax Astra DB account (for SQL data)
- Python 3.x (for generating SQL using the script)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Or, if using yarn:

   ```bash
   yarn install
   ```

3. Configure environment variables:

   Create a `.env.local` file in the root directory and specify the following variables:

   ```env
   NEXT_PUBLIC_FLOW_ID_OR_NAME=
   NEXT_PUBLIC_LANGFLOW_ID=
   APPLICATION_TOKEN=
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Or, if using yarn:

   ```bash
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

## LangFlow Configuration

The `langflow/` folder contains:

- **`sample_data.json`**: This file holds sample configurations for LangFlow workflows.
- **`generate_sample_data.py`**: A Python script to generate sample data in SQL format. To use this script:

  ```bash
  python langflow/generate_sample_data.py
  ```

  This will create a new `sample_data.sql` file with the generated data.

- **`sample_data.sql`**: A SQL script to insert sample data into a DataStax Astra DB. To run this script, use the CQL console in the DataStax Astra DB dashboard:

  1. Navigate to your database in the DataStax Astra DB dashboard.
  2. Open the CQL console.
  3. Copy the script from sample_data.sql and run it in CQL console.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm start`: Start the production server.
- `npm run lint`: Run ESLint to analyze code for potential errors.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, feel free to open an issue or contact the team at [devanshkhare0@gmail.com].
