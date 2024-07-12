import { JsonPipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../../services/member.service';
import { MonthlyPlanService } from '../../services/monthly-plan.service';
import { MonthlyPlan } from '../../models/monthly-plan';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, HttpClientModule, FormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {
  monthlyPlans: MonthlyPlan[] = [];
  memberFound = false;
  dni: string = "";
  member: any;
  monthlyPlanId = "";
  monthlyPlanSelected : any;
  monthlyPlanSelectedId = "";
  today = new Date();
  dueDate = this.getDueDateOneMonthFromToday();

  paymentLink = "";

  constructor(
    private memberService : MemberService,
    private monthlyService : MonthlyPlanService,
    private paymentService : PaymentService
  ) {}

  ngOnInit(): void {
  }

  getMember() {
    this.memberFound = false;
    this.memberService.getMemberByDNI(this.dni).subscribe(
      (data: any) => {
        console.log(data)
        this.member = data.data;
        this.monthlyPlanId = this.member.mounthlyPlan
        this.monthlyPlanSelectedId = this.monthlyPlanId;
        this.getMonthlyPlan(this.monthlyPlanId);
        this.getMonthlyPlans();
        this.memberFound = true;
        
      },
      (error: any) => {
        console.error("Error al traer el socio", error)
        this.memberFound = false;
      }
    )
  }

  getMonthlyPlan(id : string){
    console.log("ID", id);
    
    this.monthlyService.getMonthlyPlanById(id).subscribe(
      (data: any) => {
        console.log(data)
        this.monthlyPlanSelected = data.data
      },
      (error: any) => {
        console.error("Error al traer el plan", error)
      }
    )
  }

  getMonthlyPlans() {
    this.monthlyService.getAllMonthlyPlans().subscribe(
      (data: any) => {
        console.log(data)
        this.monthlyPlans = data.data;
      },
      (error: any) => {
        console.error("Error al traer planes", error)
      }
    )
  }

  getDueDateOneMonthFromToday(): string {
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onGenerateQR(): void {
    if(this.monthlyPlanId != this.monthlyPlanSelectedId)
      this.changeMonthlyPlan();

    console.log("PLAN POR LINK", this.monthlyPlanSelectedId);
    
    this.paymentService.getPaymentLink(this.monthlyPlanSelectedId).subscribe(
      (data: any) => {
        console.log(data)
        this.paymentLink= data['init_point'];
        console.log(this.paymentLink);
        
      },
      (error: any) => {
        console.error("Error al generar link", error)
      }
    )
  }


  changeMonthlyPlan(){
    this.memberService.changePlan(this.monthlyPlanSelectedId, this.member._id).subscribe(
      (data: any) => {
        console.log(data)
      },
      (error: any) => {
        console.error("Error al cambiar plan", error)
      }
    )
  }
}
