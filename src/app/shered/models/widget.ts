export interface WidgetSetCard {
   id: string;
   created:	string;
   title: string;
   description: string;
   printCount:	number;
   unlimited: boolean;
   printCountLeft: number;
   price: number;
   previewImage: string;
   frontImage: string;
   backImage: string;
}

export interface WidgetSet {
   id: string;
   name:	string;
   image: string;
   cards: WidgetSetCard[];
}

export interface Cart {
   rows: CartRow[];
   totalCount: number;
   totalPrice: number;
   alertTime: string;
   cleanupTime: string;
   cleanupType: string;
}

export interface CartRow {
   id: string;
   previewImage: string;
   title: string;
   path: string;
   detailRows: DetailRow[],
   printCountLeft: number;
   rowQuantity: number;
   rowPrice: number;
}

export interface DetailRow {
   price: number;
   quantity: number;
   detailPrice: number;
}

export interface PickUpPointModel {
   id: string;
   name: string;
   address: string;
   phones: string;
   schedule: string;
   comment: string;
   latitude: number;
   longitude: number;
   activeIcon: string;
   inactiveIcon: string;
}

