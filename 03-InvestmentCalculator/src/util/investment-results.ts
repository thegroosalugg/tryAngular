// const = (n: number) => +(n.toFixed(2));

export type Investment = {
            year: number;
        interest: number;
  valueEndOfYear: number;
   totalInterest: number;
   totalInvested: number;
};

export function calculateInvestment({
  initialInvestment,
           duration,
     expectedReturn,
   annualInvestment,
}: {
  initialInvestment: number;
           duration: number;
     expectedReturn: number;
   annualInvestment: number;
}): Investment[] {
  const annualData = [];
  let valueEndOfYear = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const year          = i + 1;
    const interest      = valueEndOfYear * (expectedReturn / 100);
    valueEndOfYear      = valueEndOfYear + interest + annualInvestment;
    const totalInterest =
      valueEndOfYear - annualInvestment * year - initialInvestment;
    const totalInvested = initialInvestment + annualInvestment * year;

    annualData.push({
                year,
            interest,
      valueEndOfYear,
       totalInterest,
       totalInvested,
    });
  }

  return annualData;
}
