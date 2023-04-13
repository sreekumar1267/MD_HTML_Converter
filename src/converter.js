const HEADER = 'header';
const PARAGRAPH = 'paragraph';
const LINK = 'link';

const conversionMap = {
						[HEADER]: createHeaderTag,
						[PARAGRAPH]: createParagraphTag
					};

const inlineConversionMap = {
								[LINK]: createLinkTags
						    }; 
							
function getHtmlText(inputValue){
	inputValue = inputValue.trim();
	console.log('Printing conversion map:', conversionMap);
	if(inputValue.length === 0) {
		console.log('No input detected!!');
		return '';
	};
	console.log('inputValue:', inputValue);
	let resultHtml = '';
	let srcArr = inputValue.replace(/^\s+|\r|\s+$/g, '').split(/\n\n+/);
	console.log('srcArr:',srcArr);
	srcArr.forEach(function(lineItem, index){
		let lineStr = lineItem.trim();
		//console.log('line#',index);
		//console.log('Conversion map resolving line:', conversionMap[resolveLineToTag(lineStr)]);
		resultHtml = resultHtml + conversionMap[resolveLineToTag(lineStr)](lineStr) + '\n'; 
	});
	return resultHtml;
}


//in this example, we are resolving only Header and Paragraphs in new line
function resolveLineToTag(lineStr){
	let returnStr = '';
	if(isValidHeader(lineStr)) returnStr = HEADER;
	else returnStr = PARAGRAPH;
	console.log('resolveLineToTag function returning:', returnStr);
	return returnStr;
}

//checks if the line starts with # and contains only #'s until the first space
//if not treat it like a paragraph
function isValidHeader(lineStr){
	let startChar = lineStr[0];
	console.log('startChar:', startChar);
	let isValid = false;
	if(startChar === '#')
	{
		let headerNumStr = lineStr.substring(0, lineStr.indexOf(' '));
		let isCorrect = new RegExp("^[s\#]+$").test(headerNumStr);
		if(isCorrect)isValid = true;
	}
	return isValid;
}

function createParagraphTag(lineStr){
	return '<p>' +resolveInlineTags(lineStr)+ '</p>' ;
}

function createHeaderTag(lineStr){
	let headIndex = lineStr.indexOf(' ');
	let headerNumber = headIndex > 6 ? 6 : headIndex;
	console.log('headerNumber:', headerNumber);
	let headerStr = lineStr.substring(headIndex+1, lineStr.length);
	console.log('headerStr:', headerStr);
	return '<h'+headerNumber+'>' + resolveInlineTags(headerStr) + '</h'+headerNumber+'>'
}

//For now, this function checks for only links and converts it
function resolveInlineTags(lineStr){
	let returnStr = lineStr;
	Object.values(inlineConversionMap).forEach( createFns => {
		returnStr = createFns(lineStr);
	});	
	console.log('resolveInlineTags returnStr:', returnStr);
	return returnStr;
}

function createLinkTags(lineStr){
	return lineStr.replace(/\[([^\]]+)]\(([^(]+?)\)/g, '$1'.link('$2')) ;
}
module.exports = {
  getHtmlText,
};