import {createUpdateBenefitEvent} from '../utils';
import {
    DayElapsedFact,
    IsExpiredFact
} from '../common-facts';

// is 'Herbal Tea' drug
const IsHerbalTeaFact = {
    fact: 'name',
    operator: 'equal',
    value: 'Herbal Tea',
};

// if herbal tea is expired, benefit increases 2x
const HerbalTeaExpiredRule = {
    conditions: {
        all: [IsHerbalTeaFact, IsExpiredFact]
    },
    event: createUpdateBenefitEvent(2)
};

// herbal tea increases as it nears expiration
const HerbalTeaBenefitRule = {
    conditions: {
        all: [IsHerbalTeaFact, DayElapsedFact]
    },
    event: createUpdateBenefitEvent(1)
};
const herbalTeaRules = [
    HerbalTeaBenefitRule,
    HerbalTeaExpiredRule,
];

export default herbalTeaRules;