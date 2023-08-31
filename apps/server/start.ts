import 'reflect-metadata';
import { Container } from 'typedi';
import Application from './application';

const isDevelopment = process.env.NODE_ENV === 'development';

const app = Container.get(Application)

if (isDevelopment) {
  app.startDev();
} else {
  app.start();
}

