import {createContext} from 'react';
import {defaultContext, FarmProviderContext} from './farm.context.types';

export const FarmContext = createContext<FarmProviderContext>(defaultContext);
