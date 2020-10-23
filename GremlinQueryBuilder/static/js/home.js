// variables
/**
 * basicCount -  g.V().has(property, value).count()
 * basicValue -  g.V().has(property, value).value()
 * basicValueSpecific  - g.V().has(property, value).value(properties)
 * 
 * valueMap - g.V().has(property, value).valueMap(options- properties)
 *  
 */


var vertexPropertyOptions = ["label", "code", "city", "country", "runaways"]
var edgePropertyOptions = ["label", "dist"]

const vertexPropertyNameOptions = {
    "label": ["all", "airport"],
    "code": ["all", "ATL", "ANC", "MSP", "SNA", "SJU", "OAK"],
    "city": ["all", "Atlanta", "Anchorage", "Minneapolis", "Santa Ana", "San Juan", "Oakland"],
    "country": ["all", "US", "PR"],
    "runaways": ["all", 2, 3, 4, 5]
}

const edgePropertyNameOptions = {
    "label": ["all", "route"],
    "dist": ["all", 370, 906,  910, 1522, 1550, 1578, 1910,  2124, 2519]
}

const contextMap = {
    "Count" : "count",
    "Values" : "values",
    "ValueMap" : "valueMap"

}
/**
 * Remove option children of select element
 * @param {Element} selectElement 
 */
function removeSelectOption(selectElement){
    while (selectElement.options.length > 0){
        selectElement.remove(0)
    }
}

/**
 * Update options of select element
 * @param {Element} selectElement 
 * @param {Array} options 
 */
function updateSelectOption(selectElement, options){
    for (var i = 0; i < options.length; i++){
        currentItem = options[i];
        var element = document.createElement("option");
        if (currentItem === "label"){
            element.selected = true;
        }
        element.innerText = currentItem;
        element.value = currentItem;
        selectElement.append(element)
    }
}

/**
 * Capture selected value of entity and update 
 * select options for next (property name ) selections
 */
function updatePropertyNameOptions(context) {
    console.log("updatePropertyNameOptions function triggered with content: " + context)
    var entity = document.getElementById("entity" + context);
    var entityValue = entity.value;

    if (entityValue == "V()") {
        options = ["label", "code", "city", "country", "runaways"]
    } else {
        options = ["label", "dist"]
    }
    propertyNameElement = document.getElementById("propertyName" + context);
    removeSelectOption(propertyNameElement);
    // also update propertyValue to include values for label by default
    propertyValueElement = document.getElementById("propertyValue" + context);
    removeSelectOption(propertyValueElement);
    setDefaultLabelOption(entity, context);
    updateSelectOption(propertyNameElement, options);
    update_multi_select_options(entityValue, context);
}

/**
 * Captures entity and propertyName and updates the propertyValue options
 */
function updatePropertyValueOptions(context){
    console.log("updatePropertyValueOptions function triggered with content: " + context)
    var entity = document.getElementById("entity" + context);
    var propertyName = document.getElementById("propertyName" + context)

    var entityValue = entity.value;
    var propertyName = propertyName.value;

    
    if (entityValue === "V()") {
        options = vertexPropertyNameOptions[propertyName]
    } else {
        options = edgePropertyNameOptions[propertyName]
        // options.sort((a, b) => a - b);
    } 
    propertyValueElement = document.getElementById("propertyValue" + context);
    removeSelectOption(propertyValueElement);
    updateSelectOption(propertyValueElement, options);
    update_multi_select_options(entityValue, context);
}

function update_multi_select_options(entityValue, context){
    console.log("update_multi_select_options: Current entity value is " + entityValue + "and context: " + context);
    if (context !== "Count"){
        // If context is Value then depending on what entity and property (though doesn't matter for in this case since we only have one nodetype)
        valueOptionElement = document.getElementById("resultValueOptions"  + context);
        removeSelectOption(valueOptionElement);
        updateSelectOption(valueOptionElement, ["all"])    
        if (entityValue === "V()"){
            updateSelectOption(valueOptionElement, vertexPropertyOptions)
        } else {
            updateSelectOption(valueOptionElement, edgePropertyOptions)
        }
    }

}

