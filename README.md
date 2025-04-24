# COMP3000: El Comercio
### By Damon Martin: StudentID 10729705
**Production URL**: [https://comp3000-el-comercio.xyz/](https://comp3000-el-comercio.xyz/)  
**Warning**: University Wi-Fi may block the backend and auth-server due to restricted port numbers.

## Overview

El Comercio is an accessible and user-friendly e-commerce platform built with **React**, leveraging **Human-Computer Interaction (HCI)** and **accessibility best practices** in both design and implementation. The web-application built using NextJS and NodeJS has an in-built screen-reader as well and an in-built dyslexic font option.

## Development Admin Access

- **Email**: `admin@example.com`  
- **Password**: `password`  
*Note: This account is only for use in the development environment. And not if actually real*

## PayPal Sandbox Accounts

In Order to Test PayPal Sandbox Purchases and Refunds, you may use your own PayPal sandbox credentials or the ones provided below:

- **Customer Account**  
    - Email: `standard.customer@plymouth.com`  
    - Password: `*n0z%J:Y`
- **Business Account**  
    - Email: `business@plymouth.com`  
    - Password: `_ET4.tFe`

## How to Run the Project Locally

1. **Install Docker**  
   Download and install Docker from [https://www.docker.com/](https://www.docker.com/).

2. **Please Update Environment Variable**  
   In the `/front-end` directory, edit the `.env.local` file:  
   Set the `prod` variable to `false`.

3. **Start the Application**  
   Run the following command in the root directory:  
   ```bash
   docker-compose up -d --build

4. **Then open in your browser https://localhost**