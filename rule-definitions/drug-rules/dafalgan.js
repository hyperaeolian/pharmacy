import {DayElapsedFact} from '../common-facts';
import {createUpdateBenefitEvent} from '../utils';

// is Dafalgan drug
const DafalganFact = {
    fact: 'name',
    operator: 'equal',
    value: 'Dafalgan',
}

// If day elapsed for Magic Pill, do nothing
const DafalganBenefitRule = {
    conditions: {
        all: [DafalganFact, DayElapsedFact]
    },
    event: createUpdateBenefitEvent(-2)
};
const dafalganRules = [
    DafalganBenefitRule
]

export default dafalganRules;