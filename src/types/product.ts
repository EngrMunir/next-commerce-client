
type Specification ={
    processor?:string;
    ram:string;
    storage:string;
    display:string;
};

export interface IProduct {
    _id:string;
    name:string;
    description:string;
    price:number;
    stock:number;
    weight:string;
    category:{
        _id:string;
        name:string;
    };
    imageUrls:string[];
    isActive:boolean;
    shop:{
        _id:string;
        shopName:string;
    };
    brand:{
        _id:string;
        name:string;
    };
    averageRating: number;
    ratingCount:number;
    availableColors:string[];
    specifications: Specification;
    keyFeatures:string[];
    slug:string;
    offerPrice:string;
    createdAt:string;
    updateAt:string;
}