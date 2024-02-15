# Requirement 1: Price retrieval

&#x20;

1.1 Description

Searching crypto data and prices: user will be able to search the cryptocurrency by searching the name of the crypto, and if they user input the correct name of the currency the system will display the crypto data.

#### 1.2  Use Case

Scope: The scope of this use case is to enable users to retrieve cryptocurrency data and prices through a search functionality.

Description: This use case describes how users can search for cryptocurrency data and prices by entering the name of the cryptocurrency they are interested in. The system will then display the relevant data for the searched cryptocurrency.

Flow Description Precondition:  The system is initialized and has access to real-time cryptocurrency data.

Activation: This use case starts when a user triggers the search functionality by entering the name of a cryptocurrency.

Main Flow

1. The system identifies the user's input as a search query for cryptocurrency data.
2. The system validates the user's input to ensure it matches the name of an existing cryptocurrency.
3. If the user input matches the name of a cryptocurrency:
4.
   * The system retrieves the relevant data and prices for the searched cryptocurrency.
   * The system displays the cryptocurrency data to the user.

&#x20;

Alternate Flow A1: If the user input does not match the name of any existing cryptocurrency:

1. The system notifies the user that the entered cryptocurrency name is not recognized.
2. The system prompts the user to enter a valid cryptocurrency name.
3. The use case continues at position 2 of the main flow.

Exceptional flow E1: If there is an error retrieving cryptocurrency data:

4. The system displays an error message indicating that cryptocurrency data could not be retrieved.
5. The system prompts the user to try again later or contact support for assistance.
6. The use case continues at position 2 of the main flow.

&#x20;

&#x20;

&#x20;
