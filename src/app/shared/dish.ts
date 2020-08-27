import { strict } from 'assert'
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms'
import { Comment } from './comment';
export class Dish{
    id: string;
    name:string;
    image:string;
    category:string;
    featured:Boolean;
    label:string;
    price:string;
    description:string;
    comments:Comment[];
    
   
   
}



