chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
	// console.log('something happening from the extension');

	replaceTextOnPage();

		function replaceTextOnPage(){
		  	getAllTextNodes().forEach(function(node){
						if (
							node.nodeValue.toLowerCase().includes("racially charged") ||
							node.nodeValue.toLowerCase().includes("racially-charged") ||
							node.nodeValue.toLowerCase().includes("racially tinged") ||
							node.nodeValue.toLowerCase().includes("racially-tinged")
						)
			  	{
						// replace and match case
						node.nodeValue = node.nodeValue.replace(/racially charged|racially-charged|racially tinged|racially-tinged/,'racist');
						node.nodeValue = node.nodeValue.replace(/Racially Charged|Racially-Charged| Racially charged| Racially-charged |Racially Tinged|Racially-Tinged| Racially tinged| Racially-tinged/,'Racist');
						// issue is that when there is more than one mention of the above phrase in a text node, 
						// attempt1: if there's a way to check whether or not the nodevalue includes the requested term, i could wrap the above in a thing that repeats, so while node.nodevalue includes Blah, run this replace code. when it returns false, move on to the styling code.

						// need to make a promise in order to have the access to .then()

					
					// make and attach new text node structure with additional styled span
					var index1 = (node.nodeValue.indexOf("racist") !== -1) ? node.nodeValue.indexOf("racist") : node.nodeValue.indexOf("Racist");
					//issue is this catches "racist" mentions that pre-exist the newly replaced one. 
					//solution: made initial change racist*, so that second comb catches only recently changed ones
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

		}

	sendResponse({data:{}, success:true});

})