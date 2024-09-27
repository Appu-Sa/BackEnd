import { NotFoundException } from '@nestjs/common';

export class MenuNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Menu with id ${id} not found`);
  }
}