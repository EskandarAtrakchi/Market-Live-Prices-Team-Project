# Non-Functional Requirements

Non-Functional Requirements mostly for the back-end devs to deal with and in communicate with front-end devs if anything is needed.

Here are what is needed for our project for now:

Performance/Response time requirement

<table data-full-width="false"><thead><tr><th>Components</th><th>Explanation</th></tr></thead><tbody><tr><td><p>Node.js, Express.js</p><p></p></td><td>Node.js and express.js used because of their high performance capabilities and they can handle requests in a very efficient way.</td></tr><tr><td><p>Axios.js</p><p></p></td><td>Axios.js is used for making HTTP requests and can contribute to optimizing response times.</td></tr><tr><td>Socket.js</td><td>Socket.js can enhance real-time communication performance.</td></tr></tbody></table>

#### Availability requirement

<table data-full-width="false"><thead><tr><th>Components</th><th>Explanation</th></tr></thead><tbody><tr><td><p>Node.js</p><p></p></td><td>contributing to high availability.</td></tr><tr><td><p>Express.js</p><p></p></td><td>contributing to high availability.</td></tr><tr><td>Nodemon</td><td>Nodemon helps in automatic server restarts, ensuring continuous availability during development.</td></tr></tbody></table>

#### Recover requirement

<table data-full-width="false"><thead><tr><th>Components</th><th>Explanation</th></tr></thead><tbody><tr><td><p>Nodemon</p><p></p></td><td>Nodemon's auto-restart feature can aid in quick recovery during development</td></tr><tr><td><p>Express.js</p><p></p></td><td>with proper error handling, can contribute to a robust recovery mechanism.</td></tr></tbody></table>

#### Robustness requirement

<table data-full-width="false"><thead><tr><th>Components</th><th>Explanation</th></tr></thead><tbody><tr><td><p>Nodemon</p><p></p><p></p></td><td>Nodemon's auto-restart feature can aid in quick recovery during development</td></tr><tr><td><p>Express.js</p><p></p></td><td>with proper error handling, can contribute to a robust recovery mechanism.</td></tr></tbody></table>

#### Security requirement

<table data-full-width="false"><thead><tr><th>Components</th><th>Explanation</th></tr></thead><tbody><tr><td><p>Cors.js</p><p></p><p></p></td><td>helps in managing Cross-Origin Resource Sharing (CORS), ensuring secure communication between the client and server and this will be used in with socket.io together for creating realtime chat App.</td></tr><tr><td><p>Express.js</p><p></p></td><td>provides a framework for implementing security measures</td></tr></tbody></table>

#### Reliability requirement

<table data-full-width="false"><thead><tr><th>Components</th><th>Explanation</th></tr></thead><tbody><tr><td><p>Node.js, Express.js</p><p></p><p></p></td><td>reliability for handling backend requests </td></tr><tr><td>Nodemon</td><td>automatic restarts contribute to reliable development by quickly recovering from errors.</td></tr></tbody></table>

#### Portability requirement

<table data-full-width="false"><thead><tr><th>Components</th><th>Explanation</th></tr></thead><tbody><tr><td><p>Node.js, Express.js</p><p></p><p></p></td><td>are cross-platform, making the application easily portable across different operating systems.</td></tr></tbody></table>

#### Extendibility requirement

<table data-full-width="false"><thead><tr><th>Components</th><th>Explanation</th></tr></thead><tbody><tr><td><p>Node.js, Express.js</p><p></p><p></p></td><td>provide a modular and extensible architecture<br>for example, it is easy to add a route by express.js for the front-end </td></tr></tbody></table>



#### Resource utilization requirement

<table data-full-width="false"><thead><tr><th>Components</th><th>Explanation</th></tr></thead><tbody><tr><td>Node.js</td><td>providing a non-blocking, event-driven architecture that can handle many simultaneous connections without high resource usage.</td></tr><tr><td>Express.js </td><td>efficient resource utilization in handling HTTP requests.</td></tr></tbody></table>
