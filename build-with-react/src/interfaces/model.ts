import { ICut } from "./cut";

export interface IModel {
    title: string;
    img: string;
    type: string;
    cuts: ICut[];
}