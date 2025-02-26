import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatStructure',
  standalone: true
})
export class FormatStructurePipe implements PipeTransform {

  transform(value: string): string {
    if(value == "public")
      return "Structure sanitaire publique"
    else if(value == "prive")
      return "Structure sanitaire privée"
    return "Autre structure sanitaire"
  }

}
