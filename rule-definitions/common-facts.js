export const IsExpiredFact = {
    fact: 'expiresIn',
    operator: 'lessThan',
    value: 0
};
export const DayElapsedFact = {
    fact: 'dayElapsed',
    operator: 'equal',
    value: true
};
export const ExpiresInLTE10DaysFact = {
    fact: 'expiresIn',
    operator: 'lessThanInclusive',
    value: 10,
};
export const ExpiresInGT5DaysFact = {
    fact: 'expiresIn',
    operator: 'greaterThan',
    value: 5,
};
export const ExpiresInLTE5DaysFact = {
    fact: 'expiresIn',
    operator: 'lessThanInclusive',
    value: 5,
};
export const ExpiresInGT0DaysFact = {
    fact: 'expiresIn',
    operator: 'greaterThanInclusive',
    value: 0,
};
export const IsUnkownDrugFact = {
    fact: 'name',
    operator: 'notIn',
    value: ['Magic Pill', 'Fervex', 'Herbal Tea']
};