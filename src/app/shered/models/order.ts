export interface AddRowRequest {
    cardId: string | null;
    quantity: number;
    expectedPrice: number;
    captchaResponse: string;
 }
 
 export interface AddRowResponse {
    id: string;
    remaining: number;
    nextCardPrice: number;
    timerEndingInfo: TimerInfoResponse;
 }
 
 export interface UpdateRowRequest {
    cardId: string;
    quantity: number;
    captchaResponse: string;
 }
 
 export interface UpdateRowResponse {
    id: string;
    remaining: number;
    nextCardPrice: number;
    timerEndingInfo: TimerInfoResponse;
 }
 
 export interface DeleteRowRequest {
    cardId: string;
    captchaResponse: string;
 }
 export interface DeleteRowResponse {
    id: string;
    remaining: number;
    nextCardPrice: number;
    timerEndingInfo: TimerInfoResponse;
 }
 
 export interface TimerInfoResponse {
    timeForCartClearing: string;
    timeForAlert: string;
 }

 export type DeliveryType = 'Pickpoint' | 'Address' | 'Terminal';
 
 export interface WidgetPlaceOrderRequest {
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    deliveryType: DeliveryType;
    deliveryRegion: string;
    deliveryCity: string;
    deliveryPostIndex: string;
    deliveryStreet: string;
    deliveryHouse: string;
    deliveryBuilding: string;
    deliveryApartment: string;
    deliveryPickupPointId: string;
    totalPrice: number;
    comment?: string;
    createAccount?: boolean;
    widgetId?: string;
    legalEntityId?: string;
 }