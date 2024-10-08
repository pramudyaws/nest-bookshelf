import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function initializeSwagger(app: INestApplication<any>) {
    const apiVersion = '1.0'
    const config = new DocumentBuilder()
        .setTitle(`Nest Bookshelf API Documentation - V${apiVersion}`)
        .setDescription(`Created by Pramudya Wibisono`)
        .setVersion(apiVersion)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1', app, document);
}
