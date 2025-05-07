import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const setupSwagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Sistema de Inteligência Operacional')
    .setDescription(
      'Documentação gerada para o Sistema de Inteligência Operacional',
    )
    .setVersion('1.0')
    .addTag('Manager', 'Rotas')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${process.env.ROOT_PATH}/docs`, app, document);
};

export default setupSwagger;
