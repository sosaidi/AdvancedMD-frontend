import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module'; // Ensure routing module is imported

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule // No need for declarations of components as they are dynamically loaded
  ]
})
export class AdminModule {}