function setDefaultLabelOption(entity, context){
    var vertexOptions = ["airport"]
    var edgeOptions = ["route"];
    resultValueSelections = document.getElementById("propertyValue" + context);
    if (entity == "V()"){
        updateSelectOption(resultValueSelections, vertexOptions)
    } else {
        updateSelectOption(resultValueSelections, edgeOptions)
    }
}
/**
 * onclick() for submit
 * query flask to get data and return the data + query value
 */
function getQueryResult(context){
    var entity = document.getElementById("entity" + context),
        propertyName = document.getElementById("propertyName" + context),
        propertyValue = document.getElementById("propertyValue" + context),
        resultValue = document.getElementById("resultValue" + context);
        // result options only applies to Value, ValueMap and Traversal cards
        var resultValueOptions;
        if (context !== "Count") {
            resultValueOptions = get_multiple_selection_values(context);
        }

    // create value to send to flask route
    var options = {
        entityValue: entity.value,
        propertyName: propertyName.value,
        propertyValue: propertyValue.value
    };
    console.log("line 62 inside getQueryResult()");
    // make request to flask
    // fetch(`${window.origin}/get_query`, {
    //     method: 'POST',
    //     credentials: 'include',
    //     body: JSON.stringify(options),
    //     cache: 'no-cache',
    //     headers: new Headers({
    //         "content-type":"application/json"
    //     })
    // })
    // // when response is received from flask
    // .then(function(response){
    //     if(response.status !== 200) {
    //         console.log(`Response status was not 200: ${response.status}`);
    //         return;
    //     } 
    //     response.json().then(function (data){
    //         console.log(data)
    //     })
    // })
    createBasicQuery(options, context, resultValueOptions);
}

function get_multiple_selection_values(context){
    var selected = [];
    for (var option of document.getElementById('resultValueOptions' + context).options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    console.log("The values of selected Items are: " + selected);
    return selected;
}
/**
 * create string query based on selections by user
 * @param {object} options 
 */
function createBasicQuery(options, context, resultValueOptions){
    var propertyValue  = options.propertyValue,
        propertyName = options.propertyName,
        entityValue = options.entityValue;
    if (entityValue === "V()"){
        var options = addQuotesAroundString(vertexPropertyOptions);
    } else {
        var options = addQuotesAroundString(edgePropertyOptions);
    }

    var queryStringPartOne = "g." + entityValue + "."+ "has(\'" + propertyName + "\'";
    // check if user selected having specific property value or just having that property
    if (propertyValue === "all"){
        queryStringPartTwo =  ")." + contextMap[context] + "(";
    } else {
        queryStringPartTwo = ",\'" + propertyValue +  "\'\)." + contextMap[context] + "(";
    }  

    if (context === "Count"){
        var queryStringPartThree =  ")"
    } else {
        var withQuotesValueOptions = addQuotesAroundString(resultValueOptions);
        if ( resultValueOptions !== undefined && resultValueOptions.includes("all")) {
            queryStringPartThree = ")";
        } else {
            queryStringPartThree = withQuotesValueOptions + ")";
        }        
    }
    // check if user wants specific property result or all / value("dist") / valueMap("dist")

    const queryString = queryStringPartOne + queryStringPartTwo + queryStringPartThree;
    console.log(queryString);
    updateQueryString(queryString, context);
}


function addQuotesAroundString(array){
    var result = array.map(function(x) { return "'" + x + "'"});
    return result
}
function updateQueryString(queryString, context){
    queryParagraphElement = document.getElementById("basicQueryString" + context);
    queryParagraphElement.innerText = '';
    queryParagraphElement.innerText = queryString;
}