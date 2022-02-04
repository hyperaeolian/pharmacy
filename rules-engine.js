/** Class that evaluates a set of rules for a target fact */
export class RulesEngine {
    /**
     * Create a rules engine
     * @param {Array<{conditions: Fact[], event: {type:Action}}>} rules - The set of rules to evaluate
    */
    constructor(rules){
        this.rules = rules;
    }

    /**
     * Evaluate the rules for the target fact
     * @param {Fact<{fact:string,operator:Operator,value:string}>} The target value to evaluate rules for
    */
    evaluate(target){
        const events = [];
        this.rules.forEach(rule => {
            if (rule.conditions["all"]) {
                const factSatisfiesRule = rule.conditions["all"].every(c => {
                    return this.evaluateCondition(target, c);
                });
                if (factSatisfiesRule) {
                    events.push(rule.event);
                }
            }
        });
        return events;
    }

    evaluateCondition(target, condition){
        const {fact, operator, value} = condition;
        if (target[fact] == null) {
            throw new Error('Target does not contain fact: ', target, fact);
        }
        switch(operator){
            case "lessThan":
                return target[fact] < value;
            case "lessThanInclusive":
                return target[fact] <= value;
            case "equal":
                return target[fact] === value;
            case "greaterThan":
                return target[fact] > value;
            case "greaterThanInclusive":
                return target[fact] >= value;
            case "notIn":
                return !value.includes(target[fact]);
            default:
                throw new Error("Unsupported operator: ", operator);
        }
    }

    on(event, drug) {
        switch (event) {
            case 'expired':
                if (drug.name === 'Herbal Tea') {
                    drug.benefit += 1;
                }
                break;
            default:
                throw new Error('Undefined event', event);
        }
    }
}