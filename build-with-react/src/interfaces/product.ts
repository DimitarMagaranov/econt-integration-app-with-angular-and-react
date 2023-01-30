import { ICut } from "./cut";
import { IModel } from "./model";

export interface IProduct {
    mark: string;
    models: IModel[];
    selectedCut?: ICut;
    price?: Number;
}