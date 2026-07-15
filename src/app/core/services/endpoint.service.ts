import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private readonly baseUrl = environment.apiUrl;

  AUTH = {
    BASE: `${this.baseUrl}/auth`,
    LOGIN: `${this.baseUrl}/auth/login`,
  };

  COMPANY = {
    PAGINATION: `${this.baseUrl}/Companies/list`,
    DETAIL: `${this.baseUrl}/Companies/detail`,
    CREATE: `${this.baseUrl}/Companies/create`,
    UPDATE: `${this.baseUrl}/Companies/update`,
    ACTIVATE: `${this.baseUrl}/Companies/activate`,
    DEACTIVATE: `${this.baseUrl}/Companies/deactivate`,
    SELECT_BOX: `${this.baseUrl}/Companies/select-box`,
  };

  BRANCH = {
    PAGINATION: `${this.baseUrl}/Branches/list`,
    DETAIL: `${this.baseUrl}/Branches/detail`,
    CREATE: `${this.baseUrl}/Branches/create`,
    UPDATE: `${this.baseUrl}/Branches/update`,
    ACTIVATE: `${this.baseUrl}/Branches/activate`,
    DEACTIVATE: `${this.baseUrl}/Branches/deactivate`,
    SELECT_BOX: `${this.baseUrl}/Branches/select-box`,
  };

  ACTION_LOG = {
    BASE: `${this.baseUrl}/action-logs`,
  };
}
