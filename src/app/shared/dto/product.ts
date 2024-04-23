import { Category } from "./category";

export class Product {
    constructor(
        public id:string = "",
        public name: string = '',
        public category: Category,
        public price: number = 0,
        public quantity: number = 0,
        public unitInStock: number = 0,
        public minimumCount: number = 0,
        public description: string = '',

    ) { }
}