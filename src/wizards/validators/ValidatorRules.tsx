import { hasUpperCase, hasLowerCase, longerThan, dateAfter } from '../../utils/Utils';

export interface ValidatorRule {
  test: (value: any, expected?: any) => boolean;
  message: string;
}

export const noUpperCase: ValidatorRule = {
  test: (value: string) => {
    return !hasUpperCase(value);
  },
  message: 'Upper case characters are forbidden'
};

export const noLowerCase: ValidatorRule = {
  test: (value: string) => {
    return hasLowerCase(value);
  },
  message: 'Lower case characters are forbidden'
};

export const hasLengthGreaterThan10: ValidatorRule = {
  test: (value: string) => {
    return !longerThan(value, 10);
  },
  message: 'Has to be shorter than 10 :)'
};

export const dateIsAfterToday: ValidatorRule = {
  test: (value: Date) => {
    return dateAfter(value, new Date())
  },
  message: 'Selected date has to be higher than today\'s date'
}