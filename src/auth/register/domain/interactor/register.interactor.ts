import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterInteractor {
  async invoke(request: RegisterInteractor): Promise<void> {
    console.dir(request);
  }
}
