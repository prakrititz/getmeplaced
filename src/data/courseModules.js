import { osModules } from './osModules';
import { dbmsModules } from './dbmsModules';
import { oopsModules } from './oopsModules';
import { cnModules } from './cnModules';

export const courseModules = [...osModules, ...dbmsModules, ...oopsModules, ...cnModules];
