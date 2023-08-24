import { Injectable } from '@nestjs/common';
import * as deepl from 'deepl-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TranslateService {
  constructor(private configService: ConfigService) {}

  translator = new deepl.Translator(
    this.configService.get<string>('DEEPL_API_KEY'),
  );
}
