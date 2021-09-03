// A utiliser plus tard si le model ne change pas
export class Sourcemodel {
    zone: ZoneModel;
}

export class ZoneModel {
    polygon: PolygoneModel;
    name: string;
    observation: string;
}

export class PolygoneModel {
    type: string;
    coordinates: any;
}

export class SuccessModel {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: Sourcemodel;

}

export class MapModel {
    passager: number;
    lieuDepart: string;
    success: SuccessModel;
}
