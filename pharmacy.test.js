import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });

  it("does not lower expiresIn or benefit for Magic Pill each day", () => {
      expect(new Pharmacy([new Drug("Magic Pill", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Magic Pill", 2, 3)]
    );
  });

  it("does not increase benefit pass 50", () => {
    const herbalTea = new Drug("Herbal Tea", 15, 50);
    const pharmacy = new Pharmacy([herbalTea]);

    const updatedBenefits = pharmacy.updateBenefitValue();

    expect(updatedBenefits).toEqual([
      new Drug("Herbal Tea", 14, 50),
    ]);
  })

  it("does not decrease benefit below 0", () => {
    expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 0)]
    );
  })

  describe("Herbal Tea", () => {
    it("should increase benefit 1x", () => {
      const herbalTea = new Drug("Herbal Tea", 15, 5);
      const pharmacy = new Pharmacy([herbalTea]);

      const updatedBenefits = pharmacy.updateBenefitValue();

      expect(updatedBenefits).toEqual([
        new Drug("Herbal Tea", 14, 6),
      ]);
    });
    it("should increase benefit 2x after expiration date", () => {
      const herbalTea = new Drug("Herbal Tea", 0, 5);
      const pharmacy = new Pharmacy([herbalTea]);

      const updatedBenefits = pharmacy.updateBenefitValue();

      expect(updatedBenefits).toEqual([
        new Drug("Herbal Tea", -1, 7),
      ]);
    })
  });

  describe("Fervex", () => {
    it("should increase benefit 2x when expiration 10 days or less", () => {
      const fervex = new Drug("Fervex", 9, 5);
      const pharmacy = new Pharmacy([fervex]);

      const updatedBenefits = pharmacy.updateBenefitValue();

      expect(updatedBenefits).toEqual([
        new Drug("Fervex", 8, 7),
      ]);
    });
    it("should increase benefit 3x when expiration 5 days or less", () => {
      const fervex = new Drug("Fervex", 4, 5);
      const pharmacy = new Pharmacy([fervex]);

      const updatedBenefits = pharmacy.updateBenefitValue();

      expect(updatedBenefits).toEqual([
        new Drug("Fervex", 3, 8),
      ]);
    });
    it("should drop benefit to 0 after expiration date", () => {
      const fervex = new Drug("Fervex", -1, 5);
      const pharmacy = new Pharmacy([fervex]);

      const updatedBenefits = pharmacy.updateBenefitValue();

      expect(updatedBenefits).toEqual([
        new Drug("Fervex", -2, 0),
      ]);
    });
  });

  describe("Dafalgan", () => {
    it("should lower benefit 2x at the end of each day", () => {
      const dafalgan = new Drug("Dafalgan", 10, 5);
      const pharmacy = new Pharmacy([dafalgan]);

      const updatedBenefits = pharmacy.updateBenefitValue();

      expect(updatedBenefits).toEqual([
        new Drug("Dafalgan", 9, 3),
      ]);
    })
  })
});
