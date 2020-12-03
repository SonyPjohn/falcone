import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { FalconeService } from '../../services/falcone.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { message } from '../../../assets/config/message';

@Component({
  selector: 'app-vehicle-selection',
  templateUrl: './vehicle-selection.component.html',
  styleUrls: ['./vehicle-selection.component.css']
})
export class VehicleSelectionComponent implements OnInit {

  planetOneControl = new FormControl();
  vehicleControl = new FormControl();
  planets: any;
  allPlanets: any[];
  isSelected: false;
  allVehicles: any[];
  vehicles: any[];
  choosenPlanet: any;
  planetData: any;
  vehicleData: any;
  selectedData: any;
  choosenVehicle: any;
  timeTaken: number;
  disableButton: boolean;
  vehicleArray: any[];
  previousTime: number;

  constructor(private falconService: FalconeService, private authService: AuthService, private router: Router) {
    this.vehicleArray = [];
    this.previousTime = 0;
    this.disableButton = false;
    this.planetData = {
      name: null,
      distance: null
    };
    this.vehicleData = {
      name: null,
      total_no: null,
      max_distance: null,
      speed: null,
    };
    this.selectedData = [
      {
        planetData: this.planetData,
        planetList: null,
        vehicleData: this.vehicleData,
        vehicleList: null,
        isPlanetSelected: false,
      },
      {
        planetData: this.planetData,
        planetList: null,
        vehicleData: this.vehicleData,
        vehicleList: null,
        isPlanetSelected: false,
      },
      {
        planetData: this.planetData,
        planetList: null,
        vehicleData: this.vehicleData,
        vehicleList: null,
        isPlanetSelected: false,
      },
      {
        planetData: this.planetData,
        planetList: null,
        vehicleData: this.vehicleData,
        vehicleList: null,
        isPlanetSelected: false,
      }
    ];
  }

  ngOnInit(): void {
    this.getAllPlanets();
    this.getAuthToken();
    this.getAllVehicles();
  }

  // function to get the list of all planets
  public getAllPlanets(): void {
    this.falconService.getPlanets().subscribe((res: any) => {
      this.allPlanets = [...res];
      this.planets = [...res];
      this.selectedData.filter(planet => {
        planet.planetList = this.allPlanets;
        planet.isPlanetSelected = false;
      });
    }, err => {
      alert(message.falcon.err.planet);
    });
  }

  // function to get the list of all vehicles
  public getAllVehicles(): void {
    this.falconService.getVechicles().subscribe((res: any) => {
      this.allVehicles = [...res];
      this.selectedData.filter(vehicle => {
        vehicle.vehicleList = this.allVehicles;
      });
    }, err => {
      alert(message.falcon.err.vehicle);
    });
  }

  // function to get the authentication token
  public getAuthToken(): void {
    this.authService.getAuthToken().subscribe((res: any) => {
      if (res.status === 200) {
        localStorage.setItem('authToken', res.body.token);
      }
    }, err => {
      alert(message.auth.err.token);
    });
  }

  // function works when planet dropdown field changes
  public onPlanetChange(index): void {
    this.selectedData[index].planetList = this.allPlanets.filter(
      planet => planet.name.toLowerCase().includes(this.planetOneControl.value));
    this.choosenPlanet = this.allPlanets.find(planet => planet.name === this.planetOneControl.value);
    if (this.choosenPlanet) {
      const selectedPlanet = this.allPlanets.find(planet => planet.name === this.planetOneControl.value);
      selectedPlanet.isPlanetSelected = true;
      this.selectedData[index].planetData = this.choosenPlanet;
      this.selectedData[index].vehicleList = this.allVehicles.filter(vehicle =>
        (vehicle.max_distance >= this.choosenPlanet.distance && vehicle.total_no > 0));
    }
  }

  // function works when vehicle dropdown changes
  public onVehicleChange(index): void {
    this.choosenVehicle = this.allVehicles.find(vehicle => vehicle.name === this.vehicleControl.value);
    if (this.choosenVehicle) {
      this.selectedData[index].vehicleData = this.choosenVehicle;
      if (this.selectedData[index].vehicleData.total_no > 0) {
        this.allVehicles.forEach(vehicle => {
          if (vehicle.name === this.selectedData[index].vehicleData.name) {
            vehicle.total_no = vehicle.total_no - 1;
          }
        });
        this.selectedData.filter(vehicle => {
          vehicle.vehicleList = this.allVehicles;
        });
      }
      this.timeTaken = (this.selectedData[index].planetData.distance / this.selectedData[index].vehicleData.speed) + this.previousTime;
      this.previousTime = this.timeTaken;
    }
  }

  // function works when find falcone button is clicked
  public findFalcone(): void {
    const planetArray = [];
    const vehicleArray = [];
    this.selectedData.forEach(element1 => {
      planetArray.push(element1.planetData.name);
      vehicleArray.push(element1.vehicleData.name);
    });
    const filteredPlanet = planetArray.filter(el => {
      return el != null;
    });
    const filteredVehicle = vehicleArray.filter(el => {
      return el != null;
    });
    if (filteredPlanet.length === 4 && filteredVehicle.length === 4) {
      const data = {
        'token': localStorage.getItem('authToken'),
        'planet_names': filteredPlanet,
        'vehicle_names': filteredVehicle
      };
      this.falconService.findFalcone(data).subscribe((res: any) => {
        if (res.status === 200) {
          this.falconService.falconeResult(res.body, this.timeTaken);
          this.router.navigate(['/result']);
        }
      }, err => {
        this.falconService.falconeResult(err.body, this.timeTaken);
        this.router.navigate(['/result']);
      });
    } else {
      alert(message.falcon.err.findAlert);
    }
  }
}
