import { User$Model } from '@app/_common';
import { Transformer } from '@libs/core';

export class AuthTransformer extends Transformer {
  
  async transform(user: any): Promise<any> {
    return {
      id: user.uuid,
      role: user.role,
      status: user.status,
      email: user.email,
      name: user.name
    };
  }
}
