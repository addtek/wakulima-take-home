import {createContext} from 'react';
import {
  defaultContext,
  MonitoringProviderContext,
} from './monitoring.context.types';

export const MonitoringContext =
  createContext<MonitoringProviderContext>(defaultContext);
