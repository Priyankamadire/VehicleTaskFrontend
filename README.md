Problem Statement

Develop a web application using React.js that enables users to create, display, update, and delete scenarios and vehicles. Each scenario should have fields for scenario ID, name, and time, and can contain multiple vehicles. Vehicles should have fields for vehicle ID, name, initial position (X, Y), speed, and direction (Towards, Backwards, Upwards, Downwards). Implement a Node.js server to handle GET, POST, PUT, and DELETE requests, storing the data in a JSON file. The application should feature a sidebar for navigation and allow users to select a scenario and start a simulation where vehicles move based on their parameters. Ensure vehicle positions do not exceed the container boundaries, hiding them if they do. Deploy the completed application and provide a detailed README.md file with installation and usage instructions.
Backend Deployed Link : https://vehicletaskbackend.onrender.com/   from here json data is stored and served 
API documentation (POSTMAN) : https://documenter.getpostman.com/view/25358745/2sA3QmCZbf   all the methods defined clearly (POST,GET,PUT,DELETE)
Video explanation : https://drive.google.com/file/d/1ti42EWVowupjcsLXEszuafRALqb1G3Nd/view?usp=sharing  
React Deployed Link : https://vehicle-simulation-phi.vercel.app/

To clone this Project
Step 1 : npx create-react-app myapp
Step 2 : npm install package-name (install all packages from package.json)
Step 3 : copy all files
Step 4 : npm start

Home Page to Select Scenario and start Simulation
![Screenshot 2024-05-19 040908](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/a07e586a-0a6f-4778-aed2-c001adf8c8db)

Add Scenario 
![Screenshot 2024-05-19 040944](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/12f9146a-122f-4224-bd06-47b38e72bceb)

![Screenshot 2024-05-19 041000](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/e4b30abe-45e8-47f7-a3d6-3e92ee062694)

view Scenario
![Screenshot 2024-05-19 041020](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/a1adf30a-b53a-40af-8f4a-f398fdedf77b)
add vehicle 
![Screenshot 2024-05-19 041154](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/5d5162ea-c2c8-4f66-8c35-726c97657681)
![Screenshot 2024-05-19 041102](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/cc2b5933-bf51-4d24-b44e-120a36c642c7)

start or stop Simulation
![Screenshot 2024-05-19 041235](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/19407a15-2c01-49fa-86d4-d0b94790c84b)
![Screenshot 2024-05-19 041217](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/e12cd83f-3b08-4916-a1a3-6b2df212a52e)
update vehicle
![Screenshot 2024-05-19 041308](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/e9d5aee0-edbf-4c8c-8616-94edf4048e90)
delete vehicle
![Screenshot 2024-05-19 041332](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/75f928fe-9fec-4b51-b126-dda0865dffc2)
view  all scenarios
![Screenshot 2024-05-19 041406](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/c048021b-6a1e-4048-92b1-022623faaeaa)
update scenario
![Screenshot 2024-05-19 041436](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/02771802-d213-469b-9edd-6d6c51a306ed)
vehicle will only be added under simulation borders
![Screenshot 2024-05-19 041535](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/a49f162e-b26d-4221-b81a-04d0cbaeb457)
delete all scenarios
![Screenshot 2024-05-19 041636](https://github.com/Priyankamadire/VehicleTaskFrontend/assets/108828579/6107ed4b-651d-4316-b532-1d1c35ec6969)

