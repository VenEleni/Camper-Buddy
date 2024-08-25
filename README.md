# Camper Buddy

Welcome to Camper Buddy - your ultimate destination for camping gear, insightful blogs, and community-driven forums!

<img src="./media/camper-buddy-background.jpeg" alt="Camper Buddy" width="700"/>

## Table of Contents
- [Camper Buddy](#camper-buddy)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Important Notes](#important-notes)
  - [Tech Stack](#tech-stack)
  - [Contact](#contact)

## Project Description
**Camper Buddy** is a comprehensive e-commerce platform integrated with social features such as blogs and forums, designed specifically for camping enthusiasts. Whether you're a seasoned adventurer or a newcomer to the world of camping, Camper Buddy provides all the resources you need—from essential gear to expert advice.

## Features
**E-Shop:**
- **Product Categories**: Explore a wide range of camping gear organized into categories for easy navigation.
- **Product Search**: Quickly find products by name using the intuitive search bar.
- **Product Details**: Access in-depth information on each product, including detailed descriptions, high-quality images, pricing, and user reviews.
- **Rating and Reviews**: Logged-in users can leave ratings and reviews to help others make informed decisions.
- **Cart Management**: Manage your cart with ease. Adjust product quantities and view the total cost before proceeding to checkout.
- **Order Placement**: After finalizing your cart, enter your shipping details and proceed to the payment gateway (powered by Stripe in Test Mode)
  
**Authentication**
- **User Registration and Login**: Users can sign up and log in either manually or via Google OAuth. Please note that we are using Auth20 for login and registration. However, since it is currently in Test Mode, access is likely restricted to specific email addresses that have been pre-registered. This means that only users with those pre-approved email addresses may be able to log in successfully during this phase.

**Order Management:**
- **Admin Controls**: Admin users can add new products, edit existing ones, manage orders, and change order statuses..
- **Email Notifications**: Receive automated email notifications for new orders and status updates.

**Blogs**
- **Curated Content**: Browse through a variety of blog posts related to travel, camping tips, and destination guides, all written by our admin.

**Forums (Under Construction)**
- **Community Engagement**: Participate in discussions, ask questions, and share experiences. While the forum is still under construction, stay tuned for future updates!


## Installation
Follow these steps to set up the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/VenEleni/Camper-Buddy.git
    ```
2. Navigate to the project directory:
    ```bash
    cd camper-buddy
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

## Usage
Once the development server is running, open your browser and navigate to `http://localhost:3000` to access Camper Buddy.

## Important Notes
- **Authentication**: Due to the Auth0 Test Mode, only pre-approved email addresses will be able to access the platform.
- **Payments**: The Stripe integration is also in Test Mode, so real transactions will not be processed. Use test card numbers provided by Stripe for testing purposes.


## Tech Stack
- **Frontend**: React.js, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Styling**: Tailwind CSS, React Bootstrap
- **Payment Processing**: Stripe (Test Mode)
- **Authentication**: Auth20 (Test Mode)
- **Email Notifications**: Nodemailer

## Contact
Developed by Eleni Veniou Nikolidaki.

Feel free to contact me at:
- Email: venelenii@gmail.com
- GitHub: [VenEleni](https://github.com/VenEleni)
- Linkedin: [Eleni Veniou Nikolidaki](https://www.linkedin.com/in/veneleni/)

