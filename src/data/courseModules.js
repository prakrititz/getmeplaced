import { osModules } from './osModules';
import { dbmsModules } from './dbmsModules';
import { oopsModules } from './oopsModules';

export const courseModules = [...osModules, ...dbmsModules, ...oopsModules];
