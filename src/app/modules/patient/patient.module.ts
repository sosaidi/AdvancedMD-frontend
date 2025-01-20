import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BillingComponent } from './components/billing/billing.component'
import { PatientDashboardComponent } from './components/dashboard/dashboard.component'
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component'
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component'
import { SettingsComponent } from './components/settings/settings.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { TopbarComponent } from './components/topbar/topbar.component'
import { LayoutComponent } from './layout/layout.component'
import { HttpClientModule } from '@angular/common/http'
import { FooterComponent } from './components/footer/footer.component'

@NgModule({
  imports: [
    CommonModule,
    BillingComponent,
    PatientDashboardComponent,
    MedicalRecordsComponent,
    PrescriptionsComponent,
    SettingsComponent,
    SidebarComponent,
    TopbarComponent,
    LayoutComponent,
    HttpClientModule,
    FooterComponent
  ],
})
export class DoctorModule {}
