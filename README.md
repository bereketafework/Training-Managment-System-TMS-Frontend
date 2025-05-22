# TMS-Frontend

A responsive Training Management System (TMS) frontend built with Vue.js and Vuetify. This project provides a user-friendly interface for managing trainings, participants, users, and guests, with real-time dashboard analytics and CRUD functionalities.

## Features

- **Dashboard**: Visual summary of total participants, active trainings, guests, and users.
- **Participants Management**: Register, update, delete, and enroll participants in trainings.
- **Training Management**: Create, update, delete, and view details of trainings.
- **User Management**: Manage system users with roles and permissions.
- **Guest Management**: Track and manage guest users.
- **Enrollment**: Assign participants to trainings with validation.
- **Responsive Design**: Fully responsive layout for desktop and mobile devices.
- **Search & Filter**: Search and filter data in tables for quick access.
- **Snackbar Notifications**: Real-time feedback for all actions (create, update, delete, enroll).
- **Validation**: Form validation for all user inputs.
- **Overlay Dialogs**: Clean modals for forms and confirmations.
- **Vuex/Pinia Store**: Centralized state management for all modules.
- **API Integration**: All data is fetched and updated via RESTful API endpoints.

## Technologies Used

- [Vue.js 3](https://vuejs.org/)
- [Vuetify 3](https://next.vuetifyjs.com/)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [Axios](https://axios-http.com/) (API requests)
- [Day.js](https://day.js.org/) (date handling)
- [Chart.js](https://www.chartjs.org/) (dashboard charts)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/TMS-Frontend.git
   cd TMS-Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoints:**
   - Update the `src/service/api.js` file with your backend API base URL if needed.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm run serve
   ```

5. **Open in your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) or the port shown in your terminal.

## Usage

- **Dashboard**: View real-time statistics for participants, trainings, guests, and users.
- **Participants**: Register new participants, update their info, enroll them in trainings, or remove them.
- **Trainings**: Create new trainings, update details, view all trainings, and delete as needed.
- **Users & Guests**: Manage users and guests with full CRUD operations.
- **Search & Filter**: Use the search bars in tables to quickly find records.
- **Responsive**: The UI adapts to all screen sizes for mobile and desktop use.

## Project Structure

- `src/views/`: Main views for dashboard, participants, trainings, users, etc.
- `src/components/`: Reusable UI components (cards, dialogs, etc.).
- `src/stores/`: Pinia stores for state management.
- `src/service/`: API configuration and helpers.

## Customization

- **API URL**: Change the API base URL in `src/service/api.js`.
- **Theme**: Customize Vuetify theme in `src/plugins/vuetify.js`.
- **Add Features**: Extend stores and views for more modules as needed.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

[MIT](LICENSE)

---

**Enjoy using TMS-Frontend! For any issues or feature requests, please open an issue on GitHub.**
