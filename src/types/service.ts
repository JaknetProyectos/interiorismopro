import { ServiceOption } from "./service-option";

export interface Service {
    id: string;
    title: string;
    idealFor: string;
    options: ServiceOption[];
    features: string[];
}