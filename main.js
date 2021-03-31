// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate () {
      // creates a new dna base
      let dnaBase = returnRandBase();
      // creates a random index for the dna array 
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      // keeps creating a new dna base if the random index value is the same as the new dna base
      while (this.dna[randomIndex] === dnaBase) {
        dnaBase = returnRandBase();
      };
      // assigns the new dna base to the random index value inside the dna array and returns the array
      this.dna[randomIndex] = dnaBase;
      return this.dna;
    },
    compareDNA (specimen2) {
      // Counts how many matches there are 
      let baseMatch = 0;
      // Loop thru both arrays and check if any bases match, if they do then increment baseMatch by 1 
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === specimen2.dna[i]) {
          baseMatch += 1;
        }
      };
      // Get the percentage of matches to the second decimal point 
      let percentage = baseMatch / 15 * 100;
      percentage = percentage.toFixed(2);
      // Return a string of the compared DNA 
      return `specimen ${this.specimenNum} & specimen ${specimen2.specimenNum} have ${percentage}% DNA in common`;
      },
      willLikelySurvive () {
        // Count how many bases are either 'C' or 'G'
        let countCG = 0;
        for (i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === 'C' || this.dna[i] === 'G') {
            countCG += 1;
          };
        };
        // Get the percentage of countCG
        const survivalPercentage = countCG / 15 * 100;
        if (survivalPercentage >= 60) {
          return true;
        } else {
          return false;
        };
      },
  };
};

// Create 30 specimens that can survive and store them in an array
let toughSpecimens = [];
let specimenNumber = 1;

while (toughSpecimens.length < 30) {
  let newSpecimen = pAequorFactory(specimenNumber, mockUpStrand());
  if (newSpecimen.willLikelySurvive()) {
    toughSpecimens.push(newSpecimen);
  };
  specimenNumber++;
};

console.log(toughSpecimens);




// Test the code throughout 

// Test .mutate() Method
const specimen = pAequorFactory('tester1', mockUpStrand());
console.log(specimen);
specimen.mutate(); 
console.log(specimen);

// Test .compareDNA() Method
const specimen2 = pAequorFactory('tester2', mockUpStrand());
console.log(specimen2);
console.log(specimen.compareDNA(specimen2));

// Test willLikelySurvive() Method
console.log(specimen.willLikelySurvive());
console.log(specimen2.willLikelySurvive());











