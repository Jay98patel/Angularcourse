import { strict } from 'assert'
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms'

export class Dish{
    id: String;
    name:String;
    image:String;
    category:String;
    featured:Boolean;
    label:String;
    price:String;
    description:String;
}