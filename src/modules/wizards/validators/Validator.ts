import { ValidatorRule } from './ValidatorRules';

export interface ValidatorError {
  name: string;
  message: string;
}

interface ValidatorInterface {
  rules: ValidatorRule[];
  test(input: any): ValidatorError[];
}

export class Validator implements ValidatorInterface {
  rules: ValidatorRule[];

  constructor(rules: ValidatorRule[]) {
    this.rules = rules;
  }

  addRule(rule: ValidatorRule) {
    this.rules = [...this.rules, rule];
  }

  test(input: any): ValidatorError[] {
    const errorList: ValidatorError[] = [];

    this.rules.forEach(rule => {
      if (!rule.test(input)) {
        errorList.push(this.getValidatorError(rule));
      }
    });

    return errorList;
  }

  private getValidatorError(rule: ValidatorRule): ValidatorError {
    const error: ValidatorError = {
      name: 'Iks de',
      message: rule.message
    }

    return error
  }
}
