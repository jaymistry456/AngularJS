import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: string | number, inputType: 'cel' | 'fah', outputType?: 'cel' | 'fah') {
    if(typeof value === 'string') {
      value = parseFloat(value);
    }
    
    let outputTemp: number;
    if(inputType == 'cel' && outputType == 'fah') {
      outputTemp = value * (9 / 5) + 32;
    }
    else if(inputType == 'fah' && outputType == 'cel') {
      outputTemp = (value - 32) * 5 / 9;
    }
    else {
      outputTemp = value;
    }

    let outputSymbol: string;
    if(outputType) {
      outputSymbol = outputType === 'cel' ? 'C' : 'F';
    }
    else {
      outputSymbol = inputType === 'cel' ? 'C' : 'F';
    }

    return `${outputTemp.toFixed(2)} ${outputSymbol}`;
  }
}