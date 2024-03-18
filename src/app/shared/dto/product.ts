import { Category } from "./category";

export class Product {
    constructor(
        public name: string = '',
        public category: Category,
        public price: string = '',
        public quantity: number = 0,
        public unitInStock: number = 0,
        public minimumCount: number = 0,
        public description: string = '',

    ) { }
}