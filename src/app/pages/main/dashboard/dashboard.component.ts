import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
// import * as Feather from 'feather-icons';

import {
  ApexChart,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ApexResponsive,
} from 'ng-apexcharts';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';

type ApexXAxis = {
  type?: 'category' | 'datetime' | 'numeric';
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;

  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  responsive: ApexResponsive[];
};

export type ChartOptions1 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public ChartOptions: Partial<ChartOptions1>;
  public ChartOptionss: Partial<ChartOptions2>;

  @ViewChild(DaterangepickerDirective, { static: false })
  pickerDirective: DaterangepickerDirective;

  selected: { start: moment.Moment; end: moment.Moment };

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'distibuted',
          data: [21, 22, 10, 28, 16, 21, 13],
          // data: [0, 500, 1000, 1500, 2000]
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#546E7A',
        '#26a69a',
        '#D10CE8',
      ],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          // ["Lily", "Roberts"]
        ],
        labels: {
          style: {
            colors: [
              '#008FFB',
              '#00E396',
              '#FEB019',
              '#FF4560',
              '#775DD0',
              '#546E7A',
              '#26a69a',
              // "#D10CE8"
            ],
            fontSize: '12px',
          },
        },
      },
    };

    this.ChartOptions = {
      series: [44, 55],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Male', 'Female'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.ChartOptionss = {
      series: [70],
      chart: {
        height: 140,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
        },
      },
      labels: ['Cricket'],
    };
  }

  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
  };

  openDatepicker() {
    this.pickerDirective.open();
  }

  ngOnInit(): void {
    //feather.replace();
  }

  ngAfterViewInit(): void {
    // Feather.replace();
  }
}
