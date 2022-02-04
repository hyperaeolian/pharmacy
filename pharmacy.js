import {RulesEngine} from './rules-engine'

import {Actions} from './rule-definitions/constants';
import {rules} from './rule-definitions/drug-rules/rules';

const MaxBenefit = 50;

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
    this.engine = new RulesEngine(rules);
  }

  updateBenefitValue() {
    const engine = new RulesEngine(rules);
    this.drugs.forEach(drug => {
      const events = engine.evaluate({...drug, dayElapsed: true});
      this.applyEventActionsToDrug(drug, events);
    })
    return this.drugs;
  }

  getUpdatedBenefitValue(benefit, factor = 0) {
    if (!factor) {
      return benefit;
    }
    const updatedBenefit = benefit + factor;
    if (updatedBenefit > MaxBenefit) {
      return MaxBenefit;
    }
    if (updatedBenefit < 0) {
      return 0;
    }
    return updatedBenefit;
  }

  applyEventActionsToDrug(drug, events) {
    events.forEach(event => {
      const factor = event.params && event.params.factor;
      switch (event.type) {
        case Actions.SetBenefit:
          drug.benefit = this.getUpdatedBenefitValue(event.params.newValue, 0);
          break;
        case Actions.UpdateBenefit:
          drug.benefit = this.getUpdatedBenefitValue(drug.benefit, factor);
          break;
        case Actions.DecreaseExpiration: {
          const willExpire = drug.expiresIn === 0;
          if (willExpire) {
            drug.expiresIn -= 1;
            this.engine.on('expired', drug);
          } else {
            drug.expiresIn -= 1;
          }
          break;
        }
        case Actions.NOOP:
          break;
        default:
          console.error('Cannot handle action type', event.type);
      }
    })
    return drug;
  }
}
