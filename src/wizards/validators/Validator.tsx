import React from 'react'

import { ValidatorRule } from './ValidatorRules'

export interface ValidatorError {
    name: string,
    message: string
}

interface ValidatorInterface {
    rules: ValidatorRule[],
    test(input: any): ValidatorError[]
}

export class Validator implements ValidatorInterface {

    rules: ValidatorRule[]

    constructor(rules: ValidatorRule[]) {
        this.rules = rules;
    }

    addRule(rule: ValidatorRule) {
        this.rules = [
            ...this.rules,
            rule
        ]
    }
    
    test(input: any): ValidatorError[] {
        let errorList: ValidatorError[] = []

        this.rules.forEach((rule) => {
            if(!rule.test(input)) {
                errorList.push(this.getValidatorError(rule))
            }
        })

        return errorList
    }

    private getValidatorError(rule: ValidatorRule): ValidatorError {
        return {
            name: "Iks de",
            message: rule.message
        } as ValidatorError
    }
}