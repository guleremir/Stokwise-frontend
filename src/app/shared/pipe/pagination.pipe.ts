import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})

export class PaginationPipe implements PipeTransform {
  transform(value: number): number[] {
    return value ? Array.from({ length: value }, (v, k) => k + 1) : [];
  }
}