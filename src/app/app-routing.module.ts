import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FalconeResultComponent } from './components/falcone-result/falcone-result.component';
import { VehicleSelectionComponent } from './components/vehicle-selection/vehicle-selection.component';

const routes: Routes = [
  { path: 'selection', component: VehicleSelectionComponent },
  { path: 'result', component: FalconeResultComponent },
  { path: '',   redirectTo: '/selection', pathMatch: 'full' },
  { path: '**', component: VehicleSelectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
