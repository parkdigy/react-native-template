import { Api, type ApiOption } from '@pdg/api';
import defaultOption from './defaultOption';

export function createApi<T>(option: Partial<ApiOption>) {
  return new Api<T>({ ...defaultOption, ...option });
}

export default createApi;
