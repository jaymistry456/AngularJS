import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'sort',
  standalone: true,
  pure: false // disables caching
})
export class SortPipe implements PipeTransform {
  transform(values: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
    const newArray = [...values];
    newArray.sort((a, b) => {
      if(direction === 'asc') {
        return a > b ? 1 : -1;
      }
      else {
        return a > b ? -1 : 1;
      }
    });
    return newArray;
  }
}