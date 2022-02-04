import {
    createSetBenefitEvent,
    createUpdateBenefitEvent
} from '../utils';
import {
    IsExpiredFact,
    ExpiresInLTE10DaysFact,
    ExpiresInGT5DaysFact,
    ExpiresInLTE5DaysFact,
    ExpiresInGT0DaysFact
} from '../common-facts';

// is 'Fervex' drug
const IsFervexFact = {
    fact: 'name',
    operator: 'equal',
    value: 'Fervex',
};

// if Fervex is expired, zero out benefit
const ExpiredRule = {
    conditions: {
        all: [IsFervexFact, IsExpiredFact]
    },
    event: createSetBenefitEvent(0)
};


// If Fervex expires in 10 days, increase benefit 2x daily
const ExpiresIn10Rule = {
    conditions: {
        all: [
            IsFervexFact,
            ExpiresInLTE10DaysFact,
            ExpiresInGT5DaysFact
        ]
    },
    event: createUpdateBenefitEvent(2)
};

// If Fervex expires in 5 days, increase benefit 3x daily
const ExpiresIn5Rule = {
    conditions: {
        all: [
            IsFervexFact,
            ExpiresInLTE5DaysFact,
            ExpiresInGT0DaysFact,
        ]
    },
    event: createUpdateBenefitEvent(3)
};


const fervexRules = [
    ExpiredRule,
    ExpiresIn10Rule,
    ExpiresIn5Rule
];

export default fervexRules;