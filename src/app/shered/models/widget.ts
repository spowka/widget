export interface Collection {
   id: number;
   title: string;
   photo: string;
   cards: Card[];
}

export interface Card {
   id: number;
   photo: string;
   backPhoto: string;
   title: string;
   circulation: number;
   instock: number;
   isDisable: boolean;
   price: number;
   currnetPrice?: number;
   isSale: number;
   isSalePercent: number;
}

export interface Cart {
   
}

