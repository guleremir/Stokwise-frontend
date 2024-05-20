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
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Configure the database connection settings in `config/database.js`
   - Run the backend server:
     ```bash
     npm start
     ```

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
