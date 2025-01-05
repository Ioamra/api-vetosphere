import { SetMetadata } from '@nestjs/common';

export const IsConnected = () => SetMetadata('isConnected', true);
