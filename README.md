# EngageWise - Social Media Engagement Analyzer

## Project Overview

This project is a Social Media Engagement Analyzer application designed to analyze and enhance content performance. It leverages DataStax Langflow to create workflows that fetch data from Astra DB DataStax. The application calculates average engagement metrics such as likes, comments, and shares for various post types. Additionally, it generates actionable insights based on user-selected post types, empowering users to make data-driven decisions to improve engagement.

## Tech Stack

- **DataStax Langflow**: Facilitates API exposure for GenAI workflows.
- **Astra DB**: Serves as the database for storing and managing sample data.
- **Next.js**: Handles the frontend development and API integration for a dynamic user interface.

## Features

- **Seamless Data Retrieval**: Fetch and process data efficiently from Astra DB.
- **Engagement Metrics Analysis**: Calculate average engagement metrics (likes, comments, shares, etc.) for each post type.
- **Customizable Insights**: Generate actionable insights tailored to user-selected post types for targeted analysis.
- **Engagement Enhancement Suggestions**: Provide data-driven recommendations to improve post engagement and optimize content strategy.

## Getting Started

1. Clone the repository.
2. Set up Astra DB and populate it with sample data.
   - Inside the `langflow` folder, there is a `sample_data.json` file. Import it in the Astra DB dashboard.
3. Configure DataStax Langflow to expose the necessary APIs.
   - To set up the flow in Langflow, import the `flow.json` file which is present in the `langflow` folder.
4. Run the Next.js application to start the frontend.
   - Navigate to the project directory.
   - Install dependencies using `npm install`.
   - Start the development server using `npm run dev`.

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Contact

For any questions or inquiries, please contact the project maintainer.
