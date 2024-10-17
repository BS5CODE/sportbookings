# sportbookings
# Game Theory Booking App

**Development Report**  
**Author:** Bittu Sharma  
**ID:** IIT2021200  
**Course:** Game Theory Assignment  
**Date:** 16/10/2024  

## Introduction
This project was developed as part of the Game Theory assignment for IIIT-A, utilizing the MERN (MongoDB, Express, React, Node.js) stack. The goal was to create a booking application for a sports technology company’s operations team. The app enables the operations team to manage bookings for various sports across multiple centers, ensuring smooth booking functionality with minimal chances of double-booking resources.

## Goal
The booking application serves the operations team of a sports technology company and includes the following core functionalities:
1. **Multiple Centres:** Each center offers various sports.
2. **Multiple Sports per Center:** Each sport has various courts/resources (e.g., two badminton courts, three squash courts).
3. **Customer Bookings:** Customers can book available slots (60 minutes each) for the courts.
4. **Operations Management:** Center managers can view and create bookings for any sport and effectively manage facility usage.
5. **Prevention of Double-Bookings:** Ensures that no two customers can book the same court for the same slot.

## Design Decisions
The design choices were driven by simplicity and functionality. Here are some of the key design decisions:
1. **Schema Design:**
   - Models were designed for centers, courts, sports, and bookings to represent real-world relationships between these entities.
   - We chose not to include users in the initial implementation, focusing instead on core booking functionalities.
   
2. **Backend:**
   - Developed APIs to retrieve and create bookings, ensuring that no court could be double-booked.
   - Used MongoDB for data storage due to its flexibility with data relationships and JSON structure compatibility.

3. **Frontend:**
   - Built a simple interface allowing operations teams to view bookings for the selected center and sport and create new bookings with ease.
   - User experience was prioritized by making the UI easy to navigate and minimizing the number of interactions needed to book a slot.

4. **Deployment:**
   - The application is deployed on a cloud platform, making it accessible for testing and evaluation.

## Implementation Details
1. **Frontend:**
   - Built using React with the Vite framework, featuring basic functionality to view and create bookings.
   - React was chosen for its component-based architecture and simplicity in building dynamic user interfaces.

2. **Backend:**
   - Developed using Node.js and Express.
   - APIs were created to fetch bookings for a particular center and sport, as well as to create new bookings.
   - Error handling was implemented to prevent double-bookings, ensuring that courts are not booked for overlapping slots.

3. **APIs:**
   - **View Bookings API:** Retrieves bookings for a specific center, sport, and date.
   - **Create Booking API:** Adds a new booking while ensuring no conflicts with existing ones.

4. **Data Handling:**
   - Logic was implemented to prevent the same slot from being booked twice.
   - Input validation and basic error handling were included to enhance reliability.

## Challenges and Solutions
1. **Double-Booking Prevention:**
   - **Challenge:** Ensuring that no two bookings overlap for the same resource.
   - **Solution:** Implemented server-side validation checks to prevent creating bookings for already-occupied time slots.

2. **Time Constraints:**
   - **Challenge:** Meeting deadlines while implementing both frontend and backend features.
   - **Solution:** Focused on delivering core functionalities first and planned enhancements for later, ensuring a functional MVP.

3. **Error Handling:**
   - **Challenge:** Handling potential issues such as incorrect inputs or API failures.
   - **Solution:** Implemented basic error handling and provided feedback for invalid operations on both the frontend and backend.

## Future Improvements
Given more time, the following features and enhancements could be added:
1. **User Authentication:** Implement authentication using JWT or session management for improved security.
2. **Advanced UI Features:** Enhance the user interface for responsiveness and better usability.
3. **Booking Analytics:** Provide insights into booking patterns, peak times, and popular sports at different centers.
4. **Notifications:** Add email or SMS notifications to confirm bookings or alert users to cancellations.
5. **Payment Integration:** Enable customers to make payments through the app during the booking process.

## Conclusion
This project showcases a full-stack implementation of a booking system using the MERN stack. It meets the core requirements of allowing operations teams to manage bookings while preventing double-booking of resources. The simplicity of the design ensures ease of use for the team, while the robust backend guarantees data integrity and smooth functionality. Future improvements will focus on enhancing security, usability, and additional features like analytics and payment integration.
