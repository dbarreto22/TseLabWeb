import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


declare let paypal: any;
@Component({
  selector: 'app-donar',
  templateUrl: './donar.component.html',
  styleUrls: ['./donar.component.scss']
})
export class DonarComponent  {
  
	addScript: boolean = false;
	paypalLoad: boolean = true;
	finalName: string = 'Anonimo';
	finalAmount: number = 1;

	paypalConfig = {
		env: 'sandbox',
		client: {
			sandbox: 'AcCzplimasmuTwQ4UrQ2Ri8dUpEr4GVOBxsv33NNT0MHltaAIaYqSHr2b0ygTSZ6Uo33omcanDdyotDM' //Agregar Live
		},
		commit: true,
		payment: (data, actions) => {
			return actions.payment.create({
				payment: {
					transactions: [
						{ amount: { total: this.finalAmount, currency: 'USD' } }
					]
				}
			});
		},
		onAuthorize: (data, actions) => {
			return actions.payment.execute().then((payment) => {
				console.log('*******  TRANSACCION APROBADA  ******');
				console.log('*******  TRANSACCION COMPLETADA  ******');
				console.log('donador: '+this.finalName);
				console.log('tID: '+payment.id);
				console.log('total: '+payment.transactions[0].amount.total);
				console.log('moneda: '+payment.transactions[0].amount.currency);
				console.log('fecha: '+payment.create_time);
				console.log('*******  GRACIAS POR DONAR  ******');
		//		var data = {"transaccionId":payment.id, "fecha":payment.create_time, "monto":payment.transactions[0].amount.total, "usuario":this.finalName, "moneda":payment.transactions[0].amount.currency};
/*					$http({
						url: "http://a4fa73f7.ngrok.io/donacion",
						method: "POST",
						params: data
					}) */

					//this.http.post("http://a4fa73f7.ngrok.io/donacion", data);

					this.apiService.registrardonacion(payment.id,payment.create_time,payment.transactions[0].amount.total,this.finalName,payment.transactions[0].amount.currency).subscribe(res => console.log(res));

				 /* 	var env: any = {};
  					env.transaccionId=payment.id;
  					env.fecha=payment.create_time;
  					env.monto=payment.transactions[0].amount.total;
  					env.usuario=this.finalName;
  					env.moneda=payment.transactions[0].amount.currency;
  					let json= JSON.stringify(env);
  					console.log(json);
                    this.http.post("http://a4fa73f7.ngrok.io/donacion", json);
				this.guardarDonacion(payment.id, payment.create_time, payment.transactions[0].amount.total, this.finalName, payment.transactions[0].amount.currency); */
			})
		}
	};

	ngAfterViewChecked(): void {
		if (!this.addScript) {
			this.addPaypalScript().then(() => {
				paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
				this.paypalLoad = false;
			})
		}
	}

	addPaypalScript() {
		this.addScript = true;
		return new Promise((resolve, reject) => {
			let scripttagElement = document.createElement('script');
			scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
			scripttagElement.onload = resolve;
			document.body.appendChild(scripttagElement);
		})
	}

	guardarDonacion(tid: string, fecha: string, monto: number, usuario: string, moneda: string){
		this.apiService.registrardonacion(tid, fecha, monto, usuario, moneda);
	}


  constructor(public http: HttpClient, private apiService: ApiServiceService,private router: Router) { }

}
