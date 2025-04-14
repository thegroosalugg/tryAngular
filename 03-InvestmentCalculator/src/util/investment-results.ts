const roundTwo = (n: number) => +(n.toFixed(2));

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
    const year          = i + 1;
    const interest      = roundTwo(valueEndOfYear * (expectedReturn / 100));
    valueEndOfYear      = roundTwo(valueEndOfYear + interest + annualInvestment);
    const totalInterest = roundTwo(
      valueEndOfYear - annualInvestment * year - initialInvestment
    );
    const totalAmountInvested = roundTwo(
      initialInvestment + annualInvestment * year
    );

    annualData.push({
                     year,
                 interest,
           valueEndOfYear,
         annualInvestment,
            totalInterest,
      totalAmountInvested,
    });
  }

  return annualData;
}
