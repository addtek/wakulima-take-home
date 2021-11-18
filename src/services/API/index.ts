import {AxiosInstance} from 'axios';
import {buildAxiosInstance} from 'services/API/build-axios-instance';
import {FormData} from 'src/hooks/userRegisterFarm';
import {USER_ID} from 'config';

export class API {
  static instance?: API = undefined;
  httpClient: AxiosInstance;

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
  async registerFarm(params: FormData) {
    return await this.httpClient
      .post('farms', {...params, userId: USER_ID})
      .then(res => res.data);
  }

  async listFarms() {
    return await this.httpClient.get('farms').then(res => res.data);
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

  async createGeoShape(params: FormData) {
    return await this.httpClient
      .post('geoshapes', {...params, userId: USER_ID})
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
      .post('harvests', {...params, userId: USER_ID})
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
