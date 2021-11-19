import {AxiosInstance} from 'axios';
import {buildAxiosInstance} from 'src/services/API/build-axios-instance';
import {USER_ID} from 'src/config';
import { FarmData } from "types/farm-field-data";

export class API {
  static instance?: API = undefined;
  httpClient: AxiosInstance;
  userId = parseInt(USER_ID);
  constructor() {
    this.httpClient = buildAxiosInstance();
  }
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new API();
    return this.instance;
  }
  async registerFarm(params: {
    label: string;
    id: number;
    size: number;
    sizeUnit: string;
    ownerId: number;
    uuid: string;
  }) {
    return await this.httpClient
      .post('farms', {...params, userId: this.userId, ownerType: 'string'})
      .then(res => res);
  }

  async listFarms() {
    return await this.httpClient
      .get('farms')
      .then(res => res.data as FarmData[]);
  }

  async getFarm(id: number) {
    return await this.httpClient.get(`farms/${id}`).then(res => res.data);
  }

  async deleteFarm(params: number[] | number) {
    const isList = params instanceof Array;
    return await this.httpClient
      .delete(
        `farms/${isList ? params : ''}`,
        isList ? {data: {farmIdList: params}} : undefined,
      )
      .then(res => res.data);
  }

  async createGeoShape(params: {
    farmId: number;
    id: number;
    parcelId: string;
    surfaceArea: number;
    wkt: string;
  }) {
    return await this.httpClient
      .post('geoshapes', {...params})
      .then(res => res.data);
  }

  async listGeoShapes() {
    return await this.httpClient.get('geoshapes').then(res => res.data);
  }

  async getGeoShape(id: number) {
    return await this.httpClient.get(`geoshapes/${id}`).then(res => res.data);
  }

  async deleteGeoShape(params: number[] | number) {
    const isList = params instanceof Array;
    return await this.httpClient
      .delete(
        `geoshapes/${isList ? params : ''}`,
        isList ? {data: {geoShapeIdList: params}} : undefined,
      )
      .then(res => res.data);
  }

  async recordHarvest(params: FormData) {
    return await this.httpClient
      .post('harvests', {...params, userId: this.userId})
      .then(res => res.data);
  }

  async listHarvestRecords() {
    return await this.httpClient.get('harvests').then(res => res.data);
  }

  async getHarvestRecord(id: number) {
    return await this.httpClient.get(`harvests/${id}`).then(res => res.data);
  }

  async deleteHarvest(params: number[] | number) {
    const isList = params instanceof Array;
    return await this.httpClient
      .delete(
        `harvests/${isList ? params : ''}`,
        isList ? {data: {geoShapeIdList: params}} : undefined,
      )
      .then(res => res.data);
  }
}
