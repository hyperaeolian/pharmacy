import {Actions} from "./constants";

export function createSetBenefitEvent(newBenefitValue) {
    return {
        type: Actions.SetBenefit,
        params: {
            newValue: newBenefitValue
        }
    };
}

export function createUpdateBenefitEvent(factor) {
    return {
        type: Actions.UpdateBenefit,
        params: {
            factor: factor
        }
    };
}

export function createIncreaseExpiryEvent() {
    return {
        type: Actions.DecreaseExpiration,
    }
}