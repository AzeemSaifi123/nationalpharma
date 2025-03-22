import { Component } from '@angular/core';
import{Chart, registerables} from 'chart.js'
Chart.register(...registerables);
@Component({
  selector: 'app-sales-graph',
  imports: [],
  templateUrl: './sales-graph.component.html',
  styleUrl: './sales-graph.component.scss'
})
export class SalesGraphComponent {
  public  config:any = {
    type: 'line',
   
    data:{
      labels: ['Jan','Feb','Mar','Apr','June','July'],
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
      }

}
chart:any;
ngOnInit(){
  this.chart = new Chart('baseChart', this.config)
 }

}
