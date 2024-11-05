// something like greedy algorithm but without recursion

function algorithm(cutList,maxCutLength,materialLoss)
{
    var cutListLength=cutList.length;
    var tempMem = [];
    var tempMemLength;
    var patternList = [];
    var i,j,sum,k = 0;
    var sumArray = [];

    for(i=0;i<cutListLength;i++)
    {
        k=0;
        j=0;
        while(j<cutList[i].amount)
        {
            if(sumArray[k]==null)
            {
                sumArray[k]=0;
            }

            if(sumArray[k]+cutList[i].length<=maxCutLength)
            {
                patternList[k] = Array.prototype.concat(patternList[k],cutList[i].length);

                if(patternList[k][0]==null)
                    patternList[k].shift();
                
                sumArray[k]=sumArray[k]+cutList[i].length+materialLoss;
                j++;
            }
            else{
                k++;
            }
        }

    }
    printResults(cutList,patternList,maxCutLength);
    
    function Counter(array) {
        var count = {};
        array.forEach(val => count[val] = (count[val] || 0) + 1);
        return count;
    }
    
    function printResults(myCutList,myFinalList,myMaxCutLength)
    {
        let patternCountMap = new Map();
        patternList.forEach((pattern) => {
            let patternStr = pattern.join(',');
            let patternCount = patternCountMap.get(patternStr);
            if (patternCount != null) {
                patternCountMap.set(patternStr, patternCount + 1);
            }
            else {
                patternCountMap.set(patternStr, 1);
            }
        });

        var myCutListLength = myCutList.length;
        var myFinalListLength = myFinalList.length;
        var cutListSumCheck = 0;
        var finalListSumCheck = 0;
        var testCutListString =""
        
        var cutListString ="\n";
        for(let i=0;i<myCutListLength;i++)
        {
            cutListString = cutListString + "" + myCutList[i].length +" x " + myCutList[i].amount +" pcs.\n";
            cutListSumCheck = cutListSumCheck + myCutList[i].length * myCutList[i].amount;
            
            
            for(let j=0;j<myCutList[i].amount;j++)
            {
                testCutListString=testCutListString+myCutList[i].length+",";
            }
        }

        //testCutListString = testCutListString.substring(0, testCutListString.length - 1);
        
        var patternWaste = 0;
        var patternLength = 0;
        var allPatternsWaste = 0;
        var allPatternsLength = 0;
        var percentageWaste;
        
        var cutNo = 0;
        var finalListString ="";
        
        // for(let i=0;i<myFinalListLength;i++)
        // {
        //     cutNo++
        //     var singlePatternString ="";
        //     patternWaste = 0;
        //     patternLength = 0;
        //     for(let j=0;j<Object.keys(myFinalList[i]).length;j++)
        //     {
        //         patternLength = patternLength + myFinalList[i][j]
        //         singlePatternString=singlePatternString+""+myFinalList[i][j]+", ";
        //         finalListSumCheck = finalListSumCheck + myFinalList[i][j];
                
        //     }
        //     patternWaste = myMaxCutLength - patternLength;
        //     allPatternsWaste = allPatternsWaste + patternWaste;
        //     allPatternsLength = allPatternsLength + patternLength;
            

        //     if(i<9){cutNo="0"+cutNo}else{cutNo=i+1};
            
        //     finalListString = finalListString +"\n"+ cutNo+") "+singlePatternString+" = " +patternLength+ ": waste = " +patternWaste+";";
        // }

        let patternNo = 0;
        for (let [pattern, count] of patternCountMap) {
            let patternArr = pattern.split(',').map(Number);
            let patternLength = patternArr.reduce((partialSum, a) => partialSum + a, 0);
            let totalMaterialLoss = materialLoss * (patternArr.length - 1)

            patternWaste = myMaxCutLength - patternLength - totalMaterialLoss;
            totalPatternWaste = patternWaste * count;
            allPatternsWaste = allPatternsWaste + totalPatternWaste;
            allPatternsLength = allPatternsLength + (patternLength * count);

            let patternCounter = Counter(patternArr);
            console.log(patternCounter);
            let patternCounterStrArr = [];
            Object.keys(patternCounter).forEach((cutLength) => {
                patternCounterStrArr.push(`${cutLength}: ${patternCounter[cutLength]}`);
            })

            patternNo++;
            finalListString = finalListString +"\n"+ patternNo+") "+
                patternCounterStrArr.join(', ')
                +" = " +count+ 
                " (Sisa = " +patternWaste
                // +". Total waste = "+totalPatternWaste
                +")";
        }

        var percentageWaste = allPatternsWaste / allPatternsLength * 100;
        // if(cutNo<=9){cutNo=cutNo.substring(1,cutNo.length);};
        var endingString='\n\n'
            + 'Total profil: '+myFinalListLength+' pcs.' 
            + '\nTotal waste: '+allPatternsWaste+' ('+parseFloat(percentageWaste).toPrecision(4)+'%)';
    
        var resultString = 'Panjang bahan potong:'+myMaxCutLength+
            // '\n\nOrder:'+cutListString+
            // '\nMaterial loss per cut is not counted!\n'+
            '\n\nCutting List:'+finalListString+endingString;
        
        $("#results-area").val(resultString);	
            
    }
    
    return;
}