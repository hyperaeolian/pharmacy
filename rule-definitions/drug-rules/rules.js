import FervexRules from './fervex';
import HerbalTeaRules from './herbal-tea';
import MagicPillRules from './magic-pill';
import DafalganRules from './dafalgan';
import DefaultRules from './defaults';

export const rules = [
    ...FervexRules,
    ...HerbalTeaRules,
    ...MagicPillRules,
    ...DefaultRules,
    ...DafalganRules,
];
