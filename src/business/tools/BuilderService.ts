import { Injectable } from '@nestjs/common';
import { RequestInterceptors, ServiceBuilder } from 'retrofit-axios-ts';

@Injectable()
export default class BuilderService {
  getBuilder<T>(
    service: (new (builder: ServiceBuilder) => T) & { basePath?: string },
    requestInterceptors: RequestInterceptors,
  ): T {
    const { basePath } = service;

    if (basePath === undefined) {
      console.warn(
        `${service.name} must have a static variable called basePath for setting up your base path`,
      );
    }
    /* const requestInterceptors = new RequestInterceptors();
    const responseInterceptors = new ResponseInterceptors(); */

    const itemService = new ServiceBuilder()
      .setRequestInterceptors(requestInterceptors)
      .setEndpoint(`${basePath}`)
      .setStandalone(true)
      .build(service);

    return itemService;
  }
}
