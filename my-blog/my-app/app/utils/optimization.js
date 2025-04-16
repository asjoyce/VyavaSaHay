// Simplex & Integer Programming core logic

export function solveSimplex(land, budget, water, soil) {
  const crops = {
    wheat: { profit: 2000, water: 1000, cost: 5000 },
    rice: { profit: 3000, water: 1500, cost: 8000 },
    maize: { profit: 2500, water: 800, cost: 6000 },
  };

  let steps = [];
  let maxProfit = 0;
  let suggestion = {};

  for (let w = 0; w <= land; w++) {
    for (let r = 0; r <= land - w; r++) {
      let m = land - w - r;
      let totalCost = crops.wheat.cost * w + crops.rice.cost * r + crops.maize.cost * m;
      let totalWater = crops.wheat.water * w + crops.rice.water * r + crops.maize.water * m;
      let totalProfit = crops.wheat.profit * w + crops.rice.profit * r + crops.maize.profit * m;

      steps.push({
        wheat: w, rice: r, maize: m,
        cost: totalCost, water: totalWater, profit: totalProfit
      });

      if (totalCost <= budget && totalWater <= water && totalProfit > maxProfit) {
        maxProfit = totalProfit;
        suggestion = { wheat: w, rice: r, maize: m, profit: totalProfit };
      }
    }
  }

  return { steps, suggestion };
}

export function solveIntegerProgram(solution) {
  return {
    ...solution,
    wheat: Math.floor(solution.wheat),
    rice: Math.floor(solution.rice),
    maize: Math.floor(solution.maize),
  };
}
