import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  constructor() {}

  extractKeyFromAuthHeader(authHeader: string): string {
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    return authHeader;
  }
}
