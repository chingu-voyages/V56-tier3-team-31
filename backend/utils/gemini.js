export const PROJECT_FAQ_CONTEXT = `
Use the following context information to answer the question:

Frequently Asked Questions (FAQ) - Chingu Voyage Project: Surgery Status Board

## General Project Questions

**Q1: What is the main objective of the Surgery Status Board project?**
A: The primary objective is to design and build a web application that allows surgery center staff to collect patient information and track the progress of their surgery. This information will be displayed on a monitor in the surgical waiting room so that family and friends can see a patient's status in real-time.

**Q2: Who is intended to work on this project?**
A: This project is designed to be worked on by a team of Chingu developers, emphasizing collaboration and project management using the Agile Methodology outlined in the Voyage Handbook.

**Q3: Can we use our own design and styling?**
A: Yes, absolutely! You are encouraged to use your team's creativity to design a distinctive and user-friendly UI/UX. The provided wireframes are for guidance on functionality, not a strict design specification.

**Q4: Do we need to purchase any software or subscriptions?**
A: No. The project is designed to be completed using free-tier services. The Google Gemini Flash 1.5 free tier is sufficient for the AI component, and there are many free web hosting services available for deployment.

---

## Technical & Implementation

**Q5: What technology stack are we required to use?**
A: There are no strict requirements. Your team may use any languages, tools, or libraries you collectively agree upon. A sample React app is provided in the repository to demonstrate calling the Gemini API.

**Q6: What are the structural requirements for different Tiers?**
A: Tier 1 and Tier 3 teams can implement this as a frontend-only application. However, Tier 3 teams are expected to implement both a frontend and a backend.

**Q7: Can we use AI tools like GitHub Copilot to write our code?**
A: No. You may use AI for research and brainstorming, but you are not permitted to use it to generate code for your application.

**Q8: What are the standard components required on each page?**
A: Each page should include:
- A header with the app name, current date, and navigation links.
- A footer with a link to your team's GitHub repo and a list of team members.
- Optionally, a chat icon for the AI help agent.

---

## User Roles & Authentication

**Q9: What are the different user roles in the application?**
A: There are three user roles:
- Guest: The default user type. Does not require a login.
- Admin: Requires login and authentication.
- Surgical Team Member: Requires login and authentication.

**Q10: What are the permissions for each user role?**
A:
- Guests can only view the Patient Status display screen.
- Admins have access to all application functionality, including adding and updating patient information.
- Surgical Team Members can access all functionality except for the Patient Information Screen (they cannot add new patients or edit their core data).

**Q11: Do we need to build a user registration system?**
A: No. For simplicity, you can use a static, hard-coded list of Admins and Surgical Team Members for your authentication process. A stretch goal is to implement OAuth (Google, GitHub) for more robust authentication.

---

## Application Functionality

**Q12: How should the unique patient number be generated?**
A: The patient number must be exactly six characters long, containing any combination of letters and numbers. It must be unique and must not contain any personally identifiable information (PII) like parts of the patient's name, address, or phone number.

**Q13: What are the predefined surgical statuses?**
A: The statuses are: Checked In, Pre-Procedure, In-progress, Closing, Recovery, Complete, and Dismissal. Each status should be assigned a unique color for display.

**Q14: Are there rules for updating a patient's status?**
A: Yes. Statuses cannot be skipped. A user can only select the immediately prior or next status in the workflow. For example, a patient in Pre-Procedure can only be moved to Checked In or In-progress.

**Q15: What information should be visible on the public Patient Status Display Screen?**
A: This screen should only display the Patient number and their Current status. The background color of the status should correspond to the color your team chose for it.

**Q16: How does the Patient Status Display Screen update?**
A:
- For frontend-only applications, the display updates when a user presses a Refresh button.
- For full-stack applications, the display should update in real-time when the status is changed in the backend.

---

## AI Integration & Stretch Goals

**Q17: Is the AI Chatbot a mandatory feature?**
A: No, it is an optional feature. However, it is strongly suggested that Tier 2 and Tier 3 teams attempt to implement it.

**Q18: What is the purpose of the AI Chatbot?**
A: The AI chatbot is intended to act as interactive help documentation. Users can ask it questions about how to use the application, such as "How do I search for a patient?" or "What do the different statuses mean?".

**Q19: How do we implement the AI chatbot?**
A: You will need to use the Google Gemini API. The key is to provide a "context" about your application in your API calls so Gemini can answer user questions accurately. An example is provided in the src directory of the project repository.

**Q20: What are some of the other stretch goals we can implement?**
A: After completing the MVP, you can add features like:
- Implementing full-stack OAuth authentication (Google/GitHub).
- Adding functionality to email status updates to a contact person.
- Enhancing the search functionality to allow searching by partial address or telephone number.
`;
