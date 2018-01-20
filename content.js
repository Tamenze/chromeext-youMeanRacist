chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
	console.log('something happening from the extension');

	replaceTextOnPage();

		function replaceTextOnPage(){
		  	getAllTextNodes().forEach(function(node){
			  	if (node.nodeValue.toLowerCase().includes("racially charged") || 
			  		node.nodeValue.includes("racially-charged"))
			  	{
			  		//replace and match case
			  		node.nodeValue = node.nodeValue.replace(/racially charged|racially-charged/,'racist');
			  		node.nodeValue = node.nodeValue.replace(/Racially Charged|Racially-Charged| Racially charged| Racially-charged/,'Racist');
					
					//make and attach new text node structure with additional styled span
					var index1 = (node.nodeValue.indexOf("racist") !== -1) ? node.nodeValue.indexOf("racist") : node.nodeValue.indexOf("Racist")
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