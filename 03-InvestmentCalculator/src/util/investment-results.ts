export function calculateInvestmentResults({
  initialInvestment,
           duration,
     expectedReturn,
   annualInvestment,
}: {
  initialInvestment: number;
           duration: number;
     expectedReturn: number;
   annualInvestment: number;
}) {
  const annualData = [];
  let valueEndOfYear = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const          year = i + 1;
    const      interest = valueEndOfYear * (expectedReturn / 100);
        valueEndOfYear += interest + annualInvestment;
    const totalInterest = valueEndOfYear - annualInvestment * year - initialInvestment;

    annualData.push({
                     year,
                 interest,
           valueEndOfYear,
         annualInvestment,
            totalInterest,
      totalAmountInvested: initialInvestment + annualInvestment * year,
    });
  }

  return annualData;
}
