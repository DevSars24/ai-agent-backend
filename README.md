AI Agent Backend

Welcome to the AI Agent Backend repository! This project contains a Node.js-based agent (agent.js) that leverages the Google Generative AI (Gemini) API to process user inputs and perform various tasks using predefined functions.
Overview
This backend script provides a command-line interface (CLI) to interact with the Gemini API. It supports functions like calculating sums, checking prime numbers, and retrieving demo cryptocurrency prices. The agent maintains a conversation history and handles API responses efficiently.
Features

Function Calls: Execute custom functions (e.g., sum, prime, getCryptoPrice).
Gemini Integration: Uses the Gemini API for natural language processing.
History Tracking: Maintains a conversation history for context.
Error Handling: Includes basic error logging for API issues.

Prerequisites

Node.js (v14.x or later)
npm (Node Package Manager)
A Gemini API key from Google
``` 
Installation

Clone the repository:
git clone https://github.com/DevSars24/ai-agent-backend.git
cd ai-agent-backend


Install dependencies:
npm install


Set up your Gemini API key:

Create a .env file in the root directory.
Add your API key:GEMINI_API_KEY=your_api_key_here





Usage

Run the agent:
node agent.js


Interact with the agent by typing commands:

Example: sum 5 3 (returns 8)
Example: prime 7 (returns true)
Example: getCryptoPrice bitcoin (returns 61000)
Type exit to quit.


The agent will respond with results or text based on the Gemini API output.


File Structure

agent.js: The main script containing the agent logic.
.env: Environment file for the Gemini API key.
.gitignore: Excludes node_modules and .env from version control.
package.json: Project metadata and dependencies.
package-lock.json: Locks dependency versions.

Contributing
Feel free to contribute! Submit issues or pull requests to enhance the agent’s functionality or fix bugs.

Fork the repository.
Create a new branch: git checkout -b feature-name.
Commit your changes: git commit -m "Add feature".
Push to the branch: git push origin feature-name.
Open a pull request.

License
This project is open-source. See the LICENSE file for details (if added).
Acknowledgments

Thanks to Google for the Generative AI API.
Inspired by community contributions and Node.js ecosystem tools.
