# Warehouse Management System - Pair 7
## Project Name: Stokwise

![Stokwise-Demo](https://github.com/guleremir/Stokwise-frontend/blob/oguzhan/src/assets/other-img/stokwise-homepage.png)

### Table of Contents
- [Project Description](#project-description)
- [Features](#features)
  - [Product Management](#product-management)
  - [Shelf Management](#shelf-management)
  - [User Management](#user-management)
  - [Reporting](#reporting)
- [Usage Areas](#usage-areas)
- [Benefits](#benefits)
- [Authors](#authors)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

### Project Description
The Warehouse Management System is a comprehensive software solution designed to efficiently manage products within a warehouse. This system encompasses the placement of incoming products on shelves, the removal of products from shelves, and the reporting of product information. Additionally, it allows for the management of products, shelves, and users through an admin panel.

[Stokwise-Warehouse-Video.mp4](https://github.com/guleremir/Stokwise-frontend/assets/143035790/2e0ffd50-9b51-4940-82be-447cffccf413)

# Warehouse

Our project opens with a menu page and features an image representing our warehouse in the navbar, sidebar, and tab icons. The design is responsive to ensure effective viewing on different devices. Using CSS Flexbox and grid systems, we have established an orderly and flexible structure, providing a modern and user-friendly interface with CSS and TypeScript. The interface includes animations and transition effects, along with navbar, button, and form elements. The navbar allows for easy navigation within the site.

The "Introduction" and "About" sections contain information about our warehouse, while the "Team" section introduces our team, and the "Contact" section provides various communication methods. In this section, you can contact the warehouse via phone, email, or message box.

The "Login" section includes two input fields, created with ReactiveForm and enhanced with validation. Login operations are protected by tokens, with a token duration set to 24 hours. During this period, the token renews itself in the background without the user noticing. Security operations are ensured by security config on the backend and guards on the frontend.

Our project has two areas: Warehouse and Admin Panel. The "warehouse_supervisor" and "report_reader" roles have access to the Warehouse area, while the "admin" role can access the Admin Panel area. Users log in using the same login screen, and the system directs them to the relevant page based on the role associated with the entered email.

**Warehouse Supervisor:** This role has full authority in the warehouse section. They can add, delete, and update products, add categories, add and delete shelves, place products on shelves, and manage product entry and exit.

**Report Reader:** This role is limited to reporting and has no authority in other areas. This limitation is enforced by guards. Our project includes two types of reports: Products Report and Minimum Count Report.

**Products Report:** This report lists all products in the warehouse, including product name, category name, price, quantity, stock amount, defined minimum stock level, and product description. The date the report was taken is displayed in the upper right corner.

**Minimum Count Report:** This report lists products that have fallen below the defined stock level, with the same contents as the Products Report.

Logged-in users can view their account information and assigned role, and they can change their password.

----
Product cards include the product name, category information, product price, product quantity, stock information, defined minimum stock quantity, and product description.

## Features

- **Product Name**: The name of the product.
- **Category Information**: The category to which the product belongs.
- **Product Price**: The unit price of the product.
- **Product Quantity**: The available quantity of the product.
- **Stock Information (Unit in Stock)**: The number of products placed on the shelves.
- **Minimum Stock Quantity**: The defined minimum stock quantity.
- **Product Description**: Detailed information about the product.

### Stock Management

- **Unit in Stock**: Determined by the number of products placed on the shelves.
- **Updating Quantity**: During the edit process, the updated quantity is written in a newly opened input field and added to the previous amount. This method is used to facilitate calculations.
- **Deletion**: Products with filled Quantity and Unit in Stock fields cannot be deleted.

### Search and Pagination

- **Search**: Searches are conducted by product name.
- **Pagination**: While sorting products, searched products are also re-sorted within themselves.

----

## Shelves
Due to the diversity and varying sizes of our products, we have kept the shelf capacity flexible in our system. Our warehouse has shelves with capacities ranging from 50 to 200.
- **Add Shelf:** This feature allows the creation of shelves with desired capacities.
- **Category-Based Search:** It is possible to perform category-based searches within the shelves.
- **Shelf-Category Relationship:** According to the needs of our project, we revised the shelf system by establishing a relationship between shelves and categories. When a product is placed on a shelf, the category of that product is assigned to the shelf, and the shelf will only accept products from the specified category until it is completely empty. Once the shelf is empty, the category link is removed.
- **Shelf Table:** The table displays the capacity, total number of products, and category of each shelf. By clicking on a filled shelf, the details of the number of each product type on that shelf can be examined.
- **Shelf Management:** Shelf capacities can be updated, and empty shelves can be deleted. Shelves with products cannot be deleted until they are empty.
- **Toaster Notifications:** All notifications are displayed to the user via toaster alerts.

## Product Placement
- **Product Placement:** You can see the products that can be placed on the shelves and how many of them are ready for placement in the warehouse. When a product is selected and the quantity is entered, the product is placed on the shelf.
- **Warnings:** If a value greater than the available stock is entered, the selected box will give a warning.
- **Business Logic:**
  - The category of the product is checked. If there are half-filled shelves of the same category, filling starts from these shelves.
  - As the shelves fill up, the process moves to the next one.
  - When all half-filled shelves of the same category are full, an empty shelf is selected to continue.
  - If all shelves are half-filled and there are no shelves of the desired product category, the system gives an error indicating that there are no suitable shelves, and placement cannot be done.
- **Stock Update:** After placement, the stock quantities in the product cards are updated.

## Product Dispatch
- **Product Dispatch:** You can see the products on the shelves and their quantities. When a product is selected and the quantity is entered, that product is dispatched from the warehouse.
- **Warnings:** If a value greater than the available stock is entered, the selected box will give a warning.
- **Business Logic:**
  - Product dispatch is primarily done from half-filled shelves.
  - If there are multiple half-filled shelves with the same product, the dispatch starts from the shelf with the least quantity and continues in ascending order.
  - When all half-filled shelves are empty, the dispatch process continues from fully filled shelves.
  - If a shelf is completely emptied, the category relationship is removed.
- **Stock Update:** After the product is dispatched from the warehouse, the stock quantities in the product cards are updated.

[Stokwise-AdminPanel-Video.mp4](https://github.com/guleremir/Stokwise-frontend/assets/143035790/f7473500-6631-4be3-acde-5955aad915c1)

# Admin Panel

Our project has an Admin Panel designed to manage user registrations and other tasks. Users cannot register themselves; instead, the administrator handles all user registrations. Also, unlike the User Panel, the Admin Panel allows category management, including editing and deleting categories.

## Admin Panel Structure

The Admin Panel consists of three main sections:
1. **Side-Bar**: Located on the left side of the page.
2. **Informational Cards**: Positioned at the top of the page.
3. **Main Table**: Displays the relevant data for each section.

### Side-Bar

The side-bar contains the following sections:
- **Products**
- **Categories**
- **Shelves**
- **Users**
- **My Account**

Below these sections, there is a "Log Out" button. When a section is selected, its background color changes to indicate the current selection to the admin.

### Informational Cards

At the top of the page, there are four informational cards providing up-to-date information about the warehouse:
1. **Total Number of Products**: Displays the total number of products in the warehouse.
2. **Total Shelf Capacity**: Shows the overall capacity of all shelves.
3. **Product to Shelf Capacity Ratio**: Indicates the percentage of shelf capacity currently occupied by products.
4. **Total Number of Users**: Shows the total number of registered users.

## Functionalities

### Products Section

The functionalities available in the Products section are also accessible in the User Panel, including:
- **Product Search**: Allows searching for products by name. Partial matches will display relevant results.
- **Add Product**: The "Add Product" button opens a form where required fields must be filled before submission. The "Units In Stock" field is read-only.
- **Product Reports**: "Report Product" and "Minimum Count" buttons generate PDF reports, downloadable from the browser.
- **Product Table**: Displays product details such as name, category, and description. Long descriptions are truncated with ellipses and shown in full on hover. Rows with "Units In Stock" equal to or less than the "Minimum Count" are highlighted.
- **Edit and Delete Icons**: Icons for editing and deleting products are available and function identically to those in the User Panel.

### Categories Section

In the Categories section, admins can:
- **Add Categories**: Add new categories.
- **Edit Categories**: Modify existing category names.
- **Delete Categories**: Remove categories, provided they do not contain any products.

### Shelves Section

The Shelves section includes:
- **Shelf Details**: Similar to the User Panel, shelves are interactive. Clicking on a shelf displays the products it contains.
- **Capacity Management**: Shelves containing products cannot be deleted, and the "Shelf Capacity" cannot be reduced below the "Product Count".

### Users Section

The Users section offers:
- **Search Bar**: Search for users by email.
- **Add User**: The "Add User" button opens a form to input email, password, and role information. Password strength is visually indicated, and passwords must be confirmed.
- **User Management**: Admins can delete users, or change their roles and passwords. However, email addresses cannot be modified. Admins cannot delete themselves but can delete other admins and users with different roles.
- **Logging**: All actions are logged in the database and files.

### My Account Section

In the My Account section, admins can:
- **Update Password**: Change their password. The system checks for the correctness of the old password and ensures the new passwords match. If they do not, a toastr notification alerts the admin.

### Features

#### Product Management
- **Add Products:** Record new products arriving at the warehouse.
- **Update Products:** Update existing product information.
- **Delete Products:** Remove records of products no longer in the system.
- **Stock Tracking:** Monitor the stock status and quantity of each product.

#### Shelf Management
- **Add/Edit/Delete Shelves:** Manage and organize shelves within the warehouse.
- **Shelf Placement:** Arrange products on shelves based on their categories.
- **Shelf Occupancy Status:** Monitor the occupancy rate of each shelf.

#### User Management
- **Add Users:** Register new users in the system.
- **User Roles:** Define different authorization levels for users (e.g., admin, warehouse worker).
- **User Activity Tracking:** Monitor and report user activities.

#### Reporting
- **Generate Reports:** Create detailed reports on product movements, stock status, and user activities.
- **Automatic Reporting:** Regularly generate and view reports with the automatic reporting module.
- **Analysis and Visualization:** Visualize report results with graphical and statistical analyses.

----

## Database Management and Logging

Our project employs the soft delete method for managing products. Instead of physically deleting products, they are marked as deleted. Here are the processes we follow regarding this method:

### Soft Delete and Hard Delete Process
- **Soft Delete:** When a product is deleted, it is not physically removed from the database. Instead, it is marked as "deleted". This allows for the possibility of data recovery or review.
- **Hard Delete:** A scheduled task runs monthly to check the list of soft-deleted products. Products that have been marked as deleted for a year are permanently removed from the system (hard delete). This duration can be adjusted based on customer requirements.

### Record Keeping
- **Deletion Information:** The Product table stores information about who marked a product as soft deleted, who added the product, who deleted the user, and the dates of these actions.
- **Logging:** Information about added, edited, and deleted products and users is logged within the system. This ensures that all actions are traceable and can be reviewed or reverted if necessary.

This structure provides flexibility in database management while ensuring data security and traceability.

----

### Usage Areas
- Warehouse and logistics management
- Retail sector
- E-commerce warehouses
- Manufacturing facilities

### Benefits
- **Increased Efficiency:** Automating warehouse operations speeds up processes and increases efficiency.
- **Accurate Stock Management:** Detailed tracking of product entry and exit ensures accurate stock levels.
- **Easy Management:** All warehouse management operations can be easily performed with a user-friendly admin panel.
- **Advanced Reporting:** Comprehensive and regular reports provide detailed insights into warehouse operations.

### Authors

- [Aslı KARAYİĞİT](https://github.com/aslikrygt)
- [Elif ARAS](https://github.com/elifdev)
- [Emir GÜLER](https://github.com/guleremir)
- [Müslüm TUNÇ](https://github.com/mslmtunc)
- [Nazlı NOYAN TAŞTAN](https://github.com/nazlinoyantastan)
- [Oğuzhan YALÇIN](https://github.com/OguzhanYalcn)

### Installation
To install and run the Warehouse Management System locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/guleremir/Stokwise-frontend.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd Stokwise-frontend
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up the backend:**
   - Navigate to the backend directory

    **Set Up Your Project Locally**

    - First, navigate to the directory where your project is located. You can use the following command in your terminal or command prompt:

      ```bash
      cd /path/to/your/project
      ```

    **Initialize Git**

    - Initialize Git in your project directory:

      ```bash
      git init
      ```

    **Add Remote Repository**

    - Add your GitHub repository as the remote repository:

      ```bash
      git remote add origin https://github.com/guleremir/stokwise-backend.git
      ```

    **Stage Files and Commit**

    - Add all files and make the initial commit:

      ```bash
      git add .
      git commit -m "Initial commit"
      ```

    **Push Changes to GitHub**

    - Push your commits to GitHub:

      ```bash
      git push -u origin master
      ```

   **Project Configuration (application.properties)**

    - If you have an `application.properties` file with the following content in your project, ensure it is included in your project:

      ```properties
      spring.jpa.hibernate.ddl-auto=none
      spring.datasource.url=jdbc:mysql://localhost:3306/stokwisedb?createDatabaseIfNotExist=true
      spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
      spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
      spring.datasource.username=your_name
      spring.datasource.password=your_password
      ```
----
     
5. **Run the frontend:**
   - Navigate to the frontend directory
   - Start the frontend server:
     ```bash
     npm start
     ```

### Usage
Once the system is up and running, you can access the application in your web browser at `http://localhost:4200`. Use the admin panel to manage products, shelves, and users, and generate reports to monitor warehouse operations.

### Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.


---

Feel free to customize the installation and usage instructions according to your specific setup and preferences. If there's anything else you need or any further adjustments required, let me know!
