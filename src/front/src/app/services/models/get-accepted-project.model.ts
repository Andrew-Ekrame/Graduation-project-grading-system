export interface AcceptedProjectsRes {
  statusCode: number;
  message: string;
  data: {
    acceptedDoctorProjects: AcceptedProject[];
    isSuccess: boolean;
  };
}
export interface AcceptedProject {
  id: number;
  name: string;
  description: string;
  status: string;
  doctorName: string;
  doctorId: number;
}
export const Projects = [
  {
    id: 1,
    name: 'AI-Powered Chatbot',
    description: `<h1>Project Title: AI-Powered Chatbot</h1>
      <h2>Supervisor: Dr. Ahmed Salah</h2>
      <h3>Project Overview</h3>
      <p><strong>Objective:</strong> <em>Develop an AI chatbot for customer support.</em></p>
      <p><u>Technologies Used:</u> Python, TensorFlow, NLP</p>
      <p><s>Deprecated Technology:</s> Rule-Based Chatbots</p>
      <p style="color: red">Important Note: Must support multiple languages.</p>
      <p style="background-color: yellow">Highlight: AI-driven responses.</p>
      <h4>Project Phases</h4>
      <ol>
        <li>Data Collection</li>
        <li>Model Training</li>
        <li>Integration</li>
        <li>Testing</li>
      </ol>
      <h4>Key Features</h4>
      <ul>
        <li>Real-Time Responses</li>
        <li>Multi-Language Support</li>
        <li>Integration with Websites & Apps</li>
      </ul>
      <p>For more details, visit our <a href="https://example.com">website</a>.</p>`,
    status: 'In Progress',
    doctorName: 'Dr. Ahmed Salah',
    doctorId: 101,
  },
  {
    id: 2,
    name: 'Blockchain Voting System',
    description: `<h1>Project Title: Blockchain Voting System</h1>
      <h2>Supervisor: Dr. Mona Khalil</h2>
      <h3>Project Overview</h3>
      <p><strong>Objective:</strong> <em>Ensure secure and transparent online voting.</em></p>
      <p><u>Technologies Used:</u> Ethereum, Solidity, Smart Contracts</p>
      <p><s>Deprecated Technology:</s> Paper-Based Voting</p>
      <p style="color: red">Important Note: Must ensure fraud prevention.</p>
      <p style="background-color: yellow">Highlight: Fully decentralized.</p>
      <h4>Project Phases</h4>
      <ol>
        <li>Smart Contract Development</li>
        <li>Security Testing</li>
        <li>Deployment</li>
        <li>User Testing</li>
      </ol>
      <h4>Key Features</h4>
      <ul>
        <li>Immutable Voting Records</li>
        <li>Secure Identity Verification</li>
        <li>Real-Time Result Updates</li>
      </ul>
      <p>For more details, visit our <a href="https://example.com">website</a>.</p>`,
    status: 'Completed',
    doctorName: 'Dr. Mona Khalil',
    doctorId: 102,
  },
  {
    id: 3,
    name: 'IoT-Based Smart Home',
    description: `<h1>Project Title: IoT-Based Smart Home</h1>
      <h2>Supervisor: Dr. Yasser Mahmoud</h2>
      <h3>Project Overview</h3>
      <p><strong>Objective:</strong> <em>Automate home appliances using IoT.</em></p>
      <p><u>Technologies Used:</u> Raspberry Pi, MQTT, Node.js</p>
      <p><s>Deprecated Technology:</s> Manual Home Controls</p>
      <p style="color: red">Important Note: Security measures are a priority.</p>
      <p style="background-color: yellow">Highlight: Remote access through mobile app.</p>
      <h4>Project Phases</h4>
      <ol>
        <li>Device Integration</li>
        <li>Data Processing</li>
        <li>Security Implementation</li>
        <li>Deployment</li>
      </ol>
      <h4>Key Features</h4>
      <ul>
        <li>Remote Control via Mobile App</li>
        <li>Energy Efficiency Monitoring</li>
        <li>AI-Based Automation</li>
      </ul>
      <p>For more details, visit our <a href="https://example.com">website</a>.</p>`,
    status: 'Pending',
    doctorName: 'Dr. Yasser Mahmoud',
    doctorId: 103,
  },
  {
    id: 4,
    name: 'Autonomous Delivery Robot',
    description: `<h1>Project Title: Autonomous Delivery Robot</h1>
      <h2>Supervisor: Dr. Samir Hassan</h2>
      <h3>Project Overview</h3>
      <p><strong>Objective:</strong> <em>Develop a self-navigating robot for deliveries.</em></p>
      <p><u>Technologies Used:</u> AI, Computer Vision, ROS</p>
      <p><s>Deprecated Technology:</s> Human-Based Delivery</p>
      <p style="color: red">Important Note: Safety compliance is mandatory.</p>
      <p style="background-color: yellow">Highlight: Uses LIDAR for navigation.</p>
      <h4>Project Phases</h4>
      <ol>
        <li>AI Model Development</li>
        <li>Hardware Integration</li>
        <li>Field Testing</li>
        <li>Final Deployment</li>
      </ol>
      <h4>Key Features</h4>
      <ul>
        <li>Self-Navigation</li>
        <li>Collision Avoidance</li>
        <li>Real-Time Tracking</li>
      </ul>
      <p>For more details, visit our <a href="https://example.com">website</a>.</p>`,
    status: 'In Progress',
    doctorName: 'Dr. Samir Hassan',
    doctorId: 104,
  },
];
