import {IsUnkownDrugFact, DayElapsedFact, IsExpiredFact} from '../common-facts';
import {createUpdateBenefitEvent, createIncreaseExpiryEvent} from '../utils';

// If day elapsed for any drug other than Magic Pill, degrade benefit 1x
const DefaultDayElapsedRule = {
    conditions: {
        all: [
            DayElapsedFact,
            {
                fact: 'name',
                operator: 'notIn',
                value: ['Magic Pill']
            }
        ]
    },
    event: createIncreaseExpiryEvent()
};

const DefaultDayElapsedBenefitRule = {
    conditions: {
        all: [
            DayElapsedFact,
            {
                fact: 'name',
                operator: 'notIn',
                value: ['Magic Pill', 'Herbal Tea', 'Fervex', 'Dafalgan']
            }
        ]
    },
    event: createUpdateBenefitEvent(-1)
};

// Once the expiration date has passed, Benefit degrades twice as fast.
const DefaultExpirationRule = {
    conditions: {
        all: [
            IsUnkownDrugFact,
            IsExpiredFact,
        ]
    },
    event: createUpdateBenefitEvent(-2)
};

const defaultRules = [
    DefaultDayElapsedRule,
    DefaultExpirationRule,
    DefaultDayElapsedBenefitRule
];

export default defaultRules;