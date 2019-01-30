chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
	replaceTextOnPage();

		function replaceTextOnPage(){
		  	getAllTextNodes().forEach(function(node){
				if (
					node.nodeValue.toLowerCase().includes("racially charged") ||
					node.nodeValue.toLowerCase().includes("racially-charged") ||
					node.nodeValue.toLowerCase().includes("racially tinged") ||
					node.nodeValue.toLowerCase().includes("racially-tinged")
				){
					// replace and match case
					node.nodeValue = node.nodeValue.replace(/racially charged|racially-charged|racially tinged|racially-tinged/g,'racist*');
					node.nodeValue = node.nodeValue.replace(/Racially Charged|Racially-Charged|Racially charged| Racially-charged|Racially Tinged|Racially-Tinged|Racially tinged|Racially-tinged/g,'Racist*');


					// const nodeValueArray = node.nodeValue.split(" ");
					// console.log("node Value Array: ", nodeValueArray)
					// const mentionsArray = [];
					// for (var i = 0; i < nodeValueArray.length; i++){
					// 	if (nodeValueArray[i].includes("racist*")|| nodeValueArray[i].includes("Racist*")){
					// 		mentionsArray.push(i);
					// 	}
					// };
					// console.log("mentions Array :", mentionsArray);

					// node.nodeValue = node.nodeValue.replace(/racist\*/g, 'racist');
					// node.nodeValue = node.nodeValue.replace(/Racist\*/g, 'Racist');
					
					// for (var j = 0; j < mentionsArray.length; j++){
					// 	exposeRacists(mentionsArray[j], node);
					// }



					// make and attach new text node structure with additional styled span
					var index1 = (node.nodeValue.indexOf("racist*") !== -1) ? node.nodeValue.indexOf("racist*") : node.nodeValue.indexOf("Racist*");

					//parse through a string, log all indexes of a character
					//string.split(" ") --> returns array
					//if array[i] = "racist*" or "Racist*" --> store i in mentionsArray
					//make below into func that takes an index, pass in i for mentionsArray.length
					
					//this replaces the asterisk racist with an unasterisked version, ONLY after saving the index of the word. this makes it so the styling changes only get applied to the recently changed words and not pre-existing mentions of the word. 
					node.nodeValue = node.nodeValue.replace(/racist\*/g, 'racist');
					node.nodeValue = node.nodeValue.replace(/Racist\*/g, 'Racist');

					//issue: the styling only gets applied to the first instance of replaced term within a node, bc the indexOf method above only gets the first mention 

					//attempt1: get all the indexes of racist within within a node and store them in an arry
					//then iterate through the indexes and perform the below actions
					var index2 = index1 + 6;
					var parentNode = node.parentNode;
					
					var part1 = node.nodeValue.substring(0, index1);
					var part2 = node.nodeValue.substring(index1,index2);
					var part3 = node.nodeValue.substring(index2);

					var textNode1 = document.createTextNode(part1);
					parentNode.replaceChild(textNode1, node);


					var spanNode = document.createElement("span");
					parentNode.insertBefore(spanNode, textNode1.nextSibling);

					var textNode2 = document.createTextNode(part2);
					spanNode.appendChild(textNode2);
					textNode2.parentElement.style.color = "red";
					textNode2.parentElement.style.fontWeight = "bold";

					var textNode3 = document.createTextNode(part3);
					parentNode.insertBefore(textNode3, spanNode.nextSibling);	
					

			  	}

			  });

			function getAllTextNodes(){
				var result = [];

				(function scanSubTree(node){
				if(node.childNodes.length) 
					for(var i = 0; i < node.childNodes.length; i++) 
					scanSubTree(node.childNodes[i]);
				else if(node.nodeType == Node.TEXT_NODE) 
					result.push(node);
				})(document);

				console.log(result);
				return result;
			}

			// function exposeRacists(startIndex, node) {
			// 	console.log("node: ", node);
			// 	// console.log()
			// 	const endIndex = startIndex + 6;
			// 	const parentNode = node.parentNode;

			// 	const partA = node.nodeValue.substring(0, startIndex);
			// 	const partB = node.nodeValue.substring(startIndex, endIndex);
			// 	const partC = node.nodeValue.substring(endIndex);

			// 	const textNodeA = document.createTextNode(partA);
			// 	parentNode.replaceChild(textNodeA, node);
			// 	const spanNode = document.createElement("span");
			// 	parentNode.insertBefore(spanNode, textNodeA.nextSibling);

			// 	const textNodeB = document.createTextNode(partB);
			// 	spanNode.appendChild(textNodeB);
			// 	textNodeB.parentElement.style.color = "red";
			// 	textNodeB.parentElement.style.fontWeight = "bold";

			// 	const textNodeC = document.createTextNode(partC);
			// 	parentNode.insertBefore(textNodeC, spanNode.nextSibling);
			// }

		}

	sendResponse({data:{}, success:true});

})