import { setWorldConstructor } from '@cucumber/cucumber';
import { MonetisWorld } from '../tests/monetis/steps/monetisWorld.js'

/**
 * @param {{ parameters: { app: any; }; }} options
 */
function DynamicWorld(options) {
  const paramApp = options?.parameters?.app;
  const app = paramApp || process.env.APP || 'monetis';

  if (app === 'monetis') {
    return new MonetisWorld();
  }
}

setWorldConstructor(DynamicWorld);