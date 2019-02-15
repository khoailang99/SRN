var process = ['P1', 'P2', 'P3', 'P4'], length = process.length;
var arrivalTime = [0, 3, 4, 6], cloneArrival = [0, 3, 4, 6];
var burstTime = [14, 10, 9, 7], cloneBurst = [14, 10, 9, 7];
var resultPro = [], timePro = [], performing = [];

var minArrival = Math.min.apply(null, arrivalTime);
for (let i = 0; i < length; i++) {
  if (arrivalTime[i] == minArrival) {
    resultPro.push(process[i]);
    timePro.push(minArrival);
    performing.push(process[i]);
    arrivalTime[i] = Infinity;
  }
}

let k = 0;
while (k < 3) {
  let min = Math.min.apply(null, arrivalTime);
  let minLength = min - timePro[timePro.length - 1];
  // console.log(arrivalTime)
  for (let i = 0; i < length; i++) {
    if (arrivalTime[i] == min) {
      for (let j = 0; j < length; j++) {
        // console.log(performing[performing.length - 1])
        if (performing[performing.length - 1] == process[j]) {
          // if(minLength <= burstTime[j]){
          burstTime[j] -= minLength;
          timePro.push(timePro[timePro.length - 1] + minLength);
          if (burstTime[i] < burstTime[j]) {
            resultPro.push(process[i]);
            performing.push(process[i]);
          } else {
            let min = Infinity;
            if (burstTime[j] != 0) {
              resultPro.push(process[j]);
            }
            for (let j = 0; j < length; j++) {
              if (burstTime[j] != 0 && burstTime[j] < min && burstTime[j] != cloneBurst[j]) {
                min = burstTime[j];
              }
            }
            for (let l = 0; l < length; l++) {
              if (burstTime[l] == min) {
                performing.push(process[l]);
                break;
                // resultPro.push(process[l]);
              }
            }
          }
          // }else{
          // }
          break;
        }
      }
      arrivalTime[i] = Infinity;
    }
  }
  ++k;
}
let count = 0;
// resultPro.splice(resultPro.length-1,1);

for(let i = 0; i < length; i++){
  if(resultPro[resultPro.length-1] == process[i]){
    timePro.push(timePro[timePro.length-1] + burstTime[i]);
    burstTime[i] = Infinity;
  }
  else{ ++count;}
}
for(let i = 0; i < count; i++){
  let min = Math.min.apply(null,burstTime);
  for(let j = 0; j < length; j++){
    if(min == burstTime[j]){
      resultPro.push(process[j]);
      timePro.push(timePro[timePro.length-1]+burstTime[j]);
      burstTime[j] = Infinity;
    }
  }
}
let sumWait = 0, sumSave = 0;
for(let i = 0; i < length; i++){
  let posi = resultPro.lastIndexOf(process[i]);
  sumWait += timePro[posi+1] - cloneArrival[i] - cloneBurst[i];
  sumSave += timePro[posi+1] - cloneArrival[i];
}

console.log(resultPro);
console.log(resultPro.length);
console.log(timePro);
console.log(timePro.length);
console.log('Chờ: ' + sumWait/length);
console.log('Lưu: ' + sumSave/length);