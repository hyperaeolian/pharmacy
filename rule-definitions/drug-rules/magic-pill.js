import {Actions} from '../constants';
import {DayElapsedFact} from '../common-facts';

// is Magic Pill drug
const MagicPillFact = {
    fact: 'name',
    operator: 'equal',
    value: 'Magic Pill',
}

// If day elapsed for Magic Pill, do nothing
const MagicPillExpiredRule = {
    conditions: {
        all: [MagicPillFact, DayElapsedFact]
    },
    event: {
        type: Actions.NOOP,
    }
};
const magicPillRules = [
    MagicPillExpiredRule
]

export default magicPillRules;